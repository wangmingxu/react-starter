// 开发构建配置
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const { common, isomorphic } = require('./build.config');
const info = require('./info');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    'webpack/hot/only-dev-server',
    baseConfig.entry.app,
  ],
  module: {
    loaders: [
      {
        test: /\.(css|less)$/,
        include: common.clientPath,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })),
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    /** 生成入口html文件* */
    new HtmlWebpackPlugin(Object.assign(info.app, {
      template: common.index,
      filename: 'index.html',
      isomorphic,
    })),
    // 配置全局常量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
