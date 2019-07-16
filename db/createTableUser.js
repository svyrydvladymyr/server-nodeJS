let con = require('./connectToDB').con;
let sql = `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,
                                userid VARCHAR(100) NOT NULL UNIQUE,
                                token VARCHAR(30),
                                active VARCHAR(20),
                                login VARCHAR(40) NOT NULL UNIQUE, 
                                password VARCHAR(40) NOT NULL,
                                name VARCHAR(80) NOT NULL, 
                                surname VARCHAR(80) NOT NULL, 
                                email VARCHAR(60) NOT NULL UNIQUE,
                                ava VARCHAR(255),
                                birthday VARCHAR(11),
                                phone VARCHAR(15),
                                message VARCHAR(15),
                                country VARCHAR(40),
                                town VARCHAR(40), 
                                profession VARCHAR(100),                            
                                education VARCHAR(100),                            
                                registrdata DATE,                            
                                updateuser DATE                            
                                )`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table users created")});