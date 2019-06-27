let con = require('./connectToDB').con;
let sql = `CREATE TABLE userssettings (id INT AUTO_INCREMENT PRIMARY KEY,
                                        userid VARCHAR(100) NOT NULL UNIQUE,
                                        avasettings VARCHAR(10) DEFAULT '50% 50%',
                                        maincolor VARCHAR(11) DEFAULT '#2d5e8e',
                                        secondcolor VARCHAR(11) DEFAULT '#5c8ab9',
                                        bgcolor VARCHAR(11) DEFAULT '#f1f1f1',
                                        bordertl VARCHAR(3) DEFAULT '9',
                                        bordertr VARCHAR(3) DEFAULT '9',
                                        borderbl VARCHAR(3) DEFAULT '9',
                                        borderbr VARCHAR(3) DEFAULT '9',
                                        fonts VARCHAR(35) DEFAULT 'ptsans',
                                        language VARCHAR(10) DEFAULT 'ua',
                                        vskillsall VARCHAR(5) DEFAULT 'off',
                                        vskillsalltop VARCHAR(5) DEFAULT 'off',                                                           
                                        vskillsme VARCHAR(5) DEFAULT 'on',    
                                        vskillsmetop VARCHAR(5) DEFAULT 'off',                                                                  
                                        vprojectsall VARCHAR(5) DEFAULT 'off',   
                                        vprojectsalltop VARCHAR(5) DEFAULT 'off',                                                                  
                                        vprojectsme VARCHAR(5) DEFAULT 'on',                                                                  
                                        vprojectsmetop VARCHAR(5) DEFAULT 'off',                                                                  
                                        vblogall VARCHAR(5) DEFAULT 'off'                                                               
                                        vblogme VARCHAR(5) DEFAULT 'on'                                                               
                                        )`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table userssettings created")});