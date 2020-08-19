import express from "express";
import config from "../../configs/config.project";
const bodyParser = require("body-parser");
const homedir = require("os").homedir();
const path = require("path");
const mysql = require("mysql");
const fs = require("fs");
const configPath = path.join(homedir, ".spesql", "config.json");
const CONFIG_DIR = ".spesql";
const regeneratorRuntime = require("regenerator-runtime");

async function init() {
  // await fs.access(path.join(homedir, CONFIG_DIR), (err) => {
  //   // if access failed AND the directory does not exist
  //   if (err && err.code === "ENOENT") {
  //     // attempt to make dir
  //     fs.mkdir(path.join(homedir, CONFIG_DIR), (err) => {
  //       if (err) {
  //         console.log("Could not create config directory");
  //       }
  //     });
  //   }
  // });

  return null;
}

async function main(mysqlCredentials) {
  // await init();

  console.log(mysqlCredentials);

  const app = express();

  app.use(bodyParser.json());

  require("./endpoints/config-check")(app);
  require("./endpoints/config-update")(app);
  require("./endpoints/config-create")(app);

  let connection = null;

  if (mysqlCredentials) {
    connection = mysql.createPool({
      host: mysqlCredentials.host,
      port: mysqlCredentials.port,
      user: mysqlCredentials.user,
      password: mysqlCredentials.password,
      database: mysqlCredentials.database,
      connectTimeout: 10000,
    });

    connection.getConnection(function (err, connection) {
      // connected! (unless `err` is set)
      if (connection) {
        console.log("Connected to MySQL Server");
      } else if (err) {
        console.log(err);
      }
    });
  }

  // } catch {
  //   console.log(
  //     "MySQL Connection failed: config file likely missing",
  //     configPath
  //   );
  // }

  require("./endpoints/list-tables")(connection, app);
  require("./endpoints/select")(connection, app);
  require("./endpoints/update")(connection, app);
  require("./endpoints/select-count")(connection, app);
  require("./endpoints/insert")(connection, app);
  require("./endpoints/delete")(connection, app);
  require("./endpoints/login")(connection, app);
  require("./endpoints/fetch-users")(connection, app);
  require("./endpoints/generate-pass")(app);
  require("./endpoints/get-user")(connection, app);

  // ADMIN ROUTES
  require("./endpoints/create-user")(connection, app);
  require("./endpoints/update-user")(connection, app);
  require("./endpoints/create-table")(connection, app);
  require("./endpoints/delete-table")(connection, app);
  require("./endpoints/register-table")(connection, app);
  require("./endpoints/reregister-table")(connection, app);
  require("./endpoints/unregister-table")(connection, app);
  require("./endpoints/delete-user")(connection, app);
  require("./endpoints/list-tables-admin")(connection, app);
  require("./endpoints/alter-table-routes")(connection, app);

  const DIST_DIR = __dirname;
  const HTML_FILE = path.join(DIST_DIR, "index.html");

  if (process.env.NODE_ENV === "development") {
    const webpack = require("webpack");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const webpack_config = require("../../configs/webpack.config.dev");

    const compiler = webpack(webpack_config);
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: webpack_config.output.publicPath,
      })
    );
    app.use(webpackHotMiddleware(compiler));
    app.get("*", (req, res, next) => {
      compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
        if (err) {
          return next(err);
        }
        res.set("content-type", "text/html");
        res.send(result);
        res.end();
      });
    });
  } else if (process.env.NODE_ENV === "production") {
    app.use(express.static(DIST_DIR));

    app.get("*", (req, res) => {
      res.sendFile(HTML_FILE);
    });
  }

  app.listen(config.server.port, () => {
    console.log(`Listening on ${config.server.port}`);
  });
}

fs.readFile(configPath, (err, data) => {
  if (err) {
    main(null);
  } else {
    main(JSON.parse(data));
  }
});
