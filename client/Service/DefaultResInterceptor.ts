import { AxiosResponse } from 'axios';

export interface IServerResponse<T= any> {
  rCode: number;
  data: T;
  msg: string;
}

// 后端返回的状态码
enum rCodeMap {
  SUCCESS = 0,
  NO_LOGIN = 2,
  POLLING = 4,
}

class DefaultResponseInterceptor {
  public intercept(res: AxiosResponse<IServerResponse>) {
    const { data } = res;
    if (data.rCode === rCodeMap.SUCCESS || data.rCode === rCodeMap.POLLING) {
      return Promise.resolve(data);
    }
    return Promise.reject(data.msg);
  }
}

export default DefaultResponseInterceptor;
