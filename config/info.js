/*
 网站相关信息
 */
const path = require('path');
const { common } = require('./build.config');

module.exports = {
  app: {
    title: '声音情书',
    description: '声音情书',
    keywords: 'lizhi',
    favicon: path.join(common.clientPath, 'assets/favicon.ico'),
  },
};
