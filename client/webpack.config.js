const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename:   './js/index_bundle.js',
        publicPath: '/',  
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'postcss-loader', options: {sourceMap: true} },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
            },
        ]
    },
    mode: 'development',
    devServer: {
        historyApiFallback: {
            index:'/index.html'
        }
	},
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "./css/style.css"
        }),
        new CopyWebpackPlugin([{from: './src/assets/', to: 'assets'}])
    ]
}