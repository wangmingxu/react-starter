const initState = {
  pageIndex: 1,
  list: [],
  hasMore: true
};

const PersonalRank = (state = initState, action) => {
  switch (action.type) {
    case 'setPersonalRank': {
      const { pageIndex, totalPage } = action.payload;
      return {
        ...action.payload,
        hasMore: totalPage > pageIndex,
      };
    }
    default:
      return state;
  }
};

export default PersonalRank;
