const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/index.js', // your entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // output directory
    filename: 'bundle.js', // output filename
  },
  module: {
    rules: [
      // add rules for handling different file types (e.g., JavaScript, CSS, etc.)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // if you're using Babel
        },
      },
    ],
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
};