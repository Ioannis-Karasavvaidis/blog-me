const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  new TerserPlugin({
    cache: true,
    parallel: true,
    terserOptions: {
      ecma: 6,
    },
  }),
];