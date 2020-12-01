const path = require('path')
const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin')
const ServiceWorkerWepbackPlugin = require('serviceworker-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = () => {
   return {
      entry: './app/index.js',
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
      mode: "production",
      plugins: [
         new htmlPlugin({
            template: 'app/index.html'
         }),
         new webpack.DefinePlugin({
            'process': JSON.stringify({ env: { NODE_ENV: "production" }, version: require("./package.json").version })
         }),
         new ServiceWorkerWepbackPlugin({
            entry: path.join(__dirname, 'app/sw.js'),
          }),
         new BundleAnalyzerPlugin()
      ],
      optimization: {
         sideEffects:false,
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