const express = require("express");
const mysql = require("mysql");
const homedir = require("os").homedir();
const path = require("path");
const fs = require("fs");
const configPath = path.join(homedir, ".spesql", "config.json");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const app = express();
app.use(jsonParser);

const port = process.env.PORT || 5000;

async function bootstrap(mysqlCredentials) {
  console.log(mysqlCredentials);
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

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

  // app.get("/", (req, res) => {
  //   res.send("Hello World!");
  // });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

fs.readFile(configPath, (err, data) => {
  if (err) {
    bootstrap(null);
  } else {
    bootstrap(JSON.parse(data));
  }
});
