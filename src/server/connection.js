const mysql = require("mysql");
const fs = require("fs");
const homedir = require("os").homedir();
const path = require("path");

const configPath = path.join(homedir, ".spesql", "config.json");

const mysqlCredentials = require(configPath);

// const mysqlCredentials = config.mysqlCredentials;

let pool = mysql.createPool({
  host: mysqlCredentials.host,
  port: mysqlCredentials.port,
  user: mysqlCredentials.user,
  password: mysqlCredentials.password,
  database: mysqlCredentials.database,
  connectTimeout: 10000,
});

pool.getConnection(function (err, connection) {
  // connected! (unless `err` is set)
  if (connection) {
    console.log("Connected to MySQL Server");
  } else if (err) {
    console.log(err);
  }
});

pool.on("error", function (err) {
  console.log(err.code); // 'ER_BAD_DB_ERROR'
  // https://www.npmjs.com/package/mysql#error-handling
});

module.exports = pool;
