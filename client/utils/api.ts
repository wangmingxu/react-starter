import axios, { AxiosPromise } from 'axios';

const HttpMethods = ['GET', 'POST', 'PUT', 'DELETE'];

type ApiMap = {
  getCity: string | Object;
  listLuckyDoy: string | Object;
  trans: string | Object;
};

type CustomResponse = {
  code: number;
  data: any;
  msg: string;
}

type axiosMap<T> = { [P in keyof T]?: (args: any) => AxiosPromise<CustomResponse> };

function apiConfig<T>(rMap: T) {
  return Object.keys(rMap).reduce<axiosMap<T>>((fMap, key) => {
    fMap[key] = data => {
      if (typeof rMap[key] === 'string') {
        if (HttpMethods.some(v => rMap[key].startsWith(v))) {
          const [method, url] = rMap[key].split(' ');
          return axios({ url, method, [method.toUpperCase() === 'GET' ? 'params' : 'data']: data });
        }
        return axios({ url: rMap[key], params: data });
      }
      return axios(Object.assign(rMap[key], { data }));
    };
    return fMap;
  }, {});
}

const API = apiConfig<ApiMap>({
  getCity: 'POST /hangzhou/singleDog/getCity',
  listLuckyDoy: 'GET /activity/listLuckyDoy',
  trans: 'GET //oauthbiz.lizhi.fm/checkAppTrans',
});

export default API;
