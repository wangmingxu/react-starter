import ServiceContext from '@/Context/ServiceContext';
import { ReflectiveInjector } from 'injection-js';
import * as React from 'react';

type InferableComponentEnhancerWithProps < TInjectedProps , TNeedsProps > = (
  component: React.ComponentType<TInjectedProps & TNeedsProps>
) => React.ComponentClass<TNeedsProps>;

type withService = <TInjectedProps = {}, TOwnProps = {}>(mapFn: (injector: ReflectiveInjector) => TInjectedProps) => InferableComponentEnhancerWithProps<
  TInjectedProps,
  TOwnProps
>;

const withService: withService = mapFn => (WrappedComponent) => {
  class Enhance extends React.Component<any> {
    public static contextType = ServiceContext;

    public render() {
      return <WrappedComponent {...mapFn(this.context)} {...this.props} />;
    }
  }
  require('hoist-non-react-statics')(Enhance, WrappedComponent);
  return Enhance;
};

export default withService;
