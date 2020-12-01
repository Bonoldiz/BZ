const path = require('path')
const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin')
const copyPlugin = require('copy-webpack-plugin');
const ServiceWorkerWepbackPlugin = require('serviceworker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = () => {
   return {
      entry: ['@babel/polyfill','./app/index.js'],
      output: {
         path: path.resolve(__dirname, 'dist'),
         filename: '[name].bundle.js',
         chunkFilename: '[name].bundle.js',
         publicPath: '/'
      },
      devServer: {
         historyApiFallback: true,
         writeToDisk: true
      },
      module: {
         rules: [
            { test: /\.html$/, use: "raw-loader" },
            { test: /\.(js)|.(jsx)$/, use: ['babel-loader', 'eslint-loader'] },
            { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {
               test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
               use: [{
                  loader: 'file-loader',
                  options: {
                     outputPath: './assets/fonts'
                  }
               }]
            },
            {
               test: /\.(svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
               use: [{
                  loader: 'file-loader',
                  options: {
                     outputPath: './assets'
                  }
               }]
            }, {
               test: /\.webmanifest$/,
               use: {
                  loader: 'file-loader',
                  options: {
                     name: '[name].json'
                  }
               }
            }
         ]
      },
      mode: "development",
      plugins: [
         new htmlPlugin({
            template: 'app/index.html'
         }),
         new webpack.DefinePlugin({
            'process': JSON.stringify({ env: { NODE_ENV: "development" }, version: require("./package.json").version, API: require("./package.json").API.toString() }),

         }),
         new copyPlugin({
            patterns: [
               { from: './app/src/test/fakeData/*.json', to: './resources/[name].[ext]'},
            ],
         }
         ),
         new ServiceWorkerWepbackPlugin({
            entry: path.join(__dirname, 'app/sw.js'),
         }),
         new BundleAnalyzerPlugin()
      ],
      optimization: {

         splitChunks: {
            cacheGroups: {
               vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  name(module, chunks, cacheGroupKey) {
                     return `vendors`;
                  },
                  chunks: 'all'
               }
            }
         }
      }
   }
}