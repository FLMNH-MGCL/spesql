const mysql = require("mysql");
const bcrypt = require("bcrypt");

module.exports = function(connection, app) {
  app.post("/api/login/", function(req, res) {
    const username = req.body.user;
    const plainPassword = req.body.password;

    connection.query(
      `SELECT * FROM users WHERE username="${username}";`,
      (err, data) => {
        if (err) {
          // do sm
          console.log(err);
          res.status(401);
          res.json(err);
        } else {
          // compare
          if (data.length < 1) {
            res.status(401);
            res.json({ err: "Auth failed" });
          } else {
            console.log(data);
            const { username, password } = data[0];
            //console.log(password);
            bcrypt.compare(plainPassword, password).then(result => {
              if (result === true) {
                const userData = {
                  username: username
                };
                res.status(200);
                res.json({
                  message: "Authorization sucessful.",
                  userData: userData,
                  authed: result
                });
              } else {
                console.log("AUTH FAILED");
                res.status(401);
                res.json({ err: "Authorization failed.", authed: result });
              }
            });
          }
        }
      }
    );
  });
};
