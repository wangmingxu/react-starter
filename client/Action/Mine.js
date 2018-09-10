import api from 'utils/api';

export function setMineInfo(info) {
  return {
    type: 'setMineInfo',
    info,
  };
}

export function loadMineInfo() {
  return async (dispatch) => {
    try {
      const { data: info } = await api.mine({}, { needAuth: true });
      dispatch(setMineInfo(info));
    } catch (error) {
      console.log(error);
    }
  };
}
