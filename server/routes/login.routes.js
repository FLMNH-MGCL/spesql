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
        } else {
          // compare
          console.log(data);
          const { password } = data[0];
          console.log(password);
          bcrypt.compare(plainPassword, password).then(result => {
            if (err) {
              console.log(err);
            } else {
              if (result === true) {
                console.log("AUTH SUCESS");
                res.status(200);
                res.json({ data: "Authorization sucessful.", authed: result });
              } else {
                console.log("AUTH FAILED");
                res.status(401);
                res.json({ err: "Authorization failed.", authed: result });
              }
            }
          });
        }
      }
    );
  });
};
