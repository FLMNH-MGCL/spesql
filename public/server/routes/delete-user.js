const mysql = require("mysql");
const authCheck = require("../helpers/authCheck");

module.exports = function (connection, app) {
  app.post("/api/admin/delete-user/", function (req, res) {
    const username = req.body.username;
    const command = `DELETE FROM users WHERE username = "${username}";`;
    const adminUsername = req.body.adminUser;
    const adminPassword = req.body.adminPass;

    let { status, message } = authCheck(
      connection,
      { username: adminUsername, password: adminPassword },
      "admin"
    );

    if (status !== 200) {
      res.status(status);
      res.send(message);
      return;
    }

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
