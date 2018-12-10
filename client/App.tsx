import * as GlobalActions from '@/Action/Global';
import * as ResultActions from '@/Action/Result';
import * as UserInfoActions from '@/Action/UserInfo';
import RouteWrapper from '@/Component/RouteWrapper';
import { IApplicationState } from '@/Reducer';
import routes from '@/Route';
import { IUserInfo } from '@/types';
import ClientDetectService from '@lz-service/ClientDetectService';
import JsBridgeService from '@lz-service/JsBridgeService';
import ShareService from '@lz-service/ShareService';
// import { ActivityIndicator } from 'antd-mobile';
import React, { PureComponent, Suspense } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';

const basename = process.env.BASE_PATH || '';

interface IProps {
  checkAuthStatus: () => boolean;
  checkAppResult: () => void;
  shareServ: ShareService;
  cdServ: ClientDetectService;
  jsbServ: JsBridgeService;
  setUserInfo: (info: IUserInfo) => void;
  userInfo: IUserInfo;
}

interface IState {
  needRedirect: boolean;
  readyToRender: boolean;
}

class App extends PureComponent<IProps, IState> {
  public state = {
    needRedirect: false,
    readyToRender: false,
  };

  public async componentDidMount() {
    this.props.checkAuthStatus();
    this.props.shareServ.configShareInfo();
    this.checkPlatform();
    if (this.props.cdServ.isLizhiFM) {
      await this.checkAppResult();
    }
    this.setState({ readyToRender: true });
    this.preloadRoutes();
  }

  public preloadRoutes = () => {
    Promise.all(routes.map(({component}) => {
      (component as any).preload ? (component as any).preload() : Promise.resolve()
    }));
  };

  public checkPlatform = () => {
    const { cdServ } = this.props;
    const $doc = document.documentElement;
    switch (true) {
    case cdServ.isAndroid:
        $doc!.dataset.platform = 'Android';
      break;
    case cdServ.isIPhoneX:
        $doc!.dataset.platform = 'IPhoneX';
      break;
    case cdServ.isIPhone:
        $doc!.dataset.platform = 'IPhone';
      break;
    }
    $doc!.dataset.lizhi = `${cdServ.isLizhiFM}`;
  };

  public checkAppResult = async () => {
    try {
      const currentRoutes = matchRoutes(routes, location.hash.replace('#', ''));
      // 判断是否进入的是首页
      if (currentRoutes.length > 0 && currentRoutes[0].match.path === '/') {
        await this.props.checkAppResult();
        // 后端不会记录首页填写的name,重新进入会丢失name,用当前用户昵称代替
        const { name } = await this.props.jsbServ.safeCall('getSessionUser');
        this.props.setUserInfo({ ...this.props.userInfo, name });
        this.setState({ needRedirect: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  public componentDidCatch(error, info) {
    fundebug.notifyError(error, {
      metaData: {
        info,
      },
    });
  }

  public render() {
    const { needRedirect, readyToRender } = this.state;
    return (
      <HashRouter basename={basename}>
        <Suspense fallback={null}>
          {readyToRender ? (
            <Route
              render={props => (
                <RouteWrapper {...props}>
                  {renderRoutes(routes, null, { location: props.location })}
                </RouteWrapper>
              )}
            />
          ) : null}
          {needRedirect ? <Redirect to="/loading/0" /> : null}
        </Suspense>
      </HashRouter>
    );
  }
}

export default compose(
  hot(module),
  connect(
    (state: IApplicationState) => ({
      shareServ: state.Injector.get('shareServ'),
      cdServ: state.Injector.get('cdServ'),
      jsbServ: state.Injector.get('jsbServ', {}),
      userInfo: state.UserInfo,
    }),
    dispatch => bindActionCreators({ ...GlobalActions, ...ResultActions, ...UserInfoActions }, dispatch),
  ),
)(App);
