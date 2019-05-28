let con = require('./connectToDB').con;

con.connect(function(err){
    if (err) throw err;
    console.log("Connected..!");
    let sql = "CREATE TABLE customersTwo (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function(err, result){
        if (err) throw err;
        console.log("Table TWO create..!");        
    });
});