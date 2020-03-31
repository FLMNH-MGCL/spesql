const mysql = require("mysql");

module.exports = function(connection, app) {
  app.get("/api/admin/fetch-users/", (req, res) => {
    connection.query(
      "SELECT id,name,username,privilege_level,created_at FROM users;",
      (err, data) => {
        if (err) {
          res.status(500); // i don't know what would cause err yet
          res.json(err);
        } else {
          res.status(200);
          res.json(data);
        }
      }
    );
  });
};
