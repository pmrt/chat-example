module.exports = {
  entry: './app/public/routes/index.jsx',
  output: {
    path: './app/public/js',
    filename: 'main.bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'cheap-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}

