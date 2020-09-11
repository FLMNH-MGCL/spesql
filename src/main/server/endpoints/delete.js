const mysql = require("mysql");
const canAccess = require("../helpers/downAccess");
const bcrypt = require("bcrypt");

module.exports = function (connection, app) {
  app.post("/api/delete/", async function (req, res) {
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

    if (!user || !password) {
      res.status(400);
      res.send("Missing credentials");
    }

    // START INITIAL QUERY
    connection.query(
      `SELECT * FROM users WHERE username="${user}";`,
      (err, data) => {
        if (err) {
          res.status(503).send("Bad connection detected");
          return;
        } else if (data.length < 1 || data === [] || !data) {
          // auth failed
          res.status(401).send("Authorization either failed or denied");
          return;
        } else {
          // const _adminUsername = data[0].username;
          const _password = data[0].password;
          const privilege = data[0].privilege_level;

          if (!canAccess(privilege, "manager")) {
            res.status(403).send("Authorization either failed or denied");
            return;
          }

          bcrypt.compare(password, _password).then((result) => {
            if (result !== true) {
              // invalid auth state, unauthorized to create table
              res.status(401).send("Authorization either failed or denied");
              return;
            } else {
              // ACTUAL FUNCTION
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
              // END ACTUAL FUNCTION
            }
          });
        }
      }
    );
    // END INITIAL QUERY
  });
};
