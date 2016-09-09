var Webpack = require('webpack');

module.exports = {
    entry: __dirname + '../src/client/',
    output: {
        path: __dirname + '../bundle/',
        pablicPath: '',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            { test: /\.es$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },

    resolve: {
        extentions: ['', '.', 'js', 'es'] 
    }
};