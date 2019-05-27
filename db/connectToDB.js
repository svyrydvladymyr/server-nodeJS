let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kalcifer1988",
    database: "node"
  });

module.exports = {
    con
}  
