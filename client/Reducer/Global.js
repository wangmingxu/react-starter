const initState = {
  isLogin: false,
  errMsg: [],
  tab: 1,
};
const Global = (state = initState, action) => {
  switch (action.type) {
  case 'toggleAuthStatus':
    return {
      ...state,
      isLogin: action.isLogin,
    };
  case 'errMsg':
    return {
      ...state,
      errMsg: [...state.errMsg, action.msg],
    };
  case 'toggleTab':
    return {
      ...state,
      tab: action.index,
    };
  default:
    return state;
  }
};

export default Global;
