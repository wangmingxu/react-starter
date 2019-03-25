const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '..'); // 项目根目录
const CLIENT_PATH = path.join(ROOT_PATH, 'client'); // 源码目录
const VIEW_PATH = path.join(ROOT_PATH, 'views'); // 视图目录
const DIST_PATH = path.join(ROOT_PATH, 'dist'); // 输出目录
const SERVER_PATH = path.join(ROOT_PATH, 'server'); // 输出目录
module.exports = {
  common: {
    polyfill: path.resolve(CLIENT_PATH, 'polyfill.ts'),
    entry: path.resolve(CLIENT_PATH, 'index.tsx'), // js入口
    index: path.resolve(VIEW_PATH, 'tpl/index.html'), // html入口
    rootPath: ROOT_PATH,
    clientPath: CLIENT_PATH,
    viewPath: VIEW_PATH,
    distPath: DIST_PATH,
    serverPath: SERVER_PATH,
  },
  build: {
    port: 80,
    BASE_PATH: '', // 用于React-Router的basename
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'client', // 单独创建一个目录存放静态资源，方便upload
    assetsPublicPath: '/',
    codeSplit: true, // 是否启用路由按需加载
    bundleAnalyzerReport: true,
    analyzerPort: 7777,
    tinyApiKey: '6i9NPe1a2nU6YN1k5tjrTEQyK4h3-ZDU',
    mergeCssChunks: true,
    usePWA: false, // 是否启用PWA
    PWAEntry: path.resolve(CLIENT_PATH, 'registerServiceWorker.ts'), // js入口
    cacheApiRegular: /hangzhou\/singleDog/, // 正则匹配需要缓存的api链接,用于离线应用
  },
  dev: {
    port: 8080,
    autoOpenBrowser: false,
    assetsSubDirectory: 'client',
    assetsPublicPath: '/',
  },
};
