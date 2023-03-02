const mysql = require("mysql2");

module.exports = conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "azure_db",
});
