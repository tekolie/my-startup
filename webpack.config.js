const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
    {
        entry: {
            vendor: ['react']
        },
        output: {
            path: PATHS.build,
            filename: '[name].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demos',
            })
        ]
    },
    parts.lintJavaScript({
        include: PATHS.app,
        exclude: /node_modules/
    }),
    parts.loadJavascript({
        include: PATHS.app
    })
]);

const prodConfig = merge([
    parts.extractCSS({ use: ['css-loader','sass-loader'] }),
    parts.loadImages({
        options: {
            name: './img/[name].[ext]'
        }
    })
]);

const devConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
    }),
    parts.loadCSS(),
    parts.loadImages()
]);

module.exports = (env) => {
  if(env == 'prod'){
    return merge(commonConfig, prodConfig);
  }

  return merge(commonConfig, devConfig);
};