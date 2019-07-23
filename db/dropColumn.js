let con = require('./connectToDB').con;
let sql = `ALTER TABLE userssettings DROP COLUMN avasettings`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Column Drop")});

