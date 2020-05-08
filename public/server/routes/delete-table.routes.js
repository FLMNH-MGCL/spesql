const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/admin/delete-table/", function (req, res) {
    console.log(req.body);
    const { tbl_name } = req.body;

    // create the actual table in db
    // set the access afterwards
    const command = `DROP TABLE ${tbl_name};`;

    connection.query(command, (err, data) => {
      if (err) {
        console.log(err);
        res.json({ error: "Error in deleting table", sqlMessage: err });
      } else {
        console.log("Sucessfully deleted table");
        res.status(201);
        res.json({ data: "Sucessfully deleted table", sqlMessage: data });
      }
    });
  });
};
