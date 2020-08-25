const mysql = require("mysql");
const bcrypt = require("bcrypt");
const authCheck = require("../helpers/authCheck");
const canAccess = require("../helpers/downAccess");

module.exports = function (connection, app) {
  app.post("/api/admin/delete-table/", function (req, res) {
    const { tbl_name } = req.body;
    const user = req.body.user;
    const password = req.body.password;

    if (!user || !password) {
      res.status(400);
      res.send("Missing credentials");
      return;
    }

    if (!tbl_name) {
      res.status(400).send("Missing table name");
      return;
    }

    // START INITIAL QUERY
    connection.query(
      `SELECT * FROM users WHERE username="${user}";`,
      (err, data) => {
        if (err) {
          res.status(503).send("Bad connection detected");
          return;
        } else if (data.length < 1 || data === [] || !data) {
          // auth failed
          res.status(401).send("Authorization either failed or denied");
          return;
        } else {
          // const _adminUsername = data[0].username;
          const _password = data[0].password;
          const privilege = data[0].privilege_level;

          if (!canAccess(privilege, "manager")) {
            res.status(403).send("Authorization either failed or denied");
            return;
          }

          bcrypt.compare(password, _password).then((result) => {
            if (result !== true) {
              // invalid auth state, unauthorized to create table
              res.status(401).send("Authorization either failed or denied");
              return;
            } else {
              // ACTUAL FUNCTION
              const command = `DROP TABLE ${tbl_name};`;

              connection.query(command, (err, data) => {
                if (err) {
                  res.json({
                    error: "Error in deleting table",
                    sqlMessage: err,
                  });
                } else {
                  res.status(201);
                  res.json({
                    data: "Sucessfully deleted table",
                    sqlMessage: data,
                  });
                }
              });
              // END ACTUAL FUNCTION
            }
          });
        }
      }
    );
    // END INITIAL QUERY
  });
};
