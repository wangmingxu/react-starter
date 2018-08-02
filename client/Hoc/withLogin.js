import React from 'react';
import { Cookies } from 'react-cookie';
import { tokenKey, idKey, wxidKey, wxAuthUrl } from 'constant';
import { connect } from 'react-redux';
import * as global from 'Action/global';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import PropTypes from 'prop-types';

/**
 *
 * @param {*} force 是否强制跳转登录页面
 */
export const applyLogin = async (force) => {
  const cookies = new Cookies();
  const qs = new URLSearchParams(location.search);
  const openid = qs.get('openid');
  openid && localStorage.setItem(wxidKey, openid);
  if (window.isApp) {
    await new Promise((resolve) => { lz.ready(resolve); });
    const r1 = await lz.getSessionUser();
    if (!r1.id && force) {
      const p = new Promise((resolve) => { lz.on('user:login', resolve); });
      lz.gotoLogin();
      await p;
      const token = await applyLogin();
      return token;
    }
    cookies.set(idKey, r1.id);
    const r2 = await lz.getToken({ needRefresh: true });
    if (r2.status === 'success') {
      cookies.set(tokenKey, r2.token);
      return r2.token;
    }
  } else if (window.isWX && !localStorage.getItem(wxidKey)) {
    location.href = `${wxAuthUrl}&cookie_key=${wxidKey}&redirectURL=${encodeURIComponent(location.href)}`;
    return Promise.reject(new Error('NO_LOGIN'));
  } else if (window.isWeiBo && !localStorage.getItem(wxidKey)) {
    location.href = `${wxAuthUrl}&cookie_key=${wxidKey}&redirectURL=${encodeURIComponent(location.href)}`;
    return Promise.reject(new Error('NO_LOGIN'));
  }
  // return '';// 默认返回空的token
};

/**
 *
 * @param {*} force 是否强制跳转登录页面
 */
const withLogin = (force = true) => (Wrapper) => {
  class withLoginComponent extends Wrapper {
    static propTypes = {
      isLogin: PropTypes.bool.isRequired,
    }
    constructor(props) {
      super(props);
    }
    async componentDidMount() {
      const token = await applyLogin(force);
      this.props.toggleAuthStatus(true);
      this.props.setToken(token);
    }
    render() {
      const { isLogin } = this.props;
      return (isLogin ? <Wrapper {...this.props} /> : null);
    }
  }
  return connect(
    state => ({ isLogin: get(state, ['Global', 'isLogin']) }),
    dispatch => bindActionCreators(global, dispatch),
  )(withLoginComponent);
};

export default withLogin;
