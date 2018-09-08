import api from 'utils/api';
import uniqBy from 'lodash/uniqBy';

export function setSchoolRank(payload) {
  return {
    type: 'setSchoolRank',
    payload,
  };
}

export function loadSchoolRank(params) {
  return async (dispatch, getState) => {
    const state = getState().SchoolRank;
    const { data } = await api.listSchool(params);
    const { pageIndex, list } = data;
    const uniqlist = uniqBy(pageIndex === 1 ? list : state.list.concat(list), 'id');
    const _list = params.nickName ? uniqlist : uniqlist.sort((a, b) => a.rank - b.rank);
    const payload = Object.assign({}, data, { params }, { list: _list });
    dispatch(setSchoolRank(payload));
  };
}

export function updateSchoolRank() {
  return async (dispatch, getState) => {
    const { list, params } = getState().SchoolRank;
    const _params = { ...params, pageSize: list.length, page: 1 };
    const { data } = await api.listSchool(_params);
    const { list: newlist } = data;
    const payload = Object.assign({}, data, { params }, { list: newlist });
    dispatch(setSchoolRank(payload));
  };
}
