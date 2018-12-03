/*
 网站相关信息
 */
const path = require('path');
const { common } = require('./build.config');

module.exports = {
  app: {
    title: '声音气质报告',
    description: '声音黑科技，5秒暴露你的迷人气质！',
    keywords: '声音气质报告，荔枝，声鉴卡',
    favicon: path.join(common.clientPath, 'assets/favicon.ico'),
  },
};
