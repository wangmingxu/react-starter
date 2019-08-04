import api from 'utils/api';
import uniqBy from 'lodash/uniqBy';

export function setTalkRank(payload) {
  return {
    type: 'setTalkRank',
    payload,
  };
}

export function loadTalkRank(params) {
  return async (dispatch, getState) => {
    const state = getState().TalkRank;
    const { data } = await api.listTalk(params);
    const { pageIndex, content: list } = data;
    const uniqlist = uniqBy(pageIndex === 1 ? list : state.list.concat(list), 'id');
    const _list = uniqlist.sort((a, b) => a.rank - b.rank);
    const payload = Object.assign({}, data, { params }, { list: _list });
    dispatch(setTalkRank(payload));
  };
}

export function updateTalkRank() {
  return async (dispatch, getState) => {
    const { list, params } = getState().TalkRank;
    const _params = { ...params, pageSize: list.length, pageIndex: 1 };
    const { data } = await api.listTalk(_params);
    const { content: newlist } = data;
    const payload = Object.assign({}, data, { params }, { list: newlist });
    dispatch(setTalkRank(payload));
  };
}
