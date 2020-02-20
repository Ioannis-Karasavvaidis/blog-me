/* eslint-disable import/no-extraneous-dependencies */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const minimizer = require('../../webpack.minimizer');

module.exports = {
  target: 'node',
  entry: './src/server/index.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, '/../../dist'),
    filename: 'server.js',
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
        use: [],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
    modules: [
      path.resolve('./src'),
      path.resolve('./src/server'),
      path.resolve('./node_modules'),
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/server/locales',
        to: 'locales',
      },
    ]),
  ],
  // externals: {
  //   bufferutil: 'commonjs bufferutil',
  //   'utf-8-validate': 'commonjs utf-8-validate',
  //   uws: 'commonjs uws',
  // },
  optimization: {
    minimizer,
  },
};
