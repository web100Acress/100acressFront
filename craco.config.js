// craco.config.js
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.push(
        new WebpackObfuscator(
          {
            rotateStringArray: true,
          },
          []
        )
      );
      return webpackConfig;
    },
  },
};
