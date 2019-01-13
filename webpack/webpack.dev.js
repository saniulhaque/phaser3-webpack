const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const colors = require('colors/safe');
const portfinder = require('portfinder');
const common = require('./webpack.common.js');
const { url } = require('./../package.json');

portfinder.basePort = 4000;

// const smp = new SpeedMeasurePlugin(); // eslint-disable-line

portfinder.getPort((err, finalPort) => {
  if (err) {
    callback(err); // eslint-disable-line
  }
  const compiler = webpack(
    // smp.wrap(
    merge(common, {
      entry: {
        game: [
          // Live-reload
          `webpack-dev-server/client?http://localhost:${finalPort}`
        ]
      },
      output: {
        chunkFilename: 'chunk-[name]-[chunkhash].js'
      },
      devtool: 'source-map',
      mode: 'development',
      plugins: [
        new HardSourceWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              `Game is running here ${colors.bold(colors.blue(`http://localhost:${finalPort}`))}`
            ],
            notes: [
              `${colors.inverse(`Project url - ${url}`)}`,
              `phaser docs - ${colors.cyan('https://photonstorm.github.io/phaser3-docs/')}`,
              `phaser example - ${colors.rainbow('https://labs.phaser.io/')}`
            ]
          }
        })
      ]
    })
    // )
  );
  const server = new WebpackDevServer(compiler, {
    https: false,
    quiet: true,
    stats: {
      colors: true
    }
  });
  server.listen(finalPort, null, () => {
    // console.log(`Project is running at: ${colors.bold(colors.green('http://localhost:' + finalPort))}`);
  });
});
