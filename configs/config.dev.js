module.exports = {
  cache: false,
  spritesmeeth: false, // control spritesmeeth respinsible for creating spritesheet.
  // add to array and create new folder in './assets' by the same name to create new spritesheet
  spritesheetFolders: ['test'],
  // copy them to ./src/assets
  autoImportFolders: [],
  // control imagemin respinsible for optimizing images.
  imageMin: true,
  imageMinQuality: {
    // Select an optimization level between 0 and 7 || Default: 3
    png: 3,
    // Select an optimization level between 1 and 3 || Default: 1
    gif: 1,
    // for jpeg you have option either 'progressive' or 'arithmetic'
    jpeg: 'arithmetic',
    // pass config for svg. see full options list https://github.com/svg/svgo#what-it-can-do
    svg: {
      //
    },
    pngquant: {
      // Min and max are numbers in range 0(worst) to 100(perfect)
      quality: '95-100'
    }
  },
  // beware expensive runtime
  logo: {
    make: false, // turn auto genrate icon off/on
    logo: './src/assets/logo.png',
    // background: '#fff',
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: false,
      favicons: true,
      firefox: true,
      opengraph: false,
      twitter: false,
      yandex: false,
      windows: false
    }
  },
  plugins: {
    build: true,
    sample: {
      name: 'sample',
      version: '0.0.0'
    }
  },
  includeCustomPhaser: false,
  customPhaserBuild: {
    name: 'D:\\absolute_path\\to\\custom\\phaser\\build.js',
    anothername: 'D:\\anotehr_absolute\\path\\to\\custom\\phaser\\build.js'
  },
  zip: true,
  zipExtName: 'zip'
};
