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
import * as ActivityInfo from 'Action/ActivityInfo';
import { coverActivityName } from 'constant';
import { setDownloadUrl } from '@lz-utils/openApp';
// import dayjs from 'dayjs';

const hanldeLogin = async (dispatch) => {
  dispatch(MineActions.loadMineInfo());
};

@connect(
  state => ({ mine: state.Mine, activityInfo: state.ActivityInfo }),
  dispatch => bindActionCreators({ ...GlobalActions, ...MineActions, ...ActivityInfo }, dispatch),
)
@WithLogin(true, hanldeLogin)
@withUserAgent
class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.checkActivityStatus();
    // this.props.ua.isLizhiFM && this.listenShare();
    this.props
      .getActivityInfo({
        type: coverActivityName,
      })
      .then(() => {
        const { activityInfo } = this.props;
        Object.assign(window.shareData, {
          imgUrl: activityInfo.share_image,
          'image-url': activityInfo.share_image,
          title: activityInfo.share_title,
          desc: activityInfo.share_message,
        });
        setDownloadUrl(activityInfo.download_url);
      });
  }
  // listenShare = async () => {
  //   await new Promise(resolve => lz.ready(resolve));
  //   lz.on('shareFinish', (ret) => {
  //     if (ret.statusCode === 0) {
  //       api.getShareVote({}, { needAuth: true });
  //       this.props.loadMineInfo();
  //     }
  //   });
  // }
  render() {
    return (
      <HashRouter>
        <Route render={props => <RouteWrapper {...props}>{renderRoutes(routes)}</RouteWrapper>} />
      </HashRouter>
    );
  }
}

export default App;
