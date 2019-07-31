let con = require('./connectToDB').con;
let sql = `ALTER TABLE users ADD instagramemail VARCHAR(60) UNIQUE`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Column Alert")});