const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry:[ './src/canvas-nest.min.js'],
    output: {
        path: path.join(__dirname, '../dll'),
        filename: 'vendor.dll.js',
        library: 'vendor_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'vendor_[hash]',
            path: path.join(__dirname, '../dll/manifest.json')
        })
    ]
}