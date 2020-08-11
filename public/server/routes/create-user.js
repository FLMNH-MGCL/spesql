const mysql = require("mysql");
const bcrypt = require("bcrypt");
const authCheck = require("../helpers/authCheck");
const saltRounds = 10;

module.exports = function (connection, app) {
  app.post("/api/admin/create-user/", function (req, res) {
    const name = req.body.name;
    const username = req.body.user;
    const password = req.body.password;
    const role = req.body.privilege_level;
    const adminUsername = req.body.adminUser;
    const adminPassword = req.body.adminPass;

    let authcheckStatus = authCheck(
      connection,
      { username: adminUsername, password: adminPassword },
      "admin"
    );

    if (authcheckStatus !== 200) {
      let responseMessage = "";
      switch (authcheckStatus) {
        case 400:
          responseMessage = "Missing admin credentials";
          break;
        case 401:
        case 403:
          responseMessage = "Authorization either failed or denied";
          break;
        case 503:
          responseMessage = "Bad connection detected";
          break;
        default:
          responseMessage = "Could not interpret request";
          break;
      }

      res.status(authcheckStatus);
      res.json({
        error: responseMessage,
      });
    }

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
