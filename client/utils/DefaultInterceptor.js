// 后端返回的数据结构体,默认是{status:xx,data:xx,msg:xx}
// 有些可能返回的是{rCode:xx,data:xx,message:xx}},根据项目而定
const rDataMap = {
  status: 'status',
  data: 'data',
  msg: 'msg',
};

  // 后端返回的状态码
const rCodeMap = {
  SUCCESS: 0,
  NO_LOGIN: 2,
};

export function DefaultInterceptor() {
  this.interceptors.request.use((config) => {
    const { url } = config;
    if (!url.startsWith('https://') && !url.startsWith('http://') && process.env.SERVER_URL) {
      config.url = process.env.SERVER_URL + url;
    }
    return config;
  });
  this.interceptors.response.use(
    ({ data: response }) => {
      const { status, msg } = rDataMap;
      if (response[status] === rCodeMap.SUCCESS) {
        return Promise.resolve(response); // 避免每次都要写res.data.xxx
      }
      return Promise.reject(response[msg]);
    },
    error => Promise.reject(error),
  );
}

export default DefaultInterceptor;
