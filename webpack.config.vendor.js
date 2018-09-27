const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = false; //!(env && env.prod);
    const mode = process.env.NODE_ENV || 'development';

    return [{
        stats: { modules: false },
        resolve: { extensions: [ '.js' ] },
        mode,
        entry: {
            vendor: [
                'bootstrap',
                'bootstrap/dist/css/bootstrap.css',
                'event-source-polyfill',
                'isomorphic-fetch',
                'jquery',
            ],
        },
        module: {
            rules: [
                { test: /\.css(\?|$)/, use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					!isDevBuild ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]},
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        output: { 
            path: path.join(__dirname, 'wwwroot', 'dist'),
            publicPath: 'dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            }),
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            }),
        ].concat(isDevBuild ? [] : [
            new MiniCssExtractPlugin({ filename: 'vendor.css' }),
            new UglifyJsPlugin()
        ])
    }];
};
