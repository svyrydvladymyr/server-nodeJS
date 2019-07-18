let con = require('./connectToDB').con;
let sql = `ALTER TABLE friends_bbbbbbbbbb_05vyK7ZObz ADD friendstatus VARCHAR(10)`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Column Alert")});