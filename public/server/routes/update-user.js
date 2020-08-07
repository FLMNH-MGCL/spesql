const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function (connection, app) {
  app.post("/api/admin/update-user/", function (req, res) {
    const { id, newUser } = req.body;
    const { username, name, password, privilege_level } = newUser;
    const adminUsername = req.body.adminUser;
    const adminPassword = req.body.adminPass;

    // must have admin creds
    if (!adminUsername || !adminPassword) {
      res.status(400);
      res.json({
        error: "Missing admin credentials",
      });
    }

    // authenticate user trying to update user
    connection.query(
      `SELECT * FROM users WHERE username="${adminUsername}";`,
      (err, data) => {
        if (err) {
          res.status(503);
          res.json({ error: "Bad connection detected" });
        } else if (data.length < 1) {
          // auth failed
          res.status(401);
          res.json({ error: "Authorization failed" });
        } else {
          // const _adminUsername = data[0].username;
          const _adminPassword = data[0].password;
          const isAdmin = data[0].privilege_level === "admin";

          if (!isAdmin) {
            res.status(401);
            res.json({ error: "Only admins may update users" });
          }

          bcrypt.compare(adminPassword, _adminPassword).then((result) => {
            if (result !== true) {
              // invalid auth state, unauthorized to create user
              res.status(401);
              res.json({ error: "Authorization failed" });
            }
          });
        }
      }
    );

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
