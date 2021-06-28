import Webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { baseConfig } from './base.config';
import { isDev,resolveApp } from '../util';

export const devConfig = merge(baseConfig, {
    mode: 'development',
    entry: {
        'deer_ui_dev_start':resolveApp('example/src/index.js'),
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                chunks: {
                    chunks: 'all',
                    minChunks: 2,
                    minSize: 0,
                    name: 'common_chunks'
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDev() ? '[name].css' : 'css/[name].[hash].min.css'
        }),
        new HtmlWebpackPlugin({
            template: resolveApp('example/src/index.html'),
            filename: 'index.html',
            hash: true,
            inject: true,
            chunks: ['common_chunks','deer_ui_dev_start'],
            minify: {
                minifyJS: true,
                minifyCSS: true,
                removeAttributeQuotes: true//压缩 去掉引号
            }
        }),
        // new HtmlWebpackPlugin({
        //     template: ROOT_CLI_PATH('site/demo/index.html'),
        //     filename: 'demo.html',
        //     hash: true,//防止缓存
        //     inject: true,
        //     chunks: ['common_chunks', 'nutui-mobile'],
        //     minify: {
        //         minifyJS: true,
        //         minifyCSS: true,
        //         removeAttributeQuotes: true//压缩 去掉引号
        //     }
        // }),
        new Webpack.HotModuleReplacementPlugin()
    ]
});