const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/admin/delete-user/", function (req, res) {
    const username = req.body.username;
    const command = `DELETE FROM users WHERE username = "${username}";`;
    // const username = req.body.user;
    // console.log(req.body);

    connection.query(command, (err, data) => {
      if (err) {
        // console.log(err);
        res.json({ err });
      } else {
        res.json(data);
      }
    });
  });
};
