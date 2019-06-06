const path = require('path'), 
        webpack = require('webpack'),
        TerserPlugin = require('terser-webpack-plugin'), // minim
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
        extractWebpackPlugin = require('extract-text-webpack-plugin'),
        CopyWebpackPlugin= require('copy-webpack-plugin'),
        autoprefixer = require('autoprefixer'),
        MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prod = process.env.NODE_ENV === 'development';

const config = {
    mode: 'development', //"webpack-dev-server/client","webpack/hot/dev-server",
    entry: ['./src/index.js'],
    output : {
        path: path.resolve(__dirname, 'build'),
        filename: './js/bundle.js'
    },
    devtool: 'source-map',
    watch: true,
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: false,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
            }),
        ],
    },
    module: {
        rules: [
            {  /* собирает цсс */
                test: /\.scss$/,
                use: extractWebpackPlugin.extract({
                    fallback: 'style-loader', // inline if fail
                    // use: 'css-loader', // our use css

                    use: [
                            { loader:'css-loader',
                                options: {
                                url: false
                              }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: [
                                        autoprefixer({
                                            browsers:['ie >= 11', 'last 2 version']
                                        })
                                    ]
                                }
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    fiber: require('fibers'),
                                }
                            }
                        ]
                })
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                exclude: /node_modules/,
                use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env',{
                                    targets: {
                                        browsers: ["last 2 versions", "ie >= 11"]
                                    }
                                }]]
                            }
                        }
                ]
            },
            {
                test: /\.(gif|png|jpeg|svg|jpg|ico)$/,
                use: [
                        {
                        loader: 'file-loader',
                        options: {
                            name:'[name].[ext]',
                            outputPath: 'images/',
                            useRelativePath: true,
                        }
                        },
                        {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                        }
                        },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                    name: '[name].[ext]',
                    outputPath: 'font/'
                    }
                }
            },
            {
                test: /\.html$/,
                    use: {
                            loader: 'html-loader',
                                options: {
                                    attrs: [':data-src']
                                }
                        }
            }
        ]
    },


    plugins: []
};


if (!prod) {

      // dev plugins
    config.plugins = config.plugins.concat([

        new CopyWebpackPlugin([{
            from: './src/js/lib/',
            to: './js/lib'
        }]),

        new CopyWebpackPlugin([{
            from: './src/fonts/',
            to: './fonts'
        }]),
        new CopyWebpackPlugin([{
            from: './src/style/lib/',
            to: './style/lib'
        }]),

        new CopyWebpackPlugin([{
            from: './src/audio/',
            to: './audio'
        }]),

        new HtmlWebpackPlugin({hash: true,filename:'./index.html',template: 'src/index.html'}),
        new extractWebpackPlugin({filename: './style/main.css', disable: false, allChunks: true}), // main css
        new webpack.DefinePlugin({
            'processs.env.NODE_ENV': '"production"' // compiller if production
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
            preset: ['default'],
            },
            canPrint: true
        }),
    ]);
    new webpack.HotModuleReplacementPlugin();

} else {
    // production plugins
}

module.exports = config;
