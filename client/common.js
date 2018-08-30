import babelHelpers from 'script-loader!../helpers.js'; //eslint-disable-line
import './styles/global.less';
import FastClick from 'fastclick';
import { wxConfig, appConfig } from './config';
import { fundebugApiKey, baiduTongjiID } from './constant';
import { registerInterceptor } from 'utils/api';
import { clientJWTInterceptor } from 'utils/JWTInterceptor';
import shareCover from './assets/share_cover.jpg';
import ClientDetect from 'rc-useragent/ClientDetect';

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

const client = ClientDetect.getInstance();
document.documentElement.setAttribute('data-lizhi', client.isLizhiFM);
document.documentElement.setAttribute('data-platform', client.checkDeviceType());
window.debug = location.search.includes('debug');
window.isPre = location.host.includes('pre') || location.search.includes('pre');

// 请求拦截器,获取token并添加到请求参数中
registerInterceptor(clientJWTInterceptor);

window.shareData = {
  url: location.href.replace(location.hash, ''),
  link: location.href,
  title: '测试标题',
  desc: '快来测试一下',
  'image-url': shareCover,
  imgUrl: shareCover,
};

if (client.isLizhiFM) {
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

if (client.isWeiXin) {
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
