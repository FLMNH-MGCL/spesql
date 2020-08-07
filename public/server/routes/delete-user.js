const mysql = require("mysql");
const bcrypt = require("bcrypt");

module.exports = function (connection, app) {
  app.post("/api/admin/delete-user/", function (req, res) {
    const username = req.body.username;
    const command = `DELETE FROM users WHERE username = "${username}";`;
    const adminUsername = req.body.adminUser;
    const adminPassword = req.body.adminPass;

    // must have admin creds
    if (!adminUsername || !adminPassword) {
      res.status(400);
      res.json({
        error: "Missing admin credentials",
      });
    }

    // authenticate user trying to delete user
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
            res.json({ error: "Only admins may delete users" });
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
    connection.query(command, (err, data) => {
      if (err) {
        res.json({ err });
      } else {
        res.json(data);
      }
    });
  });
};
