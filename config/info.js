/*
 网站相关信息
 */
const path = require('path');
const { common } = require('./build.config');

module.exports = {
  app: {
    title: 'Way爱而声',
    description: 'Way爱而声',
    keywords: 'lizhi',
    favicon: path.join(common.clientPath, 'assets/favicon.ico'),
  },
};
