const initState = {
  pageIndex: 1,
  list: [],
};

const TalkRank = (state = initState, action) => {
  switch (action.type) {
  case 'setTalkRank': {
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

export default TalkRank;
