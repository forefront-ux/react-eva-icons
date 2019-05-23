const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log(path.join(__dirname, 'package/src/index.js'));

module.exports = {
  entry: {
    eva: path.join(__dirname, 'package/src/index.js'),
    'eva.min': path.join(__dirname, 'package/src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'package-build'),
    library: 'eva',
    libraryTarget: 'umd',
    filename: '[name].js',
    umdNamedDefine: true,
    globalObject: 'typeof self !== "undefined" ? self : this',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../',
                    hmr: process.env.NODE_ENV === 'development'
                },
            },
            "css-loader",
            "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        })
    ]
};
