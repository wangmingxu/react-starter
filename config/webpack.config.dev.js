// 开发构建配置
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const { common } = require('./build.config');
const info = require('./info');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { RENDER_MODE } = process.env;

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    'webpack/hot/only-dev-server',
    baseConfig.entry.polyfill,
    baseConfig.entry.app,
  ],
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: common.clientPath,
        use: ['css-hot-loader'].concat([
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
        ]),
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
      isomorphic: RENDER_MODE === 'ssr',
    })),
  ],
});
