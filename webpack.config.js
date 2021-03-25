const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglify-js-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 7000
    },
    resolve: {
        extensions: ['.js', 'jsx'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html')
    }),
    new UglifyJsPlugin({
        test: /\.js$/,
        exclude: /node_modules/,
        sourceMap: true,
        uglifyOptions: {
            compress: {},
            mangle: true,
        }
    })],
};