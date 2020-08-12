const mysql = require("mysql");
const bcrypt = require("bcrypt");
const authCheck = require("../helpers/authCheck");

const saltRounds = 10;

module.exports = function (connection, app) {
  app.post("/api/admin/update-user/", function (req, res) {
    const { id, newUser } = req.body;
    const { username, name, password, privilege_level } = newUser;
    const adminUsername = req.body.adminUser;
    const adminPassword = req.body.adminPass;

    let { status, message } = authCheck(
      connection,
      { username: adminUsername, password: adminPassword },
      "admin"
    );

    if (status !== 200) {
      res.status(status);
      res.send(message);
      return;
    }

    // if authenticated
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

    command += ` WHERE id = ${id}`;

    if (password) {
      bcrypt.hash(password, saltRounds).then((hash) => {
        console.log(hash);
        command +=
          username || name || privilege_level
            ? `, password = "${hash}"`
            : `password = "${hash}"`;

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
      connection.query(command, (err, data) => {
        if (err) {
          res.json(err);
        } else {
          res.json(data);
        }
      });
    }
  });
};
