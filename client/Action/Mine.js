import api from 'utils/api';

export function setMineInfo(info) {
  return {
    type: 'setMineInfo',
    info,
  };
}

export function loadMineInfo() {
  return async (dispatch) => {
    const { data: info } = await api.mine({}, { needAuth: true });
    dispatch(setMineInfo(info));
  };
}
