let con = require('./connectToDB').con;
con.query("CREATE DATABASE kalcifer33333", function (err, result) {if (err) throw err; console.log("Database created")});