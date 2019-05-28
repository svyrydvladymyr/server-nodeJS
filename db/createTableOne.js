let con = require('./connectToDB').con;
  

    let sql = "CREATE TABLE customersOne (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");

});