const mysql = require("mysql");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

module.exports = function (connection, app) {
  app.post("/api/admin/delete-user/", function (req, res) {
    const username = req.body.username;
    const command = `DELETE FROM users WHERE username = "${username}";`;
    // const username = req.body.user;
    // console.log(req.body);

    connection.query(command, (err, data) => {
      if (err) {
        console.log(err);
        res.status(404).json(err);
        // res.json({ status: 400, details: err });
      } else {
        console.log(data);
        res.status(204);
        res.json(data);
      }
    });
  });
};
