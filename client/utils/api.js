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
          return axiosInstance(Object.assign(config, { url, method, [/GET/i.test(method) ? 'params' : 'data']: data }));
        }
        return axiosInstance(Object.assign(config, { url: rMap[key], params: data }));
      }
      return axiosInstance(Object.assign(rMap[key], { data }));
    };
    return fMap;
  }, {});
}

const api = apiConfig({
  addAudio: 'GET /commonvote/common/addAudio', // 发布节目 token 用户token   title节目标题   audio 音频地址   mediaId 音频id（uploadid）  duration  时长  sId 学校id link手机号
  allIn: 'GET /newvoice/allIn', // 给节目投入所有贡献值 token 用户token   id 节目id
  vote: 'GET /commonvote/common/vote', // 给节目投入10贡献值 token 用户token   id 节目id
  getLoginVote: 'GET /newvoice/getLoginVote', // 领取每天登陆的贡献值 token 用户token
  getShareVote: 'GET /newvoice/getShareVote', // 领取每天分享的贡献值 token 用户token
  listCover: 'GET /commonvote/common/hot', // 列出翻唱榜单 pageIndex 页数  pageSize 每页大小（可不传，默认10）  nickName 查询的昵称（可不传）
  listMyAudio: 'GET /commonvote/common/mine', // 列出个人的节目列表 page 页数  pageSize 每页大小（可不传，默认10）  token 用户token
  listTalk: 'GET /commonvote/common/hot', // 列出说说榜单 page 页数  pageSize 每页大小（可不传，默认10）  nickName 查询的学校名（可不传）
  audioInfo: 'GET /commonvote/common/info', // 音频节目信息 id 节目id
  mine: 'GET /newvoice/mine', // 首页的个人信息（贡献值的记录，最近贡献的学校等) token 用户token
  isActiviting: 'GET /newvoice/isActiviting',
  transApp: 'GET //oauthbiz.lizhi.fm/checkAppTrans',
  transWX: 'GET //oauthbiz.lizhi.fm/transWechatAudioNew',
  getTicket: 'GET /commonvote/common/remain',
  getUserInfo: 'GET /commonvote/common/userInfo',
  getActivityInfo: 'GET /commonvote/common/activityInfo',
  getProvince: 'GET https://api.ftms.com.cn/Openapi/Openapi/SetClues/getCity1?cid=0',
  getRegionCity: 'POST https://api.ftms.com.cn/Openapi/Openapi/SetClues/getRegionCity',
  getDealer: 'POST https://api.ftms.com.cn/Openapi/Openapi/SetClues/getDealer',
});

export default api;
