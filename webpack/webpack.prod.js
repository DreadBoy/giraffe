// production config
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const {resolve} = require('path');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/giraffe/',
  },
  devtool: 'source-map',
  plugins: [],
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
                sourceMap: true,
			}),
		]
	}
});
