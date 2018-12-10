import FastClick from 'fastclick';
import 'url-polyfill';
import './styles/global.less';
import { initBaiduStat, initFundebug } from './utils/stat';

FastClick.attach(document.body);

if (/debug/.test(location.href)) {
  require.ensure([], (require) => {
    const eruda: any = require('eruda');
    eruda.init();
  }, console.log, 'eruda');
}

initFundebug();

initBaiduStat();
