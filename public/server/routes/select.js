const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/select/", function (req, res) {
    //console.log(connection)
    let command = req.body;

    if (command && !command.command.toLowerCase().startsWith("select")) {
      res.send({ error: "Invalid query type for route." });
    } else {
      connection.query(command.command, (err, data) => {
        if (err) {
          res.send({ error: err });
        } else {
          res.json({ specimen: data });
        }
      });
    }
  });
};
