const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/list-tables/", function (req, res) {
    //console.log(connection)
    let { privilege_level, query_type } = req.body;
    let command =
      privilege_level === "admin"
        ? "SELECT * FROM interactables;"
        : `SELECT * FROM interactables WHERE minimum_access_${query_type}="${privilege_level}";`;
    //console.log(command)
    connection.query(command, (err, data) => {
      if (err) {
        console.log(err);
        res.json({ tables: [], error: err });
      } else {
        console.log(data);
        const tables = data.map((table) => {
          const { tbl_name } = table;
          return tbl_name;
        });
        res.json({ tables: tables });
      }
    });
  });
};
