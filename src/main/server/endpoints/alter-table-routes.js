const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/admin/alter-table/", function (req, res) {
    const { command } = req.body;

    console.log(command);

    connection.query(command, (err, data) => {
      if (err) {
        res.json({ error: "Error in altering table", sqlMessage: err });
      } else {
        res.json({ data: "Sucessfully altered table" });
      }
    });
  });
};
