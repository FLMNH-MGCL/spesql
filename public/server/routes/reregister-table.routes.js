// tbl_name: name,
// minimum_access_update: minUp,
// minimum_access_insert: minIns,
// minimum_accesss_select: minSel,
const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/admin/reregister-table/", function (req, res) {
    const { command } = req.body;

    console.log(command);

    connection.query(command, (err, data) => {
      if (err) {
        res.json({ error: "Error in reregistering table", sqlMessage: err });
      } else {
        res.json({ data: "Sucessfully reregistered table" });
      }
    });
  });
};
