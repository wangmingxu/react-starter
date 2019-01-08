/*
 网站相关信息
 */
const path = require('path');
const { common } = require('./build.config');

module.exports = {
  app: {
    title: 'react-starter',
    description: 'create react app for isomorphic application',
    keywords: 'lizhi',
    favicon: path.join(common.clientPath, 'assets/favicon.ico'),
  },
};
