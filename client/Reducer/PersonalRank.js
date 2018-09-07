import uniqBy from 'lodash/uniqBy';

const initState = {
  pageIndex: 1,
  list: [],
};

const PersonalRank = (state = initState, action) => {
  switch (action.type) {
  case 'setPersonalRank': {
    const { pageIndex, list, totalPage } = action.payload;
    const uniqlist = uniqBy(pageIndex === 1 ? list : state.list.concat(list), 'id');
    const needSort = !action.payload.params.nickName;
    return {
      ...action.payload,
      list: needSort ? uniqlist.sort((a, b) => a.rank - b.rank) : uniqlist,
      hasMore: totalPage > pageIndex,
    };
  }
  default:
    return state;
  }
};

export default PersonalRank;
