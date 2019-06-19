let con = require('./connectToDB').con;
let sql = `CREATE TABLE userssettings (id INT AUTO_INCREMENT PRIMARY KEY,
                                        userid VARCHAR(100) NOT NULL UNIQUE,
                                        avasettings VARCHAR(10) DEFAULT '50% 50%',
                                        maincolor VARCHAR(11) DEFAULT '#2d5e8e',
                                        secondcolor VARCHAR(11) DEFAULT '#5c8ab9',
                                        bgcolor VARCHAR(11) DEFAULT '#f1f1f1',
                                        borderradius VARCHAR(20) DEFAULT '9px 9px 9px 9px',
                                        fonts VARCHAR(35) DEFAULT 'ptsans',
                                        language VARCHAR(10) DEFAULT 'ua',
                                        vskills VARCHAR(5) DEFAULT 'off',                                                                  
                                        vprojects VARCHAR(5) DEFAULT 'off',                                                                  
                                        vblog VARCHAR(5) DEFAULT 'off'                                                               
                                        )`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table userssettings created")});