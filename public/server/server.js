const express = require("./config/express.js");
const mysql = require("mysql");
const config = require("./config/config.js");

const port = process.env.PORT || 5000;
const mysqlCredentials = config.mysqlCredentials;

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
  } else {
    console.log("Connected to MySQL Server");
  }
});

const app = express.init();
require("./routes/list-tables.routes")(connection, app);
require("./routes/fetch.routes")(connection, app);
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
require("./routes/delete-user.routes")(connection, app);
require("./routes/list-tables-admin.routes")(connection, app);
// require("./routes/shutdown.routes")(connection, app);

var server = app.listen(port, () =>
  console.log(`Server now running on port ${port}!`)
);

// module.exports = function killserver() {
//   server.close()
// }

// https://stackoverflow.com/questions/18087696/express-framework-app-post-and-app-get

// https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357

// https://stackoverflow.com/questions/35836582/nodejs-check-to-see-if-client-is-still-connected

// https://stackoverflow.com/questions/40141332/node-js-mysql-error-handling
