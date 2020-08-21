const mysql = require("mysql");
const bcrypt = require("bcrypt");

module.exports = function (connection, app) {
  app.post("/api/login/", function (req, res) {
    const username = req.body.user;
    const plainPassword = req.body.password;

    if (!username || !plainPassword) {
      res.status(400);
      res.json({
        errror: "Missing fields",
        authed: false,
      });
    }

    connection.query(
      `SELECT * FROM users WHERE username="${username}";`,
      (err, data) => {
        if (err) {
          res.status(503);
          res.json({ error: err, message: "vpn likely cause" });
        } else {
          // no user data exists and therefore not a successful login attempt
          if (data.length < 1) {
            res.status(401);
            res.json({
              error: "Auth failed",
              authed: false,
            });
          } else {
            const { username, password, privilege_level } = data[0];
            //console.log(password);
            bcrypt.compare(plainPassword, password).then((result) => {
              if (result === true) {
                const userData = {
                  username: username,
                  privilege_level: privilege_level,
                };
                res.status(200);
                res.json({
                  userData: userData,
                  authed: result,
                });
              } else {
                res.status(401);
                res.json({ error: "Authorization failed.", authed: result });
              }
            });
          }
        }
      }
    );
  });
};
