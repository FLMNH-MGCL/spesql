const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/delete/", function (req, res) {
    let command = req.body;

    if (!command || !command.command.toLowerCase().startsWith("delete")) {
      // not an update query
      res.json({
        success: false,
        error: "Invalid query type",
      });
    }

    if (command && !command.command.toLowerCase().includes("where")) {
      // dangerous update command
      res.json({
        success: false,
        error: "Deletion missing conditions for safety",
      });
    }

    connection.query(command.command, (err, data) => {
      if (err) {
        res.json({
          success: false,
          data: err,
        });
      }

      // console.log("Deleted Row(s):", data.affectedRows);
      res.json({
        success: true,
        data: data,
      });
    });
  });
};
