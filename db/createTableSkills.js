let con = require('./connectToDB').con;
let sql = `CREATE TABLE userskills (id INT AUTO_INCREMENT PRIMARY KEY,
                                        userid VARCHAR(100) NOT NULL UNIQUE,
                                        skillnumber1 VARCHAR(5),                      
                                        skillchack1 VARCHAR(5),                      
                                        skill1 VARCHAR(100),                      
                                        skilllevel1 VARCHAR(5),  

                                        skillnumber2 VARCHAR(5),                      
                                        skillchack2 VARCHAR(5),                      
                                        skill2 VARCHAR(100), 
                                        skilllevel2 VARCHAR(5), 

                                        skillnumber3 VARCHAR(5),                      
                                        skillchack3 VARCHAR(5),                      
                                        skill3 VARCHAR(100),                      
                                        skilllevel3 VARCHAR(5),    

                                        skillnumber4 VARCHAR(5), 
                                        skillchack4 VARCHAR(5),                      
                                        skill4 VARCHAR(100),                      
                                        skilllevel4 VARCHAR(5), 

                                        skillnumber5 VARCHAR(5), 
                                        skillchack5 VARCHAR(5),                      
                                        skill5 VARCHAR(100),                      
                                        skilllevel5 VARCHAR(5), 

                                        skillnumber6 VARCHAR(5), 
                                        skillchack6 VARCHAR(5),                    
                                        skill6 VARCHAR(100),                      
                                        skilllevel6 VARCHAR(5), 

                                        skillnumber7 VARCHAR(5), 
                                        skillchack7 VARCHAR(5),                      
                                        skill7 VARCHAR(100),                      
                                        skilllevel7 VARCHAR(5),

                                        skillnumber8 VARCHAR(5),
                                        skillchack8 VARCHAR(5),                 
                                        skill8 VARCHAR(100),                      
                                        skilllevel8 VARCHAR(5),  

                                        skillnumber9 VARCHAR(5),
                                        skillchack9 VARCHAR(5),                      
                                        skill9 VARCHAR(100),                      
                                        skilllevel9 VARCHAR(5),  

                                        skillnumber10 VARCHAR(5), 
                                        skillchack10 VARCHAR(5),                      
                                        skill10 VARCHAR(100),                  
                                        skilllevel10 VARCHAR(5)                      
                                        )`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table userssettings created")});