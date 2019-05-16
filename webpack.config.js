const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
require('dotenv').config({ path: '.env.all' });

module.exports = (env) => {
	const isProduction = env === 'production'
	return {
		entry: ['babel-polyfill', './src/app.js'],
		output: {
			path: path.resolve(__dirname, 'public', 'dist'),
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: '/node_modules/',
					use: 'babel-loader'
				},
				{
					test: /\.s?css$/,
					use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']
				}
			]
		},
		plugins: [
			new CaseSensitivePathsPlugin(),
			new MiniCssExtractPlugin({
				filename: 'style.css'
			}),
			new webpack.DefinePlugin({
				'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
				'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
				'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
				'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
				'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
				'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
				'process.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY),
				'process.env.WEATHER_API_KEY': JSON.stringify(process.env.WEATHER_API_KEY),
			})
		],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			publicPath: '/dist/',
			historyApiFallback: true
		}
	};
};
