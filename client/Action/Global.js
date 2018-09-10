import { checkLogin, applyLogin } from 'utils/auth';
import api from 'utils/api';

export function toggleAuthStatus(isLogin) {
  return {
    type: 'toggleAuthStatus',
    isLogin,
  };
}

export const checkAuthStatus = (client, cookies) => async (dispatch) => {
  const isLogin = await checkLogin(client, cookies);
  dispatch(toggleAuthStatus(isLogin));
  return isLogin;
};

export const login = () => async (dispatch) => {
  await applyLogin();
  dispatch(toggleAuthStatus(true));
};

export function collectErrMsg(msg) {
  return {
    type: 'errMsg',
    msg,
  };
}

export function toggleTab(index) {
  return {
    type: 'toggleTab',
    index,
  };
}

export function setActivityStatus(status) {
  return {
    type: 'setActivityStatus',
    status,
  };
}

export function checkActivityStatus() {
  return async (dispatch) => {
    const { data: status } = await api.isActiviting();
    dispatch(setActivityStatus(status));
  };
}
