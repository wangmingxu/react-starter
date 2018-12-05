const initState = '';

const Poster = (state = initState, action) => {
  switch (action.type) {
  case 'setPosterData':
    return action.payload;
  default:
    return state;
  }
};

export default Poster;