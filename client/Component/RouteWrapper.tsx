import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

/**
 * 1.添加路由过渡动画
 * 2.在路由跳转时执行某些操作，比如微信sdk授权
 * 3.恢复滚动条到最顶部
 */
class RouteWrapper extends PureComponent<RouteComponentProps> {
  public componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    const { location, history } = this.props;
    const animateClsMap = {
      PUSH: 'left',
      REPLACE: 'left',
      POP: 'right',
    };
    const classNames = animateClsMap[history.action];
    return (
      <TransitionGroup
        component={React.Fragment}
        childFactory={child => React.cloneElement(child, { classNames })}
      >
        <CSSTransition
          key={location.pathname}
          classNames={classNames}
          timeout={{ enter: 1000, exit: 1000 }}
        >
          {React.cloneElement((this.props.children as any), { location })}
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default RouteWrapper;
