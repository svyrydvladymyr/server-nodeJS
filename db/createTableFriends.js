let con = require('./connectToDB').con;
let sql = `CREATE TABLE friends_volodymyrsvyryd_kQnOheDxIc (id INT AUTO_INCREMENT PRIMARY KEY,
                                userid VARCHAR(100),
                                friendid VARCHAR(100) NOT NULL UNIQUE,
                                friendvisit VARCHAR(10),
                                friendadd DATE                           
                                )`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table users created")});