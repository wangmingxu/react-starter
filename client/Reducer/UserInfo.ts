import { IUserInfo } from '@/types';

const initState: IUserInfo = {
  name: '',
  gender: 0,
  likeGender: 0,
};

const UserInfo = (state = initState, action) => {
  switch (action.type) {
  case 'setUserInfo':
    return { ...state, ...action.payload };
  case 'resetUserInfo':
    return { ...initState };
  default:
    return state;
  }
};

export default UserInfo;
