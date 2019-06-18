const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// process.traceDeprecation = true;

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const bundleOutputDir = './wwwroot/dist';
    const mode = process.env.NODE_ENV || 'development';

    return [{
        mode,
        devtool: isDevBuild ? 'source-map' : false,
        stats: { modules: false },
        context: __dirname,
        resolve: { extensions: [ '.js', '.mjs', '.ts' ] },
        entry: { 'main': './ClientApp/boot.ts' },
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto'
                },
                { test: /\.svelte$/, include: /ClientApp/, 
                    use: { 
                        loader: 'svelte-loader', 
                        options: { 
                            dev: isDevBuild,
                            emitCss: true, 
                        },
                    } 
                },
                { test: /\.ts$/, include: /ClientApp/, use: 'ts-loader' },
                { test: /\.css$/, use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					isDevBuild ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader'
				]},
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: '/dist/'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
        ] : [
            new MiniCssExtractPlugin({ filename: 'site.css' }),
            new UglifyJSPlugin({sourceMap: true}),
        ])
    }];
};
