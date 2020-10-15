const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
   entry: path.resolve(__dirname, 'src', 'index.tsx'),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[hash].js',
      publicPath: '/',
      chunkFilename: '[name].[hash].js'
   },
   module: {
      rules: [
         {
            use: 'babel-loader',
            exclude: /node_modules/,
            test: /\.tsx?$/
         },
         {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
         },
         {
            test: /\.(png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: 'file-loader'
         }
      ]
   },
   devServer: {
      historyApiFallback: true,
      host: 'localhost',
      disableHostCheck: true
   },
   resolve: {
      extensions: ['.ts', '.tsx', '.js']
   },
   optimization: {
      splitChunks: {
         name: 'commons',
         chunks: 'all',
         minSize: 0,
         maxSize: 24400
      }
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'public', 'index.html'),
         filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
         filename: 'assets/[name].[hash].css',
         chunkFilename: '[name].css'
      })
   ]
}
