const mysql = require("mysql");
const authCheck = require("../helpers/authCheck");

module.exports = function (connection, app) {
  app.post("/api/update/", function (req, res) {
    let command = req.body;
    const user = req.body.user;
    const password = req.body.password;

    if (!command || !command.command.toLowerCase().startsWith("update")) {
      // not an update query
      res.status(400);
      res.send("Invalid query type");
    }

    if (command && !command.command.toLowerCase().includes("WHERE")) {
      // dangerous update command
      res.status(400);
      res.json("Update missing conditions for safety");
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

    connection.query(command.command, (err, data) => {
      if (err) {
        // res.status(503);
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
