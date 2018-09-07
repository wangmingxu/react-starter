import babelHelpers from 'script-loader!../helpers.js'; //eslint-disable-line
import './styles/global.less';
import FastClick from 'fastclick';
import { wxConfig, appConfig } from './config';
import { fundebugApiKey, baiduTongjiID, getDefaultShareData } from './constant';
import { registerInterceptor } from 'utils/api';
import { clientJWTInterceptor } from 'utils/JWTInterceptor';
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

if (/debug/.test(location.href)) {
  require.ensure([], (require) => {
    const eruda = require('eruda');
    eruda.init();
  }, console.log, 'eruda');
}

FastClick.attach(document.body);

const client = ClientDetect.getInstance();

// 请求拦截器,获取token并添加到请求参数中
registerInterceptor(clientJWTInterceptor);

window.shareData = getDefaultShareData();

if (client.isLizhiFM) {
  appConfig();
  lz.ready(() => {
    LizhiJSBridge.call(
      'configShareUrl',
      window.shareData,
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
