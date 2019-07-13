let con = require('./connectToDB').con;
let sql = `ALTER TABLE users ADD education VARCHAR(100)`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Column Alert")});