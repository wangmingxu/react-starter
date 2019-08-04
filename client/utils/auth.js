import { tokenKey, wxAuthUrl, syncTokenKey } from 'constant';
import ClientDetect from 'rc-useragent/ClientDetect';
import { Cookies } from 'react-cookie';

export const applyLogin = async () => {
  const client = ClientDetect.getInstance();
  if (client.isLizhiFM) {
    const p = new Promise((resolve) => {
      lz.on('user:login', resolve);
    });
    lz.gotoLogin();
    await p;
  } else if (client.isWeiXin) {
    location.href = `${wxAuthUrl}&cookie_key=${tokenKey}&redirectURL=${encodeURIComponent(location.href)}`;
    await Promise.reject(new Error(null));
  }
};

export const getToken = async () => {
  const cookies = new Cookies();
  const client = ClientDetect.getInstance();
  if (client.isLizhiFM) {
    await new Promise((resolve) => {
      lz.ready(resolve);
    });
    const ret = await lz.getToken({ needRefresh: true });
    if (ret.status === 'success') {
      cookies.set(tokenKey, ret.token);
      cookies.set(syncTokenKey, ret.token);
      return ret.token;
    }
  } else if (client.isWeiXin) {
    const qs = new URLSearchParams(location.search);
    const openid = qs.get('openid');
    if (openid) {
      openid && cookies.set(tokenKey, openid);
      openid && cookies.set(syncTokenKey, openid);
      return openid;
    }
    return cookies.get(tokenKey);
  }
  return Promise.reject(new Error('获取token失败'));
};

const clientCheckLogin = async () => {
  const client = ClientDetect.getInstance();
  const cookies = new Cookies();
  if (client.isLizhiFM) {
    await new Promise((resolve) => {
      lz.ready(resolve);
    });
    const ret = await lz.getSessionUser();
    const isLogin = Boolean(ret.id);
    if (!isLogin) {
      cookies.remove(tokenKey);
    }
    return isLogin;
  } else if (client.isWeiXin) {
    const openid = await getToken();
    if (openid) {
      cookies.set(syncTokenKey, openid);
    }
    return Boolean(openid);
  }
  return true;
};

const serverCheckLogin = async (client, cookies) => {
  if (client.isLizhiFM || client.isWeiXin) {
    const token = cookies.get(tokenKey);
    return Boolean(token);
  }
  return true;
};

export const checkLogin = (client, cookies) => {
  const isServer = typeof exports === 'object';
  if (isServer) {
    return serverCheckLogin(client, cookies);
  }
  return clientCheckLogin();
};
