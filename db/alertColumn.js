let con = require('./connectToDB').con;
let sql = `ALTER TABLE userssettings ADD borderbr varchar(3) DEFAULT '9';`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Column Alert")});