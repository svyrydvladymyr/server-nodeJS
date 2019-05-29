let con = require('./connectToDB').con;
con.query("CREATE DATABASE node", function (err, result) {
      if (err) throw err;
      console.log("Database created");  
});