import axios from 'axios';

export const axiosInstance = axios.create();

// 后端返回的数据结构体,默认是{status:xx,data:xx,msg:xx}
// 有些可能返回的是{rCode:xx,data:xx,message:xx}},根据项目而定
// 如果项目同时有多种结构体，可以考虑做成数组
const ResponseStructure = {
  status: 'status',
  data: 'data',
  msg: 'msg',
};

// 后端返回的状态码
const CustomResStatus = {
  SUCCESS: 0,
  NO_LOGIN: 2,
  Polling: 4,
};

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => Promise.resolve(response.data), // 避免每次都要写res.data.xxx
  error => Promise.reject(error),
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const { status, msg } = ResponseStructure;
    if ([CustomResStatus.SUCCESS, CustomResStatus.Polling].includes(response[status])) {
      return Promise.resolve(response);
    }
    return Promise.reject(response[msg]);
  },
  error => Promise.reject(error),
);

const HttpMethods = ['GET', 'POST', 'PUT', 'DELETE'];

function apiConfig(rMap) {
  return Object.keys(rMap).reduce((fMap, key) => {
    fMap[key] = (data, config = {}) => {
      if (typeof rMap[key] === 'string') {
        if (HttpMethods.some(v => rMap[key].startsWith(v))) {
          const [method, url] = rMap[key].split(' ');
          return axiosInstance(Object.assign(
            config,
            { url, method, [method.toUpperCase() === 'GET' ? 'params' : 'data']: data },
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
  addAudio: 'GET /loveletter/addAudio',
  loadAudioInfo: 'GET /loveletter/info',
  loadUser: 'GET //oauthbiz.lizhi.fm/weixin/loadUser?tag=brand',
  transApp: 'GET //oauthbiz.lizhi.fm/checkAppTrans',
  transWX: 'GET //oauthbiz.lizhi.fm/transWechatAudioNew?tag=brand',
});

export default api;
