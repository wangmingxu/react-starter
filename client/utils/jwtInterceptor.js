import { tokenKey } from 'constant';
import { getToken } from 'utils/auth';
import { ClientDetect } from 'rc-useragent';

const clientJWTInterceptor = (axiosInstance) => {
  const client = ClientDetect.getInstance();
  const JWTInterceptor = axiosInstance.interceptors.request.use((config) => {
    const { method, needAuth = false } = config;
    const dataKey = /GET/i.test(method) ? 'params' : 'data';
    if (needAuth) {
      return getToken()
        .then((token) => {
          if (client.isLizhiFM) {
            Object.assign(config, {
              [dataKey]: Object.assign(config[dataKey] || {}, { token }),
            });
          } else if (client.isWeiXin) {
            Object.assign(config, {
              [dataKey]: Object.assign(config[dataKey] || {}, { openid: token }),
            });
          }
          return config;
        })
        .catch(() => Promise.resolve(config));
    }
    return config;
  });
  return JWTInterceptor;
};

const serverJWTInterceptor = (axiosInstance, client, universalCookies) => {
  const JWTInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
      const { method, needAuth = false } = config;
      const dataKey = /GET/i.test(method) ? 'params' : 'data';
      const token = universalCookies.get(tokenKey);
      if (needAuth) {
        if (client.isLizhiFM) {
          Object.assign(config, {
            [dataKey]: Object.assign(config[dataKey] || {}, { token }),
          });// 转发token
        } else if (client.isWeiXin) {
          Object.assign(config, {
            [dataKey]: Object.assign(config[dataKey] || {}, { openid: token }),
          });// 转发openid(改成用token更安全)
        }
      }
      config.headers.common['User-Agent'] = client.source;// 转发User-Agent
      return config;
    },
    err => Promise.reject(err),
  );
  return JWTInterceptor;
};

export const initJWTInterceptor = (axiosInstance, client, cookies) => {
  const isServer = typeof exports === 'object';
  if (isServer) {
    serverJWTInterceptor(axiosInstance, client, cookies);
  } else {
    clientJWTInterceptor(axiosInstance);
  }
};
