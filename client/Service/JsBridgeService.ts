import { default as superClass, JSB_SERVICE_TOKEN } from '@lizhife/lz-market-service/package/JsBridgeService';
import axios from 'axios';

class JsBridgeService extends superClass {

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
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideconfigMenu',
          'showconfigMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard',
          'updateTimelineShareData',
          'updateAppMessageShareData',
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    });
  };
}

export {JSB_SERVICE_TOKEN};

export default JsBridgeService;
