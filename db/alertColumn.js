let con = require('./connectToDB').con;
let sql = `ALTER TABLE userssettings ADD vfriendall VARCHAR(5) DEFAULT 'off'`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Column Alert")});