// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');

const PORT = 3101;

module.exports = merge(commonConfig, {
	mode: 'development',
	entry: [
		'./src/index.tsx'
	],
	output: {
		publicPath: '/'
	},
	devServer: {
		hot: true,
		liveReload: false,
		historyApiFallback: {
			disableDotRule: true
		},
		port: PORT,
		publicPath: `http://10.10.1.186:${PORT}/`,
		host: '0.0.0.0'
	},
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(), // enable HMR globally
		new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
	],
});
