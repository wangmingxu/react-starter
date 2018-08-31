import React from 'react';
import { connect } from 'react-redux';
import * as Global from 'Action/Global';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import PropTypes from 'prop-types';

/**
 *
 * @param {*} forceLogin 如果未登录是否强制跳转登录
 */
const WithLogin = (forceLogin = true) => (Wrapper) => {
  class WithLoginComponent extends Wrapper {
    static propTypes = {
      isLogin: PropTypes.bool.isRequired,
    }
    constructor(props) {
      super(props);
    }
    async componentDidMount() {
      const isLogin = await this.props.checkAuthStatus();
      if (!isLogin && forceLogin) {
        await this.props.login();
      }
    }
    render() {
      const { isLogin } = this.props;
      return ((!isLogin && forceLogin) ? null : <Wrapper {...this.props} />);
    }
  }
  return connect(
    state => ({ isLogin: get(state, ['Global', 'isLogin']) }),
    dispatch => bindActionCreators(Global, dispatch),
  )(WithLoginComponent);
};

export default WithLogin;
