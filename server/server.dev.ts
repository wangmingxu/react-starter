import '@babel/polyfill';
import 'reflect-metadata';

import * as assetRequireHook from 'asset-require-hook';
import * as chokidar from 'chokidar';
import * as cssModulesRequireHook from 'css-modules-require-hook';
import * as express from 'express';
import * as fs from 'fs';
import * as hbs from 'hbs';
import * as path from 'path';
import { parse as lessParser } from 'postcss-less';
import * as proxyMiddleware from 'proxy-middleware';
import * as sourceMapSupport from 'source-map-support';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import { common, dev } from '../config/build.config';
import * as utils from '../config/utils';
import * as baseWebpackConfig from '../config/webpack.config.base';
import * as config from '../config/webpack.config.dev';
import * as mockTable from '../proxy/dev/mockTable';
import * as proxyTable from '../proxy/dev/proxyTable';

const app = express();

// Node babel source map support
sourceMapSupport.install();

// Javascript require hook
// tslint:disable-next-line:no-var-requires
require('@babel/register')({
  ignore: [/node_modules\/(?!.+\/package\/)/],
  extensions: ['.jsx', '.js', '.tsx', '.ts'],
  presets: [
    ['@babel/preset-env', {
      modules: 'commonjs',
    }],
  ],
  plugins: [
    ['module-resolver', {
      extensions: ['.jsx', '.js', '.tsx', '.ts'],
      root: ['../'],
      alias: baseWebpackConfig.resolve.alias,
    }],
    'dynamic-import-node',
  ],
});

// Css require hook
cssModulesRequireHook({
  extensions: ['.less', '.css'],
  processorOpts: { parser: lessParser },
  generateScopedName: '[name]__[local]--[hash:base64:5]',
});

// Image require hook
assetRequireHook({
  extensions: ['jpg', 'png', 'gif', 'webp', 'svg'],
  limit: 8192,
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
  app.set('views', path.resolve(__dirname, '../views/dev'));
  app.set('view engine', 'html');
  app.engine('html', hbs.__express);

  // '/'会默认跳到webpack-dev-server的index.html
  app.use((req, res, next) => {
    require('./middlewares/clientRoute').default(req, res, next);
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
chokidar.watch(watchConfig.dir, watchConfig.options).on('change', (fileName) => {
  console.log(`${fileName} changed`);
  Object.keys(require.cache).forEach((cachePath) => {
    if (/[/\\]client[/\\]/.test(cachePath)) {
      cleanCache(cachePath);
    }
  });
});
