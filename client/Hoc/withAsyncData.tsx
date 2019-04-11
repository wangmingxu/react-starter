import ServiceContext from '@/Context/ServiceContext';
import { ActivityIndicator } from 'antd-mobile';
// import hoistNonReactStatic from 'hoist-non-react-statics';
import * as React from 'react';

interface IState {
  loading: boolean;
  data: any;
}

interface IOption {
  placeholder?: React.ReactNode;
}

type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = (
  component: React.ComponentType<TInjectedProps & TNeedsProps>
) => React.ComponentClass<TNeedsProps>;

type withAsyncData = <TInjectedProps = {}, TOwnProps = {}>(
  opt?: IOption
) => InferableComponentEnhancerWithProps<TInjectedProps, TOwnProps>;

const withAsyncData: withAsyncData = (
  opt = { placeholder: null }
) => WrappedComponent => {
  class Enhance extends React.Component<any, IState> {
    public static contextType = ServiceContext;

    public readonly state: IState;

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        data: __ISOMORPHIC__ ? this.props.__initialData__.shift() : null,
      };
    }

    public async componentDidMount() {
      if (
        (WrappedComponent as any).getInitialProps !== void 0 &&
        (!__ISOMORPHIC__ || this.state.data === void 0)
      ) {
        this.setState({ loading: true });
        try {
          const data = await (WrappedComponent as any).getInitialProps({ injector: this.context });
          this.setState({ data });
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ loading: false });
        }
      }
    }

    public render() {
      const { loading, data } = this.state;
      if (loading) {
        return opt.placeholder || <ActivityIndicator toast={true} text="Loading..." />;
      }
      return <WrappedComponent {...data} {...this.props} />;
    }
  }
  require('hoist-non-react-statics')(Enhance, WrappedComponent);
  return Enhance;
};

export default withAsyncData;
