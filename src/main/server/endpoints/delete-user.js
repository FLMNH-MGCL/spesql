const mysql = require("mysql");
const canAccess = require("../helpers/downAccess");
const bcrypt = require("bcrypt");

module.exports = function (connection, app) {
  app.post("/api/admin/delete-user/", function (req, res) {
    const username = req.body.username;
    const adminUsername = req.body.adminUser;
    const adminPassword = req.body.adminPass;

    if (!adminUsername || !adminPassword) {
      res.status(400);
      res.send("Missing admin credentials");
      return;
    }

    if (!username) {
      res.status(400);
      res.send("Missing taget username to delete");
      return;
    }

    // START INITIAL QUERY
    connection.query(
      `SELECT * FROM users WHERE username="${adminUsername}";`,
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

          if (!canAccess(privilege, "admin")) {
            res.status(403).send("Authorization either failed or denied");
            return;
          }

          bcrypt.compare(adminPassword, _password).then((result) => {
            if (result !== true) {
              // invalid auth state, unauthorized to create table
              res.status(401).send("Authorization either failed or denied");
              return;
            } else {
              // ACTUAL FUNCTION
              const command = `DELETE FROM users WHERE username = "${username}";`;

              connection.query(command, (err, data) => {
                if (err) {
                  res.json({ err });
                } else {
                  res.json(data);
                }
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
