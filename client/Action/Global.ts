export function toggleAuthStatus(isLogin) {
  return {
    type: 'toggleAuthStatus',
    isLogin,
  };
}

export const checkAuthStatus = () => async (dispatch, getState) => {
  const { Injector } = getState();
  const isLogin = await Injector.get('AuthServ').checkLogin();
  dispatch(toggleAuthStatus(isLogin));
  return isLogin;
};

export const login = () => async (dispatch, getState) => {
  const { Injector } = getState();
  await Injector.get('AuthServ').applyLogin();
  dispatch(toggleAuthStatus(true));
};

export function collectErrMsg(msg) {
  return {
    type: 'errMsg',
    msg,
  };
}
