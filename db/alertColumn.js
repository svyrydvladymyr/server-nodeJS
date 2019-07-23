let con = require('./connectToDB').con;
let sql = `ALTER TABLE users ADD avasettings VARCHAR(10) DEFAULT '50% 50%'`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Column Alert")});