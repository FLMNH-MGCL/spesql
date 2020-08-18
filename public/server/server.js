const express = require("./config/express.js");
const mysql = require("mysql");
const config = require("./config/config.js");
const fs = require("fs");

async function main() {
  const port = process.env.PORT || 5000;
  // const mysqlCredentials = config.mysqlCredentials;

  const app = express.init();

  require("./routes/config-check")(app);
  require("./routes/config-update")(app);
  require("./routes/config-create")(app);

  try {
    const connection = require("./connection");

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
  } catch {
    console.log("MySQL Connection failed: config file likely missing");
  }

  app.listen(port, () =>
    console.log(`Express server now running on port ${port}!`)
  );
}

main();
