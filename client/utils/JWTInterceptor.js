import { tokenKey } from 'constant';
import { getToken } from 'utils/auth';
import { ClientDetect } from 'rc-useragent';

export function clientJWTInterceptor() {
  const client = ClientDetect.getInstance();
  const JWTInterceptor = this.interceptors.request.use((config) => {
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
        .catch(console.log);
    }
    return config;
  });
  return JWTInterceptor;
}

export const serverJWTInterceptor = (client, universalCookies) =>
  function () {
    const JWTInterceptor = this.interceptors.request.use(
      (config) => {
        const { method, needAuth = false } = config;
        const dataKey = /GET/i.test(method) ? 'params' : 'data';
        const token = universalCookies.get(tokenKey);
        if (needAuth) {
          if (client.isLizhiFM) {
            Object.assign(config, {
              [dataKey]: Object.assign(config[dataKey] || {}, { token }),
            }); // 转发token
          } else if (client.isWeiXin) {
            Object.assign(config, {
              [dataKey]: Object.assign(config[dataKey] || {}, { openid: token }),
            }); // 转发openid(改成用token更安全)
          }
        }
        config.headers.common['User-Agent'] = client.source; // 转发User-Agent
        return config;
      },
      err => Promise.reject(err),
    );
    return JWTInterceptor;
  };
