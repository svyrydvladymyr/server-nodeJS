let con = require('./connectToDB').con;
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE node", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
});