const initState = {
  pageIndex: 1,
  list: [],
  hasMore: true,
};

const CoverRank = (state = initState, action) => {
  switch (action.type) {
  case 'setCoverRank': {
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

export default CoverRank;
