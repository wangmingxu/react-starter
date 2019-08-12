import api from 'utils/api';

export function setActivityInfo(payload) {
  return {
    type: 'setActivityInfo',
    payload,
  };
}

export function getActivityInfo(params) {
  return async (dispatch) => {
    const { data } = await api.getActivityInfo(params);
    dispatch(setActivityInfo(data));
  };
}
