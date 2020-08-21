const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();
const CONFIG_DIR = ".spesql";

module.exports = function (app) {
  app.post("/api/update-config", function (req, res) {
    const { newConfig } = req.body;
    const configPath = path.join(homedir, CONFIG_DIR, "config.json");

    if (!newConfig) {
      res.status(401).send("Missing config content");
      return;
    }

    fs.writeFile(
      configPath,
      JSON.stringify(newConfig, null, 2),
      (err, data) => {
        if (err) {
          res.status(500);
          res.send("Could not load config file");
        } else {
          console.log(data);
          res.send(data);
        }
      }
    );
  });
};
