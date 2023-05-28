const path = require('path');   
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { 
    before: './src/extension/before.js',
    after: './src/extension/after.js',
    background: './src/extension/background.js',
    execute: './src/extension/execute.js',
    inpage: './src/extension/inpage.js'
  }, 
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/ext')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: 'production',
  resolve: {
    alias: {
      'stream': require.resolve('stream-browserify'),
      'crypto': require.resolve('crypto-browserify'),
      'http': require.resolve('stream-http'),
      'https': require.resolve('https-browserify'),
      'os': require.resolve('os-browserify'),
      'buffer': require.resolve('buffer')
    },
    fallback: {
      "fs": false,
      "net": false,
      "tls": false,
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
    new webpack.DefinePlugin({ 
      'process.env.NODE_DEBUG': false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/extension/manifest.json', to: path.resolve(__dirname, 'dist') }
      ]
    })
  ],
};
