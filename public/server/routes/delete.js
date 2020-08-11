const mysql = require("mysql");
const authCheck = require("../helpers/authCheck");

module.exports = function (connection, app) {
  app.post("/api/delete/", function (req, res) {
    let command = req.body;
    const user = req.body.user;
    const password = req.body.password;

    if (!command || !command.command.toLowerCase().startsWith("delete")) {
      // not an update query
      res.status(400);
      res.send("Invalid query type");
    }

    if (command && !command.command.toLowerCase().includes("where")) {
      // dangerous update command
      res.status(400);
      res.send("Deletion missing conditions for safety");
    }

    let { status, message } = authCheck(
      connection,
      { username: user, password: password },
      "manager"
    );

    if (status !== 200) {
      res.status(status);
      res.json({
        error: message,
      });
    }

    // TODO: don't do data: err, instead do error: err and change client to check for data OR error
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
