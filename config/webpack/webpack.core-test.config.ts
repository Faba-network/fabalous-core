var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var glob = require("glob");
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var nodeModules = fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    });

module.exports = {
    entry: glob.sync("./**/*Spec.ts"),

    target:'node',
    debug: true,
    output: {
        path: path.join(__dirname, '../../dist/test/node/'),
        filename: 'test.js'
    },
    recordsPath: path.join(__dirname, '../../dist/test/_records'),

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
            {
                include:[
                    path.resolve(__dirname, "../../node_modules/fabalous-core"),
                    path.resolve(__dirname, "../../src")
                ],
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins:[
        new ForkCheckerPlugin(),
        new webpack.NormalModuleReplacementPlugin(/\.(gif|png|less|css)$/, 'node-noop'),
        new webpack.DefinePlugin({
            CLIENT: false,
            SERVER:true,
            TEST:true
        })
    ]
};