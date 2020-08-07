const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function (connection, app) {
  app.post("/api/admin/create-user/", function (req, res) {
    const name = req.body.name;
    const username = req.body.user;
    const password = req.body.password;
    const role = req.body.privilege_level;
    const adminUsername = req.body.adminUser;
    const adminPassword = req.body.adminPass;

    // must have admin creds
    if (!adminUsername || !adminPassword) {
      res.status(400);
      res.json({
        error: "Missing admin credentials",
      });
    }

    // authenticate user trying to create user
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
            res.json({ error: "Only admins may create users" });
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
    bcrypt.hash(password, saltRounds).then((hash) => {
      connection.query(
        `INSERT INTO users(name, username, password, privilege_level) VALUES ("${name}", "${username}", "${hash}", "${role}");`,
        (err, data) => {
          if (err) {
            // do sm
            // console.log(err);
            res.status(503);
            res.json({ err: err });
          } else {
            console.log("sucessfully created user");
            res.status(201);
            res.json({ data: "Sucessfully created user" });
          }
        }
      );
    });
  });
};
