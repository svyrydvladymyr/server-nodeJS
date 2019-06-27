let con = require('./connectToDB').con;
let sql = `ALTER TABLE userssettings ADD vblogme varchar(5) DEFAULT 'on';`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Column Alert")});