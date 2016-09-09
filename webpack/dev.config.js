var Webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.join(__dirname, '../src/client/index.es'),

    output: {
        path: path.join(__dirname, '../bundle/'),
        pablicPath: '',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            { test: /\.es$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },

    resolve: {
        extensions: ['', '.', '.js', '.es'],
        root: ['node_modules', 'src/client']
    }
};