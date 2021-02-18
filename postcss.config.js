module.exports = {
    plugins: {
      'postcss-import': {
          path: ['/src/css']
      },
      'postcss-preset-env': {},
      'cssnano': {}
    }
  }