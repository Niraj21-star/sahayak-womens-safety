const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Optimize the Metro bundler
config.maxWorkers = 2;
config.transformer.minifierConfig = {
  compress: {
    drop_console: true,
  },
};

module.exports = config; 