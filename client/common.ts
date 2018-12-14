import preload from '@/utils/preload';
import { initBaiduStat, initFundebug } from '@/utils/stat';
import FastClick from 'fastclick';
import 'url-polyfill';
import './styles/global.less';

FastClick.attach(document.body);

if (/debug/.test(location.href)) {
  require.ensure([], (require) => {
    const eruda: any = require('eruda');
    eruda.init();
  }, console.log, 'eruda');
}

initFundebug();

initBaiduStat();

// 页面的背景图片都比较大 需要预加载
const pageBgSet = require.context('@/assets/voicereport', false, /bg-\w+\.png/)
pageBgSet.keys().forEach(key => {
  preload(pageBgSet(key))
})