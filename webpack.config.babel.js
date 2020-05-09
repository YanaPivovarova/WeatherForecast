import webpack from 'webpack';
import path from 'path';
import glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import autoprefixer from 'autoprefixer';

const PROD_MODE = 'production';
const DEV_MODE = 'development';

const distPath = './dist';

const pathsConfig = {
    src: path.join(__dirname, 'src'),
    jsEntry: path.join(__dirname, 'src', 'js'),
    assets: path.join(__dirname, 'src', 'assets'),
    dist: path.resolve(distPath),
    templatesPath: path.join(__dirname, 'src', 'templates')
};

module.exports = env => {
    var ENV_MODE = {
        PROD: env.mode === PROD_MODE,
        DEV: env.mode === DEV_MODE,
    };

    return {
        mode: env.mode,
        entry: path.join(pathsConfig.jsEntry, 'app.js'),
        output: {
            filename: '[name].js',
            path: pathsConfig.dist
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    },
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        "css-loader?url=false",
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer()
                                ],
                                sourceMap: true
                            }
                        },
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(hbs)$/,
                    loader: "handlebars-loader",
                    options: { helperDirs: path.resolve(pathsConfig.jsEntry, "helpers") }
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html')
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
                ignoreOrder: false,
            }),
            new CopyWebpackPlugin([
                {
                    from: path.join(pathsConfig.assets, 'images'),
                    to: path.join(pathsConfig.dist, 'images')
                }
            ]),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                'window.$': 'jquery',
            })
        ],
        devServer: {
            contentBase: path.resolve(__dirname),
            port: 8081,
            open: true,
            watchContentBase: true
        },
        devtool: ENV_MODE.DEV ? 'source-map' : false
    };
};