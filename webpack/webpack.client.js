const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const portfinder = require('portfinder');
const colors = require('colors/safe');

portfinder.basePort = 2200;

const config = {
  entry: '.client/app/src/entry.js',
  output: {
    path: path.resolve(__dirname, './client/app/build'),
    publicPath: 'build/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  }
};

portfinder.getPort((err, finalPort) => {
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, {
    https: false,
    quiet: true,
    stats: {
      colors: true
    }
  });
  server.listen(finalPort, null, () => {
    console.log(
      `Project is running at: ${colors.bold(colors.green(`http://localhost:${finalPort}`))}`
    );
  });
});
