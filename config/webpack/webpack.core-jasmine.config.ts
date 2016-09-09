var path = require('path');
var fs = require('fs');

var nodeModules = fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    });

module.exports = {
    entry: [
        './test/T_Node.ts'
    ],
    target:'node',
    debug: true,
    output: {
        path: path.join(__dirname, '../../dist/test/node/'),
        filename: 'test.js'
    },
    node: {
        __dirname: true,
        __filename: true
    },
    devtool: 'eval',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    quiet: true,
    module: {
        loaders: [
            { test: /\.less$/, loader: 'noop-loader', exclude: /node_modules/},
            { test: /\.tsx?$/, loader: 'ts-loader!preprocess?+SERVER'}
        ]
    }
};