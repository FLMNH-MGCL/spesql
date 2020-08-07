const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/update/", function (req, res) {
    //console.log(connection)
    let command = req.body;

    // console.log(command);
    // console.log(typeof command);

    if (!command || !command.command.toLowerCase().startsWith("update")) {
      // not an update query
      res.json({
        success: false,
        error: "Invalid query type",
      });
    }

    if (command && !command.command.toLowerCase().includes("WHERE")) {
      // dangerous update command
      res.json({
        success: false,
        error: "Update missing conditions for safety",
      });
    }

    connection.query(command.command, (err, data) => {
      if (err) {
        res.json({
          success: false,
          data: err,
        });
      } else {
        res.json({
          success: true,
          data: data,
        });
      }
    });
  });
};
