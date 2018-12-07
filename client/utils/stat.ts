import { BaiduStatKey, fundebugApiKey } from '@/constant';

export const initBaiduStat = () => {
  window._hmt = window._hmt || [];
  const hm = document.createElement('script');
  hm.src = `https://hm.baidu.com/hm.js?${BaiduStatKey}`;
  const s = document.getElementsByTagName('script')[0];
  (s.parentNode as HTMLElement).insertBefore(hm, s);
};

export const initFundebug = () => {
  require.ensure([], (require) => {
    const fundebug: any = require('fundebug-javascript');
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
};
