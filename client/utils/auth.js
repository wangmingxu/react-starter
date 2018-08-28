import { lzTokenKey, wxidKey, wxAuthUrl } from 'constant';
import client from 'utils/ua';
import { Cookies } from 'react-cookie';

export const applyLogin = async () => {
  if (client.isLizhiFM()) {
    const p = new Promise((resolve) => { lz.on('user:login', resolve); });
    lz.gotoLogin();
    await p;
  } else if (client.isWeiXin()) {
    location.href = `${wxAuthUrl}&redirectURL=${encodeURIComponent(location.href)}`;
  }
};

export const getToken = async () => {
  const cookies = new Cookies();
  if (client.isLizhiFM()) {
    const r2 = await lz.getToken({ needRefresh: true });
    if (r2.status === 'success') {
      cookies.set(lzTokenKey, r2.token);
      return r2.token;
    }
  } else if (client.isWeiXin()) {
    const qs = new URLSearchParams(location.search);
    const openid = qs.get('openid');
    openid && cookies.set(wxidKey, openid);
    return cookies.get(wxidKey);
  }
  return '';
};

export const checkLogin = async () => {
  if (client.isLizhiFM()) {
    await new Promise((resolve) => { lz.ready(resolve); });
    const r1 = await lz.getSessionUser();
    return Boolean(r1.id);
  } else if (client.isWeiXin()) {
    const openid = await getToken();
    return Boolean(openid);
  }
  return true;
};