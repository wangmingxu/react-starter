/**
 * 生产构建配置
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackAssetsManifest = require('webpack-manifest-plugin');
const { common, build } = require('./build.config');
const utils = require('./utils');
const info = require('./info');
const baseConfig = require('./webpack.config.base');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const { RENDER_MODE } = process.env;

const clientConfig = merge(baseConfig, {
  entry: build.usePWA ? [build.PWAEntry] : [],
  mode: 'production',
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimize: true, // [new UglifyJsPlugin({...})]
    splitChunks: {
      cacheGroups: Object.assign(
        {
          polyfill: {
            test: /[\\/]node_modules[\\/](core-js|.+polyfill)[\\/]/,
            name: 'polyfill',
            chunks: 'all',
            priority: 20,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
          },
          'async-vendor': {
            // test: /[\\/]node_modules[\\/]/,
            minChunks: 2,
            chunks: 'async',
            name: 'async-vendor',
          },
        },
        build.mergeCssChunks
          ? {
              styles: {
                name: 'styles',
                test: /\.less|css$/,
                chunks: 'all', // merge all the css chunk to one file
                enforce: true,
              },
            }
          : {}
      ),
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
              context: path.resolve(common.clientPath, 'styles'),
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ].concat(
      build.codeSplit
        ? [
            {
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
            },
          ]
        : []
    ),
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(info.app, {
        template: common.index,
        filename:
          RENDER_MODE === 'ssr' ? path.join(common.viewPath, 'prod/index.html') : 'index.html',
      })
    ),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedChunksPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      custom: {
        test: /\.js/,
        attribute: 'crossorigin',
        value: 'anonymous',
      },
      prefetch: {
        test: /\.js(?!\.map)/,
        chunks: 'async',
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: '../tsconfig.json',
    }),
    /** 清空dist目录* */
    new CleanWebpackPlugin([common.distPath], {
      root: common.rootPath,
    }),
    new WebpackAssetsManifest(),
  ]
    .concat(
      build.bundleAnalyzerReport
        ? [
            /** 分析打包情况* */
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              analyzerPort: build.analyzerPort,
              openAnalyzer: false,
              reportFilename: 'report.html',
              excludeAssets: [/eruda/, /fundebug/],
            }),
          ]
        : []
    )
    .concat(
      RENDER_MODE === 'csr' && build.usePWA
        ? [
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
          ]
        : []
    ),
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
    extensions: ['.js', '.jsx', '.json', '.scss', '.less', '.html', '.ejs', '.ts', '.tsx'], // 当requrie的模块找不到时，添加这些后缀
    alias: baseConfig.resolve.alias,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: 'commonjs',
                    useBuiltIns: 'usage',
                  },
                ],
              ],
              plugins: ['dynamic-import-node'],
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory',
            options: {
              plugins: [
                [
                  'import',
                  {
                    libraryName: 'antd-mobile',
                    style: false,
                  },
                ],
              ],
            },
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              context: path.resolve(common.clientPath, 'styles'),
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              importLoaders: 2,
              exportOnlyLocals: true,
            },
          },
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
      __ISOMORPHIC__: RENDER_MODE === 'ssr',
      'process.env.BASE_PATH': JSON.stringify(build.BASE_PATH),
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: '../tsconfig.json',
    }),
  ],
};

const prodConfig = RENDER_MODE === 'ssr' ? [clientConfig, serverConfig] : clientConfig;

module.exports = prodConfig;
