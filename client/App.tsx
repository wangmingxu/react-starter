import ClientDetectService from '@lizhife/lz-market-service/package/ClientDetectService';
import ShareService from '@lizhife/lz-market-service/package/ShareService';
import * as GlobalActions from 'Action/Global';
import * as ResultActions from 'Action/Result';
import { ActivityIndicator } from 'antd-mobile';
import RouteWrapper from 'Component/RouteWrapper';
import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { IApplicationState } from 'Reducer';
import { bindActionCreators, compose } from 'redux';
import routes from 'Route';

const basename = process.env.BASE_PATH || '';

interface IProps {
  checkAuthStatus: () => boolean;
  checkAppResult: () => void;
  shareServ: ShareService;
  cdServ: ClientDetectService;
}

interface IState {
  hasResult: boolean
}

class App extends React.Component<IProps, IState> {

  public state = {
    hasResult: false
  }

  public componentDidMount() {
    this.props.checkAuthStatus();
    this.props.shareServ.configShareInfo();
    this.checkAppResult();
  }

  public checkAppResult = async () => {
    if (this.props.cdServ.isLizhiFM) {
      await this.props.checkAppResult();
      this.setState({hasResult: true})
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
    const {hasResult} = this.state;
    return (
      <HashRouter basename={basename}>
        <Suspense fallback={<ActivityIndicator toast={true} text="Loading..." />}>
          <Route
            render={props => (
                <RouteWrapper {...props}>
                  {renderRoutes(routes)}
                </RouteWrapper>
            )}
          />
          {hasResult ? <Redirect to="/loading/0"/> : null}
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
    }),
    dispatch => bindActionCreators({ ...GlobalActions, ...ResultActions }, dispatch),
  ),
)(App);
