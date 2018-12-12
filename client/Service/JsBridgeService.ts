import { default as superClass, JSB_SERVICE_TOKEN } from '@lz-service/JsBridgeService';
import axios from 'axios';

class JsBridgeService extends superClass {

  public lzJsbConfig = async () => {
    this.jsb.config({
      debug: false,
      url: this.config.lzJsConfUrl,
      apiList: [
        'isSupportFunc',
        'toAction',
        'getAppInfo',
        'getToken',
        'getSessionUser',
        'gotoLogin',
        'shareUrl',
        'startRecordVoice',
        'stopRecordVoice',
        'uploadRecordVoice',
        'replayRecordVoice',
        'shareImage',
        'saveImage',
        'configShareUrl',
      ],
      eventList: ['user:login', 'recordStateChange', 'shareFinish'],
    });
  };

  public wxJsbConfig = async () => {
    const {
      protocol, host, pathname, search,
    } = location;
    const link = `${protocol}//${host}${pathname}${search}`;

    axios({
      url: this.config.wxJsConfUrl,
      params: {
        url: link,
      },
    }).then((res) => {
      const data = res.data;

      if (!data) {
        return;
      }

      this.jsb.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'getNetworkType',
          'updateTimelineShareData',
          'updateAppMessageShareData',
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    });
  };
  
}

export {JSB_SERVICE_TOKEN};

export default JsBridgeService;
