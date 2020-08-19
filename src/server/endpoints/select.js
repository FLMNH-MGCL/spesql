const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/select/", function (req, res) {
    //console.log(connection)
    let command = req.body;

    if (command && !command.command.toLowerCase().startsWith("select")) {
      res.status(400);
      res.send("Invalid query type for route.");
    } else {
      connection.query(command.command, (err, data) => {
        if (err) {
          res.status(503);
          res.send({ error: err });
        } else {
          res.status(200);
          res.json({ specimen: data });
        }
      });
    }
  });
};
