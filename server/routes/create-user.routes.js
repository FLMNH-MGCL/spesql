const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function(connection, app) {
  app.post("/api/create-user/", function(req, res) {
    const username = req.body.user;
    const password = req.body.password;
    const role = req.body.privilege_level;
    // console.log(req.body);
    //console.log(`${username}:${password}`);

    bcrypt.hash(password, saltRounds).then(hash => {
      console.log(hash);
      connection.query(
        `INSERT INTO users(username, password, privilege_level) VALUES ("${username}", "${hash}", "${role}");`,
        (err, data) => {
          if (err) {
            // do sm
            console.log(err);
            res.status(400);
            res.json(err);
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
