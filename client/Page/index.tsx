import ServiceContext from '@/Context/ServiceContext';
import withAsyncData, { LoadDataStrategy } from '@/Hoc/withAsyncData';
import * as React from 'react';
import '../styles/test.less';

interface InjectedProps {
  initialData: string;
}

class Index extends React.Component<InjectedProps> {
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
      <div styleName="App">
        <header styleName="App-header">
          <img src={require('@/assets/logo.svg')} styleName="App-logo" alt="logo" />
          <h1 styleName="App-title">Welcome to React</h1>
        </header>
        <p styleName="App-intro">
          To get started, edit
          {' '}
          <code>src/App.tsx</code>
          {' '}and save to reload.
        </p>
        <p>{this.props.initialData}</p>
      </div>
    );
  }
}

export default withAsyncData({ strategy: LoadDataStrategy.OnlyFirstTime })(Index);
