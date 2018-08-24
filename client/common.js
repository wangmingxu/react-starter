import babelHelpers from 'script-loader!../helpers.js'; //eslint-disable-line
import './styles/global.less';
import FastClick from 'fastclick';
import client from './utils/ua';
import { wxConfig, appConfig } from './config';
import { fundebugApiKey, baiduTongjiID, wxidKey } from './constant';
import { axiosInstance } from 'utils/api';
import shareCover from './assets/share_cover.jpg';
import store from 'Store';
import get from 'lodash/get';

require.ensure([], (require) => {
  const fundebug = require('fundebug-javascript');
  fundebug.apikey = fundebugApiKey;
  fundebug.releasestage = process.env.NODE_ENV;
  fundebug.sampleRate = 0.3;
  fundebug.silentHttp = true;
  fundebug.filters = [
    {
      message: /^Script error\.$/,
    },
    {
      message: /Network Error/,
    },
    {
      message: /JSBridge/,
    },
    {
      target: {
        tagName: /^IMG$/,
      },
    },
  ];
}, console.log, 'fundebug');

FastClick.attach(document.body);

window.isApp = client.isLizhiFM();
window.isWX = client.isWeiXin();
window.isWeiBo = client.isWeiBo();
window.platform = client.checkPlatform();
document.documentElement.setAttribute('data-lizhi', window.isApp);
document.documentElement.setAttribute('data-platform', window.platform);
window.debug = location.search.includes('debug');
window.isPre = location.host.includes('pre') || location.search.includes('pre');

// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
  const { method } = config;
  const dataKey = method === 'get' ? 'params' : 'data';
  if (window.isApp) {
    const token = get(store.getState(), ['Global', 'token']);
    Object.assign(config, {
      [dataKey]: Object.assign(config[dataKey] || {}, { token }),
    });
  } else if (window.isWX) {
    const openid = localStorage.getItem(wxidKey);
    Object.assign(config, {
      [dataKey]: Object.assign(config[dataKey] || {}, { openid }),
    });
  }
  return config;
});

window.shareData = {
  url: location.href.replace(location.hash, ''),
  link: location.href,
  title: '声音气质报告',
  desc: '快来测试一下',
  'image-url': shareCover,
  imgUrl: shareCover,
};

if (window.isApp) {
  appConfig();
  lz.ready(() => {
    LizhiJSBridge.call(
      'configShareUrl',
      {
        url: window.shareData.url, // 分享的url
        title: window.shareData.title, // 分享标题
        desc: window.shareData.desc, // 分享的描述
        'image-url': window.shareData.imgUrl, // 分享的图片
      },
      (ret) => {
        console.log(ret);
      },
    );
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
