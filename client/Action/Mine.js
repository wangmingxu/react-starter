import api from 'utils/api';
import { ProgramType } from '@/constant';

export function setMineInfo(info) {
  return {
    type: 'setMineInfo',
    info,
  };
}

export function loadMineInfo() {
  return async (dispatch) => {
    try {
      const [userInfo, coverTicket, talkTicket] = await Promise.all([api.getUserInfo({ activityId: 4 }, { needAuth: true }).then(res => res.data)].concat(Object.values(ProgramType).map(activityId =>
        api.getTicket({ activityId }, { needAuth: true }).then(res => res.data))));
      const info = {
        ...userInfo,
        coverTicket,
        talkTicket,
      };
      dispatch(setMineInfo(info));
    } catch (error) {
      console.log(error);
    }
  };
}
