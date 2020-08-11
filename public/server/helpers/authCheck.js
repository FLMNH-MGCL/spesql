const bcrypt = require("bcrypt");
const canAccess = require("./downAccess");

/**
 * @description Authenticates user attempting a server-side operation
 * @param {object} connection - SQL connection object
 * @param {object} userData - JSON containing username and password
 * @param {string} minimumRole - the minimum privilege level rquired for access
 * @returns {object} - response object {status, message}
 */
module.exports = function (connection, userData, minimumRole) {
  const username = userData.username;
  const password = userData.username;

  let retStatus = 200;

  // must have admin creds
  if (!username || !password) {
    retStatus = 400;

    return { status: retStatus, message: "Missing credentials" };
  }

  // authenticate user trying to delete user
  connection.query(
    `SELECT * FROM users WHERE username="${username}";`,
    (err, data) => {
      if (err) {
        retStatus = 503;

        return { status: retStatus, message: "Bad connection detected" };
      } else if (data.length < 1) {
        // auth failed
        retStatus = 401;
        return {
          status: retStatus,
          message: "Authorization either failed or denied",
        };
      } else {
        // const _adminUsername = data[0].username;
        const _password = data[0].password;
        const privilege = data[0].privilege_level;

        if (!canAccess(privilege, minimumRole)) {
          retStatus = 403;
          return {
            status: retStatus,
            message: "Authorization either failed or denied",
          };
        }

        bcrypt.compare(password, _password).then((result) => {
          if (result !== true) {
            // invalid auth state, unauthorized to create user
            retStatus = 401;
            return {
              status: retStatus,
              message: "Authorization either failed or denied",
            };
          }
        });
      }
    }
  );

  if (retStatus === 200) {
    return {
      status: retStatus,
      message: "Authorized",
    };
  } else {
    return {
      status: 401,
      message: "Server error occurred",
    };
  }
};
