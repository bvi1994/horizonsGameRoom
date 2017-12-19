const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        index: './frontend/index',
        slapjack: './frontend/slapjack',
        ready: './frontend/ready',
        plusMinus: './frontend/plusMinus',
        triangle: './frontend/triangle'
    },
    module: {
        rules: [
            { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' },
        ],
    },
    resolve: {
        extensions: ['.js', '.scss']
    },
    output: {
        path: path.join(__dirname, '/public'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './public',
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
