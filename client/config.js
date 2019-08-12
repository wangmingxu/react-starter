import axios from 'axios';
import { lzAuthUrl, wxJsConfUrl } from './constant';

export function wxConfig() {
  const {
    protocol, host, pathname, search,
  } = location;
  const link = `${protocol}//${host}${pathname}${search}`;

  axios({
    url: wxJsConfUrl,
    params: {
      currentURL: link,
    },
  }).then((res) => {
    const { data } = res.data;
    const { wx } = window;

    if (!data) {
      return;
    }

    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appid, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名，见附录1
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
      ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
  });
}

export function appConfig() {
  lz.config({
    debug: false,
    url: lzAuthUrl,
    apiList: [
      'getAppInfo',
      'getToken',
      'getSessionUser',
      'gotoLogin',
      'shareUrl',
      'startRecordVoice',
      'stopRecordVoice',
      'uploadRecordVoice',
      'replayRecordVoice',
    ],
    eventList: ['user:login', 'recordStateChange', 'shareFinish'],
  });
}
