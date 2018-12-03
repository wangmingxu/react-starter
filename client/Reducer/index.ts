import { combineReducers } from 'redux';
import { IUserInfo } from 'types';
import { IResult } from 'types/result';
import Global, { IGlobalState } from './Global';
import Injector from './Injector';
import Result from './Result';
import UserInfo from './UserInfo';

export interface IApplicationState {
  Global: IGlobalState;
  Injector: any;
  UserInfo: IUserInfo;  
  Result: IResult
}

const rootReducer = combineReducers<IApplicationState>({
  Global,
  Injector,
  UserInfo,
  Result
});

export default rootReducer;
