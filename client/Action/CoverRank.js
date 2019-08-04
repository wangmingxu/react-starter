import api from 'utils/api';
import uniqBy from 'lodash/uniqBy';

export function setCoverRank(payload) {
  return {
    type: 'setCoverRank',
    payload,
  };
}

export function loadCoverRank(params) {
  return async (dispatch, getState) => {
    const state = getState().CoverRank;
    const { data } = await api.listCover(params);
    const { pageIndex, content: list } = data;
    const uniqlist = uniqBy(pageIndex === 1 ? list : state.list.concat(list), 'id');
    const _list = uniqlist.sort((a, b) => a.rank - b.rank);
    const payload = Object.assign({}, data, { params }, { list: _list });
    dispatch(setCoverRank(payload));
  };
}

export function updateCoverRank() {
  return async (dispatch, getState) => {
    const { list, params } = getState().CoverRank;
    const _params = { ...params, pageSize: list.length, pageIndex: 1 };
    const { data } = await api.listCover(_params);
    const { content: newlist } = data;
    const payload = Object.assign({}, data, { params }, { list: newlist });
    dispatch(setCoverRank(payload));
  };
}
