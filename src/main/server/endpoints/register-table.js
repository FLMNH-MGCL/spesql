// tbl_name: name,
// minimum_access_update: minUp,
// minimum_access_insert: minIns,
// minimum_accesss_select: minSel,
const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/admin/register-table/", function (req, res) {
    const { tableAttributes } = req.body;

    // create the actual table in db
    // set the access afterwards
    const fields =
      "tbl_name, minimum_access_select, minimum_access_update, minimum_access_delete";
    const fieldValues =
      `"${tableAttributes.tbl_name}",` +
      `"${tableAttributes.minimum_access_select}",` +
      `"${tableAttributes.minimum_access_insert}",` +
      `"${tableAttributes.minimum_access_update}"`;
    const command = `INSERT INTO interactables(${fields}) VALUES (${fieldValues});`;

    connection.query(command, (err, data) => {
      if (err) {
        console.log(err);
        res.json({ error: "Error in creating table", sqlMessage: err });
      } else {
        console.log("Sucessfully registered table");
        res.status(201);
        res.json({ data: "Sucessfully registered table", sqlMessage: data });
      }
    });
  });
};
