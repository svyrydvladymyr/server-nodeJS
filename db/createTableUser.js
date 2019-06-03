let con = require('./connectToDB').con;
let sql = `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, 
                                            name VARCHAR(20), 
                                            surname VARCHAR(20),
                                            nameid VARCHAR(50),
                                            token VARCHAR(255),
                                            foto VARCHAR(255),
                                            country VARCHAR(40),
                                            town VARCHAR(40),
                                            birtday DATE,
                                            phone int(10),
                                            message int(10),
                                            profesion VARCHAR(50),
                                            level VARCHAR(30)                                 
                                            )`;
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table users created")});