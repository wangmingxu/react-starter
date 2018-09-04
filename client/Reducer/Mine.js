const initState = {};

const Mine = (state = initState, action) => {
  switch (action.type) {
  case 'setMineInfo':
    return action.info;
  default:
    return state;
  }
};

export default Mine;
