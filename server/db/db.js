var mysql = require("mysql2");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "punith123",
  database: "LearnFinity",
});

module.exports = db;
