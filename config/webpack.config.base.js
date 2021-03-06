const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('webpackbar');
const { common, dev, build } = require('./build.config');
const utils = require('./utils');
const { theme } = require('../package.json');

const { NODE_ENV, RENDER_MODE } = process.env;

const publicPath = NODE_ENV === 'production' ? build.assetsPublicPath : dev.assetsPublicPath;

const baseConfig = {
  context: common.clientPath,
  entry: [common.polyfill, common.entry],
  output: {
    path: common.distPath,
    filename:
      NODE_ENV === 'production'
        ? utils.assetsPath('js/[name].js?[chunkhash]')
        : utils.assetsPath('js/[name].js?[hash]'),
    chunkFilename: utils.assetsPath('js/[name].js?[chunkhash]'),
    publicPath,
    crossOriginLoading: NODE_ENV === 'production' ? 'anonymous' : false, // 只有按需加载chunk时才会加这个属性
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.scss', '.less'], // 当requrie的模块找不到时，添加这些后缀
    alias: {
      '@': common.clientPath,
      '@common-service': 'di-sdk/package',
      'babel-runtime': '@babel/runtime',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: common.clientPath,
        use: [
          {
            loader: 'babel-loader?cacheDirectory',
            options: {
              plugins: ['@babel/plugin-external-helpers'],
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: theme,
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)$/, // 这些资源包括在js中import或在css中background url引入都会被处理
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
    /** 只引入zh-cn语言包 */
    new webpack.ContextReplacementPlugin(/^\.\/locale$/, /zh-cn/),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      __ISOMORPHIC__: RENDER_MODE === 'ssr',
      PUBLIC_URL: JSON.stringify(publicPath.slice(0, -1)),
    }),
    /** 抽取css文件* */
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css?[contenthash]'),
      allChunks: true,
    }),
    new webpack.LoaderOptionsPlugin({
      options: {},
    }),
  ],
  // 通过script引入,不打包到一起
  externals: [],
};

module.exports = baseConfig;
