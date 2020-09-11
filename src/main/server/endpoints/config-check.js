const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();
// `homedir()` returns absolute path so we use `join` here

const CONFIG_DIR = ".spesql";

module.exports = function (app) {
  app.post("/api/config-check", function (req, res) {
    // check to see if node may access directory
    fs.access(path.join(homedir, CONFIG_DIR), (err) => {
      // if access failed AND the directory does not exist
      if (err && err.code === "ENOENT") {
        // attempt to make dir
        fs.mkdir(path.join(homedir, CONFIG_DIR), (err) => {
          if (err) {
            res.status(400); // fix me
            res.send("Could not create config directory");
            return;
          } else {
            res.status(400); // fix me
            res.send("Created config directory");
            return;
          }
        });
      }

      // access to directory passed
      else {
        fs.readFile(
          // path.join(__dirname, "..", "config", "config.json"),
          path.join(homedir, CONFIG_DIR, "config.json"),
          (err, data) => {
            if (err) {
              res.status(400);
              res.send("Could not retrieve file");
            } else {
              res.send(data);
            }
          }
        );
      }
    });
  });
};
