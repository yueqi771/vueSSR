const path = require('path')
const webpack = require('webpack');
const createVueLoaderOptions = require('./vue-loader.config');
const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, '../client/client-entry.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../public'),
        publicPath: 'http://127.0.0.1:8000/public/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'resources/[path][name].[hash:8].[ext]'
                    }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
    ]
}

module.exports = config
