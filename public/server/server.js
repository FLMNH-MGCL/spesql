const express = require("./config/express.js");
const mysql = require("mysql");
const config = require("./config/config.js");

async function main() {
  const port = process.env.PORT || 5000;
  const mysqlCredentials = config.mysqlCredentials;

  const app = express.init();

  let connection = mysql.createConnection({
    host: mysqlCredentials.host,
    port: mysqlCredentials.port,
    user: mysqlCredentials.user,
    password: mysqlCredentials.password,
    database: mysqlCredentials.database,
  });

  connection.connect((err) => {
    if (err) {
      console.log(err);
      // somehow I want to redirect to 404 screen here
    } else {
      console.log("Connected to MySQL Server");
    }
  });

  require("./routes/list-tables")(connection, app);
  require("./routes/select")(connection, app);
  require("./routes/update")(connection, app);
  require("./routes/select-count")(connection, app);
  require("./routes/insert")(connection, app);
  require("./routes/delete")(connection, app);
  require("./routes/login")(connection, app);
  require("./routes/fetch-users")(connection, app);
  require("./routes/generate-pass")(app);
  require("./routes/get-user")(connection, app);

  // ADMIN ROUTES
  require("./routes/create-user")(connection, app);
  require("./routes/update-user")(connection, app);
  require("./routes/create-table")(connection, app);
  require("./routes/delete-table")(connection, app);
  require("./routes/register-table")(connection, app);
  require("./routes/reregister-table")(connection, app);
  require("./routes/unregister-table")(connection, app);
  require("./routes/delete-user")(connection, app);
  require("./routes/list-tables-admin")(connection, app);
  require("./routes/alter-table-routes")(connection, app);

  app.listen(port, () => console.log(`Server now running on port ${port}!`));
}

main();

// https://stackoverflow.com/questions/18087696/express-framework-app-post-and-app-get

// https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357

// https://stackoverflow.com/questions/35836582/nodejs-check-to-see-if-client-is-still-connected

// https://stackoverflow.com/questions/40141332/node-js-mysql-error-handling
