const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const os = require('os');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const colors = require('colors/safe');
const portfinder = require('portfinder');
const common = require('./webpack.common.js');
const { url } = require('./../package.json');
const config = require('./../configs/config.dev');

const interfaces = os.networkInterfaces();
const addresses = [];
/* eslint-disable */
for (const k in interfaces) {
  for (const k2 in interfaces[k]) {
    const address = interfaces[k][k2];
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address);
    }
  }
}
/* eslint-enable */

portfinder.basePort = 4000;

// const smp = new SpeedMeasurePlugin(); // eslint-disable-line

function getPlugins(finalPort) {
  const plugins = [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `Game is running here ${colors.bold(colors.blue(`http://localhost:${finalPort}`))}`,
          `Local Network address ${colors.bold(colors.blue(`http://${addresses[0]}:${finalPort}`))}`
        ],
        notes: [
          `${colors.inverse(`Project url - ${url}`)}`,
          `phaser docs - ${colors.cyan('https://photonstorm.github.io/phaser3-docs/')}`,
          `phaser example - ${colors.rainbow('https://labs.phaser.io/')}`
        ]
      }
    })
  ];

  if (config.cache) {
    plugins.push(new HardSourceWebpackPlugin());
  }

  return plugins;
}

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
      plugins: getPlugins(finalPort)
    })
    // )
  );
  const server = new WebpackDevServer(compiler, {
    host: '0.0.0.0',
    disableHostCheck: true,
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
