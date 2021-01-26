const webpack = require('webpack');

module.exports = (config) => {
  config.module.rules.find((rule) => {
    if (rule && rule.test && rule.test.test('.css')) {
      rule.use = [
        'style-loader',

        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        'postcss-loader',
      ];
    }

    if (
      rule &&
      rule.test &&
      (rule.test.test('.png') || rule.test.test('.gif'))
    ) {
      rule.use = ['file-loader'];
    }
  });

  // Remove browser aliases so that we always get node.js versions of modules:
  config.resolve.aliasFields = [];

  config.externals = ['react', 'react-dom', 'react-hook-form'];

  config.plugins = [
    ...config.plugins,
    new webpack.DefinePlugin({
      PUBLIC_URL: JSON.stringify('http://localhost:5000'),
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
    }),
  ];

  if (process.env.NODE_ENV === 'development') {
    config.devServer.proxy = {
      '/': 'http://localhost:5000',
    };

    config.devServer.port = process.env.ELECTRON_WEBPACK_APP_FRONTEND_PORT;
  }

  return config;
};
