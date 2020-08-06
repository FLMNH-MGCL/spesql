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

  require("./routes/list-tables.routes")(connection, app);
  require("./routes/select.routes")(connection, app);
  require("./routes/update.routes")(connection, app);
  require("./routes/select-count.routes")(connection, app);
  require("./routes/insert.routes")(connection, app);
  require("./routes/delete.routes")(connection, app);
  require("./routes/login.routes")(connection, app);
  require("./routes/fetch-users.routes")(connection, app);
  require("./routes/generate-pass.routes")(app);
  require("./routes/get-user.routes")(connection, app);

  // ADMIN ROUTES
  require("./routes/create-user.routes")(connection, app);
  require("./routes/update-user.routes")(connection, app);
  require("./routes/create-table.routes")(connection, app);
  require("./routes/delete-table.routes")(connection, app);
  require("./routes/register-table.routes")(connection, app);
  require("./routes/reregister-table.routes")(connection, app);
  require("./routes/unregister-table.routes")(connection, app);
  require("./routes/delete-user.routes")(connection, app);
  require("./routes/list-tables-admin.routes")(connection, app);
  require("./routes/alter-table-routes")(connection, app);

  app.listen(port, () => console.log(`Server now running on port ${port}!`));
}

main();

// https://stackoverflow.com/questions/18087696/express-framework-app-post-and-app-get

// https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357

// https://stackoverflow.com/questions/35836582/nodejs-check-to-see-if-client-is-still-connected

// https://stackoverflow.com/questions/40141332/node-js-mysql-error-handling
