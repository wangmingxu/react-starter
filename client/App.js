import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import routes from 'Route';
import RouteWrapper from 'Component/RouteWrapper';
import { renderRoutes } from 'react-router-config';
import WithLogin from 'Hoc/WithLogin';
import api from 'utils/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MineActions from 'Action/Mine';
import * as GlobalActions from 'Action/Global';
import { withUserAgent } from 'rc-useragent';
// import dayjs from 'dayjs';

const getLoginVote = async (dispatch) => {
  try {
    const lzReady = new Promise(resolve => lz.ready(resolve));
    const timeout = new Promise(resolve => setTimeout(resolve, 1500));
    await Promise.race([lzReady, timeout]);
    const { deviceId } = await lz.getAppInfo();
    console.log(deviceId);
    await api.getLoginVote({ deviceId }, { needAuth: true, timeout: 3000 });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(MineActions.loadMineInfo());
  }
};


@connect(
  state => ({ mine: state.Mine }),
  dispatch => bindActionCreators({ ...GlobalActions, ...MineActions }, dispatch),
)
@WithLogin(false, getLoginVote)
@withUserAgent
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.checkActivityStatus();
    this.props.ua.isLizhiFM && this.listenShare();
  }
  listenShare = async () => {
    await new Promise(resolve => lz.ready(resolve));
    lz.on('shareFinish', (ret) => {
      if (ret.statusCode === 0) {
        api.getShareVote({}, { needAuth: true });
        this.props.loadMineInfo();
      }
    });
  }
  render() {
    return (<HashRouter>
      <Route
        render={props => (
          <RouteWrapper {...props}>
            {renderRoutes(routes)}
          </RouteWrapper>
        )}
      />
    </HashRouter>);
  }
}

export default App;
