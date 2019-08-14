const initState = {
  coverTicket: 0,
  talkTicket: 0,
};

const Mine = (state = initState, action) => {
  switch (action.type) {
    case 'setMineInfo':
      return action.info;
    default:
      return state;
  }
};

export default Mine;
