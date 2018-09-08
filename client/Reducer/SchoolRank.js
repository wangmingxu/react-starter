const initState = {
  pageIndex: 1,
  list: [],
};

const SchoolRank = (state = initState, action) => {
  switch (action.type) {
  case 'setSchoolRank': {
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

export default SchoolRank;
