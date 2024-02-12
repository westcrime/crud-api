const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
  }
};