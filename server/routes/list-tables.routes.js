const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/list-tables/", function (req, res) {
    //console.log(connection)
    let { privilege_level, query_type } = req.body;

    // manager select
    // correct command select all from table where minaccsel = guest

    // console.log(privilege_level, query_type);
    let command = "";
    if (privilege_level === "admin") {
      command = "SELECT * FROM interactables;";
    } else {
      if (query_type === "select") {
        command = `SELECT * FROM interactables WHERE minimum_access_${query_type}="guest";`;
      } else if (query_type === "update") {
        command = `SELECT * FROM interactables WHERE minimum_access_${query_type}="manager"`;
      } else if (query_type === "insert") {
        command = `SELECT * FROM interactables WHERE minimum_access_${query_type}="manager"`;
      }
    }

    //console.log(command)
    connection.query(command, (err, data) => {
      if (err) {
        console.log(err);
        res.json({ tables: [], error: err });
      } else {
        // console.log(data);
        const tables = data.map((table) => {
          const { tbl_name } = table;
          return tbl_name;
        });
        res.json({ tables: tables });
      }
    });
  });
};
