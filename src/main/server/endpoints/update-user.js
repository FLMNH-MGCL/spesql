const mysql = require("mysql");
const bcrypt = require("bcrypt");
const canAccess = require("../helpers/downAccess");

const saltRounds = 10;

module.exports = function (connection, app) {
  app.post("/api/admin/update-user/", function (req, res) {
    const { id, newUser } = req.body;
    const { username, name, password, privilege_level } = newUser;
    const adminUsername = req.body.adminUser;
    const adminPassword = req.body.adminPass;

    if (!adminUsername || !adminPassword) {
      res.status(400);
      res.send("Missing admin credentials");
      return;
    }

    if (!id) {
      res.status(400);
      res.send("Missing ID of target user");
      return;
    }

    if (!name && !username && !password && !privilege_level) {
      res.status(400);
      res.send("You must update at least one key in the user object");
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
              let command = "UPDATE users SET ";
              command += username ? `username = "${username}"` : "";
              command += name
                ? username
                  ? `, name = "${name}"`
                  : `name = "${name}"`
                : "";
              command += privilege_level
                ? username || name
                  ? `, privilege_level = "${privilege_level}"`
                  : `privilege_level = "${privilege_level}`
                : "";

              if (password) {
                bcrypt.hash(password, saltRounds).then((hash) => {
                  command +=
                    username || name || privilege_level
                      ? `, password = "${hash}"`
                      : `password = "${hash}"`;

                  command += ` WHERE id = ${id}`;

                  connection.query(command, (err, data) => {
                    if (err) {
                      res.status(503);
                      res.json(err);
                    } else {
                      res.json(data);
                    }
                  });
                });
              } else {
                command += ` WHERE id = ${id}`;
                connection.query(command, (err, data) => {
                  if (err) {
                    res.json(err);
                  } else {
                    res.json(data);
                  }
                });
              }
              // END ACTUAL FUNCTION
            }
          });
        }
      }
    );
    // END INITIAL QUERY

    // if authenticated
  });
};
