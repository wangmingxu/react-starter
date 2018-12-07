export * from './result';

export * from './service';

export enum Gender {
  Boy       = 1,
  Girl      = 2,
}

export interface IUserInfo {
  name:       string;
  gender:     Gender;
  likeGender: Gender;
}