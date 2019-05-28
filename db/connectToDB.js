let mysql = require('mysql');
let con, db_config = {
    host: "eu-cdbr-west-02.cleardb.net",
    user: "bb3b6857c7c94b",
    password: "abe128b6"
    // database: "node"
  };

con = mysql.createConnection(db_config);
con.connect((err) => {
    if (err) throw errorData(err, res);
});    

setInterval(function () {
    con.query('SELECT 1');
}, 10000);

module.exports = {
    con
}  
