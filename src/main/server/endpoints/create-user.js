const mysql = require("mysql");
const bcrypt = require("bcrypt");
const canAccess = require("../helpers/downAccess");
const saltRounds = 10;

module.exports = function (connection, app) {
  app.post("/api/admin/create-user/", function (req, res) {
    const name = req.body.name;
    const username = req.body.user;
    const password = req.body.password;
    const role = req.body.privilege_level;
    const adminUsername = req.body.adminUser;
    const adminPassword = req.body.adminPass;

    if (!adminUsername || !adminPassword) {
      res.status(400);
      res.send("Missing admin credentials");
      return;
    }

    if (!name || !username || !password || !role) {
      res.status(400);
      res.send("Missing new user credentials");
      return;
    }

    // authenticate user trying to create user
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
              bcrypt.hash(password, saltRounds).then((hash) => {
                connection.query(
                  `INSERT INTO users(name, username, password, privilege_level) VALUES ("${name}", "${username}", "${hash}", "${role}");`,
                  (err, data) => {
                    if (err) {
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
              // END ACTUAL FUNCTION
            }
          });
        }
      }
    );
    // END INITIAL QUERY
  });
};
