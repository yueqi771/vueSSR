// webpack-merge webpack 扩展文件
const path = require('path');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

// vue服务端渲染核心
const VueServerPlugin = require('vue-server-renderer/server-plugin');


const isDev = process.env.NODE_ENV === 'development'

let config;


config = merge(baseConfig, {
    target: 'node', // 必须指定打包的目标为node层
    entry: path.join(__dirname, '../client/server-entry.js'),

    // 开发环境调试代码
    devtool: 'source-map', 

    output: {
        libraryTarget: 'commonjs2', // 指定打包出去的类型module.exports
        filename: 'server-entry.js',
        path: path.join(__dirname, '../server-build')
    },

    // 
    externals: Object.keys(require('../package.json').dependencies),

    module: {
        rules: [
            {
                test: /\.styl/,
                use:ExtractPlugin.extract({
                    fallback : 'vue-style-loader',
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
            }
        ]
    },

    plugins: [
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': "server"
        }),
        new VueServerPlugin()
    ]
})

    

module.exports = config

