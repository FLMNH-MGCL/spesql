const mysql = require("mysql");

module.exports = function (connection, app) {
  app.get("/api/admin/list-tables/", function (req, res) {
    //console.log(connection)
    let command = "SELECT * FROM interactables;";
    //console.log(command)
    connection.query(command, (err, data) => {
      if (err) {
        console.log(err);
        res.json({ tables: [], error: err });
      } else {
        // console.log(data);
        const tables = data.map((table) => {
          const {
            tbl_name,
            minimum_access_select,
            minimum_access_update,
            minimum_access_delete,
          } = table;
          return {
            tbl_name,
            minimum_access_select,
            minimum_access_update,
            minimum_access_delete,
          };
        });
        res.json({ tables: tables });
      }
    });
  });
};
