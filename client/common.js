import babelHelpers from 'script-loader!../helpers.js';//eslint-disable-line
import 'babel-polyfill';
import './styles/global.less';
import FastClick from 'fastclick';
import client from './utils/ua';
import { wxConfig, appConfig } from './config';
import { fundebugApiKey, baiduTongjiID } from './constant';
import fundebug from 'fundebug-javascript';
import { axiosInstance } from 'utils/api';
import promiseFinally from 'promise.prototype.finally';
import shareCover from './assets/share_cover.jpg';
import store from 'Store';
import get from 'lodash/get';
import 'url-search-params-polyfill';

promiseFinally.shim();

fundebug.apikey = fundebugApiKey;
fundebug.releasestage = process.env.NODE_ENV;
// console.log(process.env.NODE_ENV);

FastClick.attach(document.body);

window.isApp = client.isLizhiFM();
window.isWX = client.isWeiXin();
window.isWeiBo = client.isWeiBo();
window.platform = client.selectPlatform();
document.documentElement.setAttribute('data-lizhi', window.isApp);
document.documentElement.setAttribute('data-platform', window.platform);
window.debug = location.search.includes('debug');
window.isPre = location.host.includes('pre') || location.search.includes('pre');

// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
  if (window.isApp) {
    const { method } = config;
    const dataKey = method === 'get' ? 'params' : 'data';
    Object.assign(config, {
      [dataKey]: Object.assign(config[dataKey] || {}, { token: get(store.getState(), ['Global', 'token']) }),
    });
  }
  return config;
});

window.shareData = {
  url: window.location.href.replace(location.hash, ''),
  link: window.location.href,
  title: '声音气质报告',
  desc: '快来测试一下',
  'image-url': shareCover,
  imgUrl: shareCover,
};

if (window.isApp) {
  appConfig();
  lz.ready(() => {
    LizhiJSBridge.call('configShareUrl', {
      url: window.shareData.url, // 分享的url
      title: window.shareData.title, // 分享标题
      desc: window.shareData.desc, // 分享的描述
      'image-url': window.shareData.imgUrl, // 分享的图片
    }, (ret) => {
      console.log(ret);
    });
  });
}

if (window.isWX) {
  function onBridgeReady() {
    wxConfig();
    wx.ready(() => {
      wx.onMenuShareAppMessage(window.shareData);
      wx.onMenuShareTimeline(window.shareData);
    });
  }
  if (typeof WeixinJSBridge === 'undefined') {
    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
  } else {
    onBridgeReady();
  }
}

window._hmt = window._hmt || [];
(function () {
  const hm = document.createElement('script');
  hm.src = `https://hm.baidu.com/hm.js?${baiduTongjiID}`;
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
}());
