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
      const [coverTicket, talkTicket] = await Promise.all(Object.values(ProgramType).map(activityId =>
        api.getTicket({ activityId }, { needAuth: true }).then(res => res.data)));
      const info = {
        coverTicket,
        talkTicket,
      };
      dispatch(setMineInfo(info));
    } catch (error) {
      console.log(error);
    }
  };
}
