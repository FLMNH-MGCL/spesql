module.exports = (config) => {
  config.module.rules.find((rule) => {
    if (rule && rule.test && rule.test.test(".css")) {
      rule.use = ["style-loader", "postcss-loader"];
    }

    // if (rule && rule.test && rule.test.test(".png")) {
    //   rule.use = ["file-loader"];
    // }
  });

  // Remove browser aliases so that we always get node.js versions of modules:
  config.resolve.aliasFields = [];

  config.externals = ["react", "react-dom"];

  config.devServer.proxy = {
    "/": "http://localhost:5000",
  };

  return config;
};
