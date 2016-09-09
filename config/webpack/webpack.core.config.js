var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: [
        './src/A_Server.ts'
    ],
    target:'node',
    debug: true,
    output: {
        path: path.join(__dirname, '../../dist/node/'),
        filename: 'server.js'
    },
    node: {
        __dirname: true,
        __filename: true
    },
    externals:nodeModules,

    devtool: 'source-map',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    recordsPath: path.join(__dirname, '../../dist/node/_records'),

    stats: {
        colors: true,
        hash: false,
        version: true,
        timings: true,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: false,
        publicPath: false
    },

    module: {
        loaders: [
            { test: /\.less$/, loader: 'noop-loader', exclude: /node_modules/},
            {
                include:[
                    path.resolve(__dirname, "../../node_modules/fabalous-core"),
                    path.resolve(__dirname, "../../src")
                ],
                test: /\.tsx?$/,
                loader: 'babel!awesome-typescript-loader'
            }
        ]
    },

    plugins:[
        new webpack.NormalModuleReplacementPlugin(/\.(gif|png|less|css)$/, 'node-noop'),
        new ForkCheckerPlugin(),
        new webpack.DefinePlugin({
            CLIENT: false,
            SERVER: true,
            TEST:false
        })
    ]
};