const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function (connection, app) {
  app.post("/api/admin/update-user/", function (req, res) {
    const { id, newUser } = req.body;
    const { username, name, password, privilege_level } = newUser;

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

    console.log(command);

    if (password) {
      bcrypt.hash(password, saltRounds).then((hash) => {
        console.log(hash);
        command +=
          username || name || privilege_level
            ? `, password = "${hash}"`
            : `password = "${hash}"`;

        connection.query(command, (err, data) => {
          if (err) {
            res.status(404); // maybe?
            res.json(err);
          } else {
            res.json(data);
          }
        });
      });
    } else {
      connection.query(command, (err, data) => {
        if (err) {
          res.status(404); // maybe?
          res.json(err);
        } else {
          res.json(data);
        }
      });
    }

    // bcrypt.hash(password, saltRounds).then((hash) => {
    //   console.log(hash);
    //   connection.query(
    //     `INSERT INTO users(name, username, password, privilege_level) VALUES ("${name}", "${username}", "${hash}", "${role}");`,
    //     (err, data) => {
    //       if (err) {
    //         // do sm
    //         console.log(err);
    //         res.status(400);
    //         res.json({ err: err });
    //       } else {
    //         console.log("sucessfully created user");
    //         res.status(201);
    //         res.json({ data: "Sucessfully created user" });
    //       }
    //     }
    //   );
    // });
  });
};
