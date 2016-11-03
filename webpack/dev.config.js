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
            { test: /\.(woff|woff2|ttf)$/, loader: 'url-loader?limit=100000' },
            { test: /\.es$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
        ]
    },

    aggregateTimeout: 100,

    resolve: {
        extensions: ['', '.', '.js', '.es'],
        // root: ['node_modules', 'src/client']
        modulesDirectories: ['node_modules', 'src/client']
    },

    plugins: [

        new Webpack.SourceMapDevToolPlugin({
            exclude: 'node_modules',
            columns: true,
        }),

        new Webpack.NoErrorsPlugin()
    ]
};