const path = require('path');

module.exports = {
  // Other webpack configuration options...

  resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      fs: false, // No fallback needed for fs, set to false
      http: require.resolve('stream-http'),
      net: false, // No fallback needed for net, set to false
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      url: require.resolve('url/'),
    },
  },

  // Other webpack configuration options...
};
