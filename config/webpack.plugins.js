const dotenv = require('dotenv');

// importing webpack dependencies
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

// instantiating webpack dependencies
const cleanWebpack = new CleanWebpackPlugin();
const htmlWebpack = new htmlWebpackPlugin({
	template: './public/index.html',
	filename: 'index.html',
	inject: 'body',
	title: 'Curry',
	favicon: './public/favicon.ico',
	materialIcons: 'https://fonts.googleapis.com/icon?family=Material+Icons',
	minify: {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		useShortDoctype: true,
		removeEmptyAttributes: true,
		removeStyleLinkTypeAttributes: true,
		keepClosingSlash: true,
		minifyJS: true,
		minifyCSS: true,
		minifyURLs: true,
	},
});
const miniCssExtract = new miniCssExtractPlugin();
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const hashedPlugin = new webpack.HashedModuleIdsPlugin();

/**
 * Parses environment variables into a format acceptable by the webpack DefinePlugin
 * @param {object} configs Object literal containing configuration variables to
 * parse before sending them to react
 */
const parseConfigs = configs => Object.keys(configs || {}).reduce(
  (acc, val) => ({ ...acc, [val]: JSON.stringify(configs[val]) }),
  {},
);

// fetch system environment variables
const systemVariables = parseConfigs(process.env);

// fetch environment variables from the dotenv file
const { parsed: dotenvConfigs } = dotenv.config();

// process the environment variables from the dotenv file
const processedDotenvConfigs = parseConfigs(dotenvConfigs);

const definePlugin = new webpack.DefinePlugin({
  'process.env': { ...processedDotenvConfigs, ...systemVariables },
});

module.exports = {
  cleanWebpack,
  definePlugin,
  htmlWebpack,
  miniCssExtract,
  miniCssExtractPlugin,
  hotModuleReplacementPlugin,
  hashedPlugin,
};
