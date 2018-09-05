import api from 'utils/api';

export function setSchoolRank(payload) {
  return {
    type: 'setSchoolRank',
    payload,
  };
}

export function loadSchoolRank(params) {
  return async (dispatch) => {
    const { data } = await api.listSchool(params);
    dispatch(setSchoolRank(data));
  };
}
