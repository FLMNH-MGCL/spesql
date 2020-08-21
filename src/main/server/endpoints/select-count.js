const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/select-count/", function (req, res) {
    let command = req.body;

    if (command && !command.command.toLowerCase().startsWith("select count")) {
      res.status(400);
      res.send("Invalid query type for route.");
    }

    connection.query(command.command, (err, data) => {
      if (err) {
        res.status(503);
        res.send({ error: err });
      } else {
        res.json({ data: data });
      }
    });
  });
};
