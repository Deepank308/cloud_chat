const webpack = require('webpack');
const resolve = require('path').resolve;


const config = {
	devtool: 'eval-source-map',
	entry: {
		index: __dirname + '/js/index.js',
		chatroom: __dirname + '/js/chatroom.js',
		home: __dirname + '/js/home.js'
	},
	output: {
		path: resolve('../static'),
		filename: '[name].bundle.js',
		publicPath: resolve('../static')
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css']
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules'
			}]
	}
};

module.exports = config;
