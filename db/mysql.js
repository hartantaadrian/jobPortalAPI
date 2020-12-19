var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "P@ssw0rd.1",
  database: "jobportal",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
