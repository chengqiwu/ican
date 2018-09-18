const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
      'redux',
      'rxjs',
      'openlayers',
      'gsap',
      'javascript-blowfish',
      'antd',
    ],
    output: {
        path: path.join(__dirname, '../dll'),
        filename: 'vendor.dll.js',
        library: 'vendor_[hash]'
    },
    // optimization: {
    //   minimizer: [
    //     new UglifyJsPlugin({
    //       cache: true,
    //       parallel: true,
    //       sourceMap: false // set to true if you want JS source maps
    //     }),
    //     // Compress extracted CSS. We are using this plugin so that possible
    //     // duplicated CSS from different components can be deduped.
    //     new OptimizeCSSAssetsPlugin({})
    //   ]
    // },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true,
          comparisons: false,
        },
        mangle: {
          safari10: true,
        },
        output: {
          comments: false,
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebookincubator/create-react-app/issues/2488
          ascii_only: true,
        },
      }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllPlugin({
            name: 'vendor_[hash]',
            path: path.join(__dirname, '../dll/manifest.json')
        })
    ]
}