let con = require('./connectToDB').con;
let sql = `CREATE TABLE userskills (id INT AUTO_INCREMENT PRIMARY KEY,
                                        userid VARCHAR(100) NOT NULL UNIQUE,
                                        skillnumber1 VARCHAR(3),                      
                                        skillchack1 VARCHAR(3),                      
                                        skill1 VARCHAR(100),                      
                                        skilllevel1 VARCHAR(4),  

                                        skillnumber2 VARCHAR(3),                      
                                        skillchack2 VARCHAR(3),                      
                                        skill2 VARCHAR(100), 
                                        skilllevel2 VARCHAR(4), 

                                        skillnumber3 VARCHAR(3),                      
                                        skillchack3 VARCHAR(3),                      
                                        skill3 VARCHAR(100),                      
                                        skilllevel3 VARCHAR(4),    

                                        skillnumber4 VARCHAR(3), 
                                        skillchack4 VARCHAR(3),                      
                                        skill4 VARCHAR(100),                      
                                        skilllevel4 VARCHAR(4), 

                                        skillnumber5 VARCHAR(3), 
                                        skillchack5 VARCHAR(3),                      
                                        skill5 VARCHAR(100),                      
                                        skilllevel5 VARCHAR(4), 

                                        skillnumber6 VARCHAR(3), 
                                        skillchack6 VARCHAR(3),                    
                                        skill6 VARCHAR(100),                      
                                        skilllevel6 VARCHAR(4), 

                                        skillnumber7 VARCHAR(3), 
                                        skillchack7 VARCHAR(3),                      
                                        skill7 VARCHAR(100),                      
                                        skilllevel7 VARCHAR(4),

                                        skillnumber8 VARCHAR(3),
                                        skillchack8 VARCHAR(3),                 
                                        skill8 VARCHAR(100),                      
                                        skilllevel8 VARCHAR(4),  

                                        skillnumber9 VARCHAR(3),
                                        skillchack9 VARCHAR(3),                      
                                        skill9 VARCHAR(100),                      
                                        skilllevel9 VARCHAR(4),  

                                        skillnumber10 VARCHAR(3), 
                                        skillchack10 VARCHAR(3),                      
                                        skill10 VARCHAR(100),                  
                                        skilllevel10 VARCHAR(4)                      
                                        )`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table userssettings created")});