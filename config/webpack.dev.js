const merge = require('webpack-merge');
const path = require('path');
const config = require('./webpack.config.js');
const {
  hotModuleReplacementPlugin,
} = require('./webpack.plugins');

module.exports = merge(config, {
  output: {
    publicPath: 'http://curry.com:3000/',
  },
  optimization: {
    namedModules: true,
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../src/assets'),
    publicPath: 'http://curry.com:3000/',
    hot: true,
    overlay: true,
    port: 3000,
    host: 'localhost',
    open: true,
    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  },
  plugins: [hotModuleReplacementPlugin],
});
