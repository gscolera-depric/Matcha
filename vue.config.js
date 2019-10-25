const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../public'),
  productionSourceMap: false,
  devServer: { proxy: 'http://localhost:3000/' },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [ path.resolve(__dirname, './src/styles/variables.styl') ]
    },
  }
};