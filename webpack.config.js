
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let Path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: {
        app: './entries/entry.js'
    },
   output: {
       path: Path.join(__dirname, 'public'),
        filename: "[name].js"
    },
    //watch: true,

    module: {
        loaders: [
            {
                test: /\.jade$/,
                loader: "jade-loader"
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract("css-loader!stylus-loader")
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('css/[name].css')

    ]
};
