import axios from 'axios';
import { DefaultInterceptor } from './DefaultInterceptor';

export const axiosInstance = axios.create();

export const registerInterceptor = interceptor => interceptor.call(axiosInstance);

export const unregisterInterceptor = (id) => {
  axiosInstance.interceptors.request.eject(id);
};

registerInterceptor(DefaultInterceptor);

const HttpMethods = ['GET', 'POST', 'PUT', 'DELETE'];

function apiConfig(rMap) {
  return Object.keys(rMap).reduce((fMap, key) => {
    fMap[key] = (data, config = {}) => {
      if (typeof rMap[key] === 'string') {
        if (HttpMethods.some(v => rMap[key].startsWith(v))) {
          const [method, url] = rMap[key].split(' ');
          return axiosInstance(Object.assign(
            config,
            { url, method, [/GET/i.test(method) ? 'params' : 'data']: data },
          ));
        }
        return axiosInstance(Object.assign(config, { url: rMap[key], params: data }));
      }
      return axiosInstance(Object.assign(rMap[key], { data }));
    };
    return fMap;
  }, {});
}

const api = apiConfig({
  getCity: 'GET /hangzhou/singleDog/getCity',
  listLuckyDoy: 'POST /activity/listLuckyDoy',
  trans: 'GET //oauthbiz.lizhi.fm/checkAppTrans',
});

export default api;
