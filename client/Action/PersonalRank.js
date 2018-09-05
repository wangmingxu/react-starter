import api from 'utils/api';

export function setPersonalRank(payload) {
  return {
    type: 'setPersonalRank',
    payload,
  };
}

export function loadPersonalRank(params) {
  return async (dispatch) => {
    const { data } = await api.listAllAudio(params);
    dispatch(setPersonalRank(data));
  };
}
