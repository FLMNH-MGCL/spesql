const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function(connection, app) {
  app.post("/api/admin/create-user/", function(req, res) {
    const name = req.body.name;
    const username = req.body.user;
    const password = req.body.password;
    const role = req.body.privilege_level;
    // console.log(req.body);
    //console.log(`${username}:${password}`);

    bcrypt.hash(password, saltRounds).then(hash => {
      console.log(hash);
      connection.query(
        `INSERT INTO users(name, username, password, privilege_level) VALUES ("${name}", "${username}", "${hash}", "${role}");`,
        (err, data) => {
          if (err) {
            // do sm
            console.log(err);
            res.status(400);
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
