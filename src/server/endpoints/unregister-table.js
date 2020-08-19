const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/admin/unregister-table/", function (req, res) {
    const { tbl_name } = req.body;

    const command = `DELETE FROM interactables WHERE tbl_name="${tbl_name}";`;

    connection.query(command, (err, data) => {
      if (err) {
        console.log(err);
        res.json({ error: "Error in unregistering table", sqlMessage: err });
      } else {
        console.log("Sucessfully unregistered table");
        res.status(201);
        res.json({ data: "Sucessfully unregistered table", sqlMessage: data });
      }
    });
  });
};
