const lessParser = require('postcss-less').parse;
const path = require('path');
const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('../config/webpack.config.dev');
const { common, dev } = require('../config/build.config');
const proxyTable = require('../proxy/dev/proxyTable');
const mockTable = require('../proxy/dev/mockTable');
const proxyMiddleware = require('proxy-middleware');
const useragent = require('express-useragent');
const chokidar = require('chokidar');
const utils = require('../config/utils');

// Provide custom regenerator runtime and core-js
require('@babel/polyfill');

// Node babel source map support
require('source-map-support').install();

// Javascript require hook
require('@babel/register')({
  extensions: ['.jsx', '.js', '.tsx', '.ts'],
  presets: [['@babel/preset-typescript', {
    jsxPragma: 'preserve',
  }], ['@babel/preset-env', {
    modules: 'commonjs',
  }]],
  plugins: [
    ['module-resolver', {
      extensions: ['.jsx', '.js', '.tsx', '.ts'],
      root: ['../'],
      alias: {
        '@': './client',
        '@lz-component': '@lizhife/lz-market-component/lib',
        '@lz-service': '@lizhife/lz-market-service/package',
      },
    }],
    'dynamic-import-node',
  ],
});

// Css require hook
require('css-modules-require-hook')({
  extensions: ['.less', '.css'],
  processorOpts: { parser: lessParser },
  generateScopedName: '[name]__[local]--[hash:base64:5]',
});

// Image require hook
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif', 'webp'],
  limit: 8000,
  name: `/${utils.assetsPath('assets/[name].[ext]?[hash]')}`,
});

const { RENDER_MODE } = process.env;

global.__ISOMORPHIC__ = process.env.RENDER_MODE === 'ssr';

const compiler = webpack(config);

// Webpack hook event to write html file into `/views/dev` from `/views/tpl` due to server render
compiler.plugin('emit', (compilation, callback) => {
  const { assets } = compilation;
  let file;
  let data;

  Object.keys(assets).forEach((key) => {
    if (key.match(/\.html$/)) {
      file = path.join(common.viewPath, 'dev', key);
      data = assets[key].source();
      console.log(key);
      fs.writeFileSync(file, data);
    }
  });
  callback();
});

// mock api requests
Object.keys(mockTable).forEach((context) => {
  app.use(context, mockTable[context]);
});

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  const options = proxyTable[context];
  app.use(context, proxyMiddleware(options));
});


app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.get('/:path?/:filename(*.*)', webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
}));

if (RENDER_MODE === 'ssr') {
  app.use(useragent.express());

  app.set('views', path.resolve(__dirname, '../views/dev'));
  app.set('view engine', 'html');
  // app.engine('html', require('ejs').renderFile);
  app.engine('html', require('hbs').__express);

  // '/'会默认跳到webpack-dev-server的index.html
  app.use((req, res, next) => {
    require('./middlewares/clientRoute')(req, res, next);
  });
} else {
  app.get('/', (req, res) => {
    res.sendFile(path.join(common.viewPath, 'dev', 'index.html'));
  });
}

app.listen(dev.port, () => {
  console.log(`app listening on port ${dev.port}!\n`);
});

function cleanCache(modulePath) {
  const module = require.cache[modulePath];
  // remove reference in module.parent
  if (module && module.parent) {
    module.parent.children.splice(module.parent.children.indexOf(module), 1);
  }
  require.cache[modulePath] = null;
}

// 和客户端复用的代码进行热更新,避免重启服务
const watchConfig = {
  dir: [path.join(__dirname, '../client')],
  options: {},
};
chokidar.watch(watchConfig.dir, watchConfig.options).on('change', (_path) => {
  console.log(`${_path} changed`);
  Object.keys(require.cache).forEach((cachePath) => {
    if (/[/\\]client[/\\]/.test(cachePath)) {
      cleanCache(cachePath);
    }
  });
});
