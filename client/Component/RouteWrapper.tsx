import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

/**
 * 1.添加路由过渡动画
 * 2.在路由跳转时执行某些操作，比如微信sdk授权
 * 3.恢复滚动条到最顶部
 */
class RouteWrapper extends Component<RouteComponentProps> {

  public shouldComponentUpdate(prevProps: RouteComponentProps) {
    return this.props.location.pathname !== prevProps.location.pathname
  }

  public componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
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
          key={`${location.pathname}-${Date.now()}`}
          classNames={classNames}
          timeout={{ enter: 500, exit: 500 }}
        >
          {this.props.children}
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default RouteWrapper;
