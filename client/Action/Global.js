import { checkLogin, applyLogin } from 'utils/auth';

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
