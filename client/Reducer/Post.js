const initState = {};

const Post = (state = initState, action) => {
  switch (action.type) {
  case 'setPost':
    return Object.assign({}, state, action.payload);
  default:
    return state;
  }
};

export default Post;
