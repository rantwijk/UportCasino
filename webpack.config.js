const path = require('path');

module.exports = {
  entry: './server.js',
  output: {
    filename: 'casino.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'casino',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
