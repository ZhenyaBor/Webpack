const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    context:path.resolve(__dirname,'src'),
    mode:'development',
  entry: {
    main: ['@babel/polyfill','./index.js',]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve:{
    extensions:['.js','.json' ],
    alias:{
        '@models':path.resolve(__dirname,'src/models'),
        '@':path.resolve(__dirname,'src')
    }
  },
  devServer:{
    port:4200
  },
  plugins: [
    new HTMLWebpackPlugin({
        template:'./index.html'
    }),
    new CleanWebpackPlugin( ),
    new MiniCssExtractPlugin({
        filename:"bundle.css"
    })
  ],
  module:{
    rules:[
        {
            test: /\.css$/,
            use:[ {
                loader: MiniCssExtractPlugin.loader,
                options: {},
            },"css-loader"
            ]
        },
        {
            test: /\.(png|jpg|svg|gif)$/,
            use:['file-loader']
        },
        {
            test: /\.(ttf|woff|woff2|eot)$/,
            use:['file-loader']
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env'] 
              }
            }
          }
    ]
  }
};