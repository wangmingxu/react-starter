/**
 * 生产构建配置
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PreloadWebpackPlugin = require('preload-webpack-plugin-fork');
const CrossOriginPlugin = require('script-crossorigin-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { common, build } = require('./build.config');
const utils = require('./utils');
const info = require('./info');
const baseConfig = require('./webpack.config.base');
const ManifestPlugin = require('webpack-manifest-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const { RENDER_MODE } = process.env;

const clientConfig = merge(baseConfig, {
  entry: build.usePWA ? { registerSW: path.resolve(common.clientPath, 'registerServiceWorker.ts') } : {},
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
          // test: /[\\/]node_modules[\\/]/,
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
  devtool: false,
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
    ].concat(build.codeSplit ? [{
      test: /\.(ts|tsx)$/,
      include: path.join(common.clientPath, 'Page'),
      use: [
        'bundle-loader?lazy',
        'babel-loader?cacheDirectory',
        {
          loader: 'awesome-typescript-loader',
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true,
          },
        },
      ],
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
    new ForkTsCheckerWebpackPlugin({
      tsconfig: '../tsconfig.json',
    }),
    /** 清空dist目录* */
    new CleanWebpackPlugin([common.distPath], {
      root: common.rootPath,
    }),
    new ManifestPlugin({
      filter(file) {
        return /\.(js|css)/.test(file.name);
      },
    }),
  ].concat(build.bundleAnalyzerReport ? [
    /** 分析打包情况* */
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerPort: build.analyzerPort,
      openAnalyzer: false,
      reportFilename: 'report.html',
      excludeAssets: [/eruda/, /fundebug/],
    }),
  ] : []).concat(RENDER_MODE === 'spa' && build.usePWA ? [
    new WorkboxPlugin.GenerateSW({
      swDest: 'service-worker.js',
      importWorkboxFrom: 'local',
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.map\?\w+/, /\.html$/], // 如果不需要离线访问功能建议不缓存html
      // ignoreUrlParametersMatching: [/./],//查找缓存时忽略查询参数
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
      '.js', '.jsx', '.json', '.scss', '.less', '.html', '.ejs', '.ts', '.tsx',
    ], // 当requrie的模块找不到时，添加这些后缀
    alias: baseConfig.resolve.alias,
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
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader?cacheDirectory',
          {
            loader: 'awesome-typescript-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
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
      'process.env.BASE_PATH': JSON.stringify(build.BASE_PATH),
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: '../tsconfig.json',
    }),
  ],
};

const prodConfig = RENDER_MODE === 'ssr' ? [clientConfig, serverConfig] : clientConfig;

module.exports = prodConfig;
