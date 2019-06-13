let con = require('./connectToDB').con;
let sql = `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,
                                userid VARCHAR(100) NOT NULL UNIQUE,
                                token VARCHAR(100),
                                login VARCHAR(40) NOT NULL UNIQUE, 
                                password VARCHAR(40) NOT NULL,
                                name VARCHAR(40) NOT NULL, 
                                surname VARCHAR(40) NOT NULL,
                                email VARCHAR(60) NOT NULL UNIQUE,
                                ava VARCHAR(255),
                                avasettings VARCHAR(10) DEFAULT '50% 50%',
                                birthday VARCHAR(11),
                                phone VARCHAR(15),
                                message VARCHAR(15),
                                country VARCHAR(40),
                                town VARCHAR(40), 
                                profession VARCHAR(100),                            
                                registrdata DATE                            
                                )`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table users created")});