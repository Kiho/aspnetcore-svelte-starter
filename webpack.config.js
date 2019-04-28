const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// process.traceDeprecation = true;
const ignoreTheseWarnings = [
    'a11y-invalid-attribute',
];

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const bundleOutputDir = './wwwroot/dist';
    const mode = process.env.NODE_ENV || 'development';

    return [{
        mode,
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
                { test: /\.html$/, include: /ClientApp/, 
                        use: { loader: 'svelte-loader', options: { dev: isDevBuild,
                            // onwarn: (warning, defaultHandler) => {
                            //     if (ignoreTheseWarnings.indexOf(warning.code) > -1) return;
                            //     console.log('warning : - ', warning);
                            //     defaultHandler(warning);
                            // },  
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
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            new MiniCssExtractPlugin({ filename: 'site.css' }),
            new UglifyJSPlugin({sourceMap: true}),
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ])
    }];
};
