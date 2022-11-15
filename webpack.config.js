const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractplugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/js/startpage.js',
    output: {
        filename: 'static/js/[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractplugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                type: 'asset/resource', // asset 为自动选择，小于8k，inline，否则为resource
                // parser: {
                //     dataUrlCondition: {
                //         maxSize: 10 * 1024,
                //     },
                // },
                generator: {
                    filename: 'static/imgs/[hash:8][ext][query]',
                },
            },
            {
                test: /\.(ttf|woff2?|mp3|mp4|avi)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/media/[hash:8][ext][query]',
                },
            },
            // {
            //     test: /\.js$/i,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader',
            // },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
        new MiniCssExtractplugin({
            filename: 'static/css/startpage.[contenthash:8].css',
        }),
        new CssMinimizerPlugin(),
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        open: true,
    },
};
