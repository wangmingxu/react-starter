import uniqBy from 'lodash/uniqBy';

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
      list: uniqBy(pageIndex === 1 ? list : state.list.concat(list), 'id').sort((a, b) => b.vote - a.vote),
      hasMore: totalPage > pageIndex,
    };
  }
  default:
    return state;
  }
};

export default SchoolRank;
