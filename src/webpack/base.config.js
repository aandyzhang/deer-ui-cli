import Webpack from 'webpack';
import WebpackBar from 'webpackbar';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolveApp } from '../util';

const config = require(resolveApp('package.json'));

export const baseConfig = {
    stats: "errors-only",
    output: {
        publicPath: './',//相对路径
    },
    resolve: {
        extensions: [".js", ".jsx",'.less','.css'],
        alias: {
            '@': resolveApp('src'),
        },
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "cache-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                    }
                ]
            },
              {
                test: /\.less$/,
                use: [
                 MiniCssExtractPlugin.loader,
                  "cache-loader",
                  {
                    loader: "css-loader",
                    options: {
                      importLoaders: 3,
                    }
                  },
                  {
                    loader: "postcss-loader",
                    options: { sourceMap: false }
                  },
                  {
                    loader: "less-loader",
                    options: {
                      sourceMap: false
                    }
                  }]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: "/node_modules/",
                    use: [
                      {
                        loader: "babel-loader?cacheDirectory"
                      }
                    ],
                    exclude: [/node_modules/],
                    // include: [resolveApp("components")]
                  },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                loader: 'url-loader',
                include: [resolveApp("components")],
                options: {
                    limit: 3000,
                    name: 'img/[name].[ext]',
                    esModule: false// 否则加载时为 [object]
                }
            },
            {
                test: /\.svg$/,
                loader: 'raw-loader',
                include: [resolveApp("components")],
                options: {
                    esModule: false// 否则加载时为 [object]
                }
            }
        ]
    },
    plugins: [
        new Webpack.BannerPlugin({
            banner: `deer-ui-cli v${config.version} - [filebase], [hash], ${new Date()}`
        }),
        new WebpackBar({
            name: 'Deer-ui ClI',
            color: '#5396ff'
        }),
    ]
};