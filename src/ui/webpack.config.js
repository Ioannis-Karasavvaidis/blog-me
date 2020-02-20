/* eslint  import/no-extraneous-dependencies:0 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const webpack = require('webpack');

const minimizer = require('../../webpack.minimizer');

const outputDirectory = '../../dist/public';

const isDevEnv = process.env.NODE_ENV === 'development';

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    // eslint-disable-next-line no-param-reassign
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return {
    entry: ['./src/ui/index.js'],
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: `js/[name].[hash].js`,
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            // postcss: [require('postcss-cssnext')()],
            // options: {
            //     extractCSS: true
            // },
            loaders: {
              js: 'babel-loader',
            },
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: !isDevEnv,
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: !isDevEnv,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000',
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.vue'],
      modules: [
        path.resolve('./src'),
        path.resolve('./src/ui'),
        path.resolve('./node_modules'),
      ],
    },
    devServer: {
      historyApiFallback: true,
      port: 3002,
      open: false,
      https: true,
      host: '0.0.0.0',
      proxy: {
        '/api': 'http://localhost:3001',
        '/locales': 'http://localhost:3001',
      },
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin(envKeys),
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        favicon: './src/public/favicon.ico',
      }),
    ],
    stats: {
      all: false,
      modules: true,
      errors: true,
      errorDetails: true,
      colors: true,
      version: true,
      timings: true,
    },
    optimization: {
      minimizer,
      mergeDuplicateChunks: true,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
              )[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            chunks: 'all',
          },
        },
      },
    },
  };
};
