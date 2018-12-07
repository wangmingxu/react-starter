import { IUserInfo } from '@/types';
import { IResult } from '@/types';
import { ReflectiveInjector } from 'injection-js';
import { combineReducers } from 'redux';
import Global, { IGlobalState } from './Global';
import Injector from './Injector';
import Poster from './Poster';
import Result from './Result';
import UserInfo from './UserInfo';

export interface IApplicationState {
  Global: IGlobalState;
  Injector: ReflectiveInjector;
  UserInfo: IUserInfo;  
  Result: IResult,
  Poster: string
}

const rootReducer = combineReducers<IApplicationState>({
  Global,
  Injector,
  UserInfo,
  Result,
  Poster
});

export default rootReducer;
