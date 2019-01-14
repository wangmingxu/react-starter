import AsyncPipe from '@/Component/AsyncPipe';
import ServiceContext from '@/Context/ServiceContext';
import withAsyncData from '@/Hoc/withAsyncData';
import withService from '@/Hoc/withService';
import AuthService from '@lz-service/AuthService';
import * as React from 'react';
import { compose } from 'recompose';
import '../styles/test.less';

interface InjectedProps {
  initialData: string;
}

interface IServiceProps {
  authServ: AuthService;
}

class Index extends React.Component<InjectedProps & IServiceProps> {
  public static contextType = ServiceContext;

  public static async getInitialProps({ injector }): Promise<InjectedProps> {
    const data: string = await new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hello World');
      }, 1000);
    });
    return { initialData: data };
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={require('@/assets/logo.svg')} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit
          {' '}
          <code>src/App.tsx</code>
          {' '}and save to reload.
        </p>
        <p>{this.props.initialData}</p>
        <AsyncPipe stream={this.props.authServ.getAuthStatus()}>
          {(isLogin: boolean) => <p>{isLogin ? '已登陆' : '未登录'}</p>}
        </AsyncPipe>
      </div>
    );
  }
}

export default compose<InjectedProps & IServiceProps, {}>(
  withAsyncData(),
  withService((injector) => ({
    authServ: injector.get('authServ')
  }))
)(Index);
