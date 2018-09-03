import api from 'utils/api';

export function setMineInfo(info) {
  return {
    type: 'setPosition',
    info,
  };
}

export function loadMineInfo() {
  return async (dispatch) => {
    const { data: info } = await api.mine();
    dispatch(setMineInfo(info));
  };
}
