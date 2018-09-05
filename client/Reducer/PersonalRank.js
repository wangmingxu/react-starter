const initState = {
  page: 1,
  list: [],
};

const PersonalRank = (state = initState, action) => {
  switch (action.type) {
  case 'setPersonalRank': {
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

export default PersonalRank;
