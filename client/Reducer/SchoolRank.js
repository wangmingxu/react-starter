const initState = {
  page: 1,
  list: [],
};

const SchoolRank = (state = initState, action) => {
  switch (action.type) {
  case 'setSchoolRank': {
    const { pageIndex, list, totalPage } = action.payload;
    return {
      ...action.payload,
      list: pageIndex === 1 ? list : state.list.concat(list),
      hasMore: totalPage > pageIndex,
    };
  }
  default:
    return state;
  }
};

export default SchoolRank;
