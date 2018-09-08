import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import routes from 'Route';
import RouteWrapper from 'Component/RouteWrapper';
import { renderRoutes } from 'react-router-config';
import WithLogin from 'Hoc/WithLogin';
import api from 'utils/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mineActions from 'Action/Mine';
// import dayjs from 'dayjs';

@connect(
  state => ({ mine: state.Mine }),
  dispatch => bindActionCreators(mineActions, dispatch),
)
@WithLogin(false)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
  }
  async componentDidMount() {
    try {
      await this.getDayVote();
    } catch (error) {
      console.log(error);
    } finally {
      this.props.loadMineInfo();
      this.setState({ ready: true });
    }
  }
  getDayVote = async () => {
    // const key = `School_${dayjs().format('YYYY_MM_DD')}`;
    // if (localStorage.getItem(key)) return;
    const lzReady = new Promise(resolve => lz.ready(resolve));
    const timeout = new Promise(resolve => setTimeout(resolve, 1500));
    await Promise.race([lzReady, timeout]);
    const { deviceId } = await lz.getAppInfo();
    console.log(deviceId);
    await api.getLoginVote({ deviceId }, { needAuth: true, timeout: 3000 });
    // localStorage.setItem(key, true);
  }
  render() {
    const { ready } = this.state;
    return ready ? (<HashRouter>
      <Route
        render={props => (
          <RouteWrapper {...props}>
            {renderRoutes(routes)}
          </RouteWrapper>
        )}
      />
    </HashRouter>) : null;
  }
}

export default App;
