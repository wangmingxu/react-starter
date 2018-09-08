/**
 * 生产构建配置
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const info = require('./info');
const utils = require('./utils');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { common, build } = require('./build.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PreloadWebpackPlugin = require('preload-webpack-plugin-fork');
const CrossOriginPlugin = require('script-crossorigin-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const { RENDER_MODE } = process.env;

const clientConfig = merge(baseConfig, {
  entry: build.usePWA ? { registerSW: path.resolve(common.clientPath, 'registerServiceWorker.js') } : {},
  mode: 'production',
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimize: true, // [new UglifyJsPlugin({...})]
    splitChunks: {
      cacheGroups: Object.assign({
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
        },
        'async-vendor': {
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendor',
        },
      }, build.mergeCssChunks ? {
        styles: {
          name: 'styles',
          test: /\.less|css$/,
          chunks: 'all', // merge all the css chunk to one file
          enforce: true,
        },
      } : {}),
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: common.clientPath,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              minimize: true, // css压缩
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ].concat(RENDER_MODE === 'spa' && build.codeSplit ? [{
      test: /\.js$/,
      include: path.join(common.clientPath, 'Page'),
      use: ['bundle-loader?lazy', 'babel-loader'],
    }] : []),
  },
  plugins: [
    new HtmlWebpackPlugin(Object.assign(info.app, {
      template: common.index,
      filename: RENDER_MODE === 'ssr' ? path.join(common.viewPath, 'prod/index.html') : 'index.html',
      isomorphic: RENDER_MODE === 'ssr',
    })),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedChunksPlugin(),
    new CrossOriginPlugin(),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
    }),
    /** 清空dist目录* */
    new CleanWebpackPlugin([common.distPath], {
      root: common.rootPath,
    }),
  ].concat(build.bundleAnalyzerReport ? [
    /** 分析打包情况* */
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerPort: build.analyzerPort,
      openAnalyzer: false,
      reportFilename: 'report.html',
    }),
  ] : []).concat(RENDER_MODE === 'spa' && build.usePWA ? [
    new WorkboxPlugin.GenerateSW({
      swDest: 'service-worker.js',
      importWorkboxFrom: 'local',
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.map\?\w+/],
      dontCacheBustUrlsMatching: /\?\w{8,20}$/, // 不用插件的revision,而是通过URL中的版本戳进行唯一版本化,减少precache带来的带宽消耗
      runtimeCaching: [
        {
          urlPattern: build.cacheApiRegular, // 匹配url
          handler: 'networkFirst', // 网络优先
        },
        {
          urlPattern: /\.(js|css)\?\w+/, // 匹配url
          handler: 'networkFirst', // 网络优先
        },
      ],
    }),
  ] : []),
});

const serverConfig = {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  context: common.clientPath,
  entry: { server: path.join(common.serverPath, 'server.prod') },
  output: {
    path: common.distPath,
    filename: 'server/[name].js',
    chunkFilename: 'server/chunk.[name].js',
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false,
  },
  resolve: {
    modules: [common.clientPath, 'node_modules'],
    extensions: [
      '.js', '.jsx', '.json', '.scss', '.less', '.html', '.ejs',
    ], // 当requrie的模块找不到时，添加这些后缀
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              modules: 'commonjs',
              useBuiltIns: 'usage',
            }]],
            plugins: [
              'dynamic-import-node',
            ],
          },
        }],
      },
      {
        test: /\.(css|less)$/,
        use: [
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: utils.assetsPath('assets/[name].[ext]?[hash]'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SERVER_URL': JSON.stringify(build.SERVER_URL),
    }),
  ],
};

const prodConfig = RENDER_MODE === 'ssr' ? [clientConfig, serverConfig] : clientConfig;

module.exports = prodConfig;
