import api from 'utils/api';
import uniqBy from 'lodash/uniqBy';

export function setPersonalRank(payload) {
  return {
    type: 'setPersonalRank',
    payload,
  };
}

export function loadPersonalRank(params) {
  return async (dispatch, getState) => {
    const state = getState().PersonalRank;
    const { data } = await api.listAllAudio(params);
    const { pageIndex, content: list, totalPage } = data;
    const uniqlist = uniqBy(pageIndex === 1 ? list : state.list.concat(list), 'id');
    const _list = uniqlist.sort((a, b) => a.rank - b.rank);
    const payload = Object.assign({}, data, { params }, { list: _list, hasMore: pageIndex === totalPage });
    dispatch(setPersonalRank(payload));
  };
}

export function updatePersonalRank() {
  return async (dispatch, getState) => {
    const { list, params } = getState().PersonalRank;
    const _params = { ...params, pageSize: list.length, pageIndex: 1 };
    const { data } = await api.listAllAudio(_params);
    const { content: newlist } = data;
    const payload = Object.assign({}, data, { params }, { list: newlist });
    dispatch(setPersonalRank(payload));
  };
}
