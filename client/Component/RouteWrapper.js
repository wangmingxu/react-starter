import React from 'react';
import { wxConfig } from 'config';
import withUserAgent from 'rc-useragent/withUserAgent';
import { getDefaultShareData, getSchoolShareData, getPersonShareData } from 'constant';

/**
 * 1.添加路由过渡动画
 * 2.在路由跳转时执行某些操作，比如微信sdk授权
 * 3.恢复滚动条到最顶部
 */
@withUserAgent
class RouteWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // window.scrollTo(0, 0);
      this.initShare();
      if (this.props.ua.isWeiXin) {
        wxConfig(); // spa跳转之后重新获取wx-sdk授权
      }
    }
  }
  initShare() {
    const {
      location: { pathname },
    } = this.props;
    if (/voice\/\d+/.test(pathname)) {
      Object.assign(window.shareData, getPersonShareData());
    } else if (/school\/\d+/.test(pathname)) {
      Object.assign(window.shareData, getSchoolShareData());
    } else {
      Object.assign(window.shareData, getDefaultShareData());
    }
  }
  render() {
    const { location } = this.props;
    return (
      <div key={location.pathname}>{React.cloneElement(this.props.children, { location })}</div>
    );
  }
}

export default RouteWrapper;
