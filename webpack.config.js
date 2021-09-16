const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const DEV_MODE = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: './playground/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'output'),
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devServer: {
    hot: true,
    port: 9000,
  },

  module: {
    rules: [
      {
        test: /.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/typescript', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.tsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              '@babel/preset-react',
              '@babel/preset-env',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        DEV_MODE,
      },
    }),
  ],
};
