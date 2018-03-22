// webpack-merge webpack 扩展文件
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

let config;

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),

    new HTMLPlugin(),

    new VueClientPlugin(),
]

// 开发环境服务器
const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true,
    },
    hot: true
}


if (isDev) {
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',

        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },

        devServer,

        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })

    
} else {
    // 正式环境配置
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },

        output: {
            filename: '[name].[chunkhash:8].js'
        },

        module: {
            rules: [
                {
                    test: /\.style/,
                    use: ExtractPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                    })
                },
            ]
        },

        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    })


}

module.exports = config

