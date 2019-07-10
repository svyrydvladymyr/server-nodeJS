let con = require('./connectToDB').con;
let sql = `CREATE TABLE userprojects (id INT AUTO_INCREMENT PRIMARY KEY,
                                        userid VARCHAR(100) NOT NULL UNIQUE,

                                        projnumber1 VARCHAR(5),   
                                        projchack1 VARCHAR(5),                    
                                        projname1 VARCHAR(80),                      
                                        projdescript1 VARCHAR(200),                      
                                        projurl1 VARCHAR(100), 

                                        projnumber2 VARCHAR(5),  
                                        projchack2 VARCHAR(5),                    
                                        projname2 VARCHAR(80),                      
                                        projdescript2 VARCHAR(200),                      
                                        projurl2 VARCHAR(100),  

                                        projnumber3 VARCHAR(5), 
                                        projchack3 VARCHAR(5), 
                                        projname3 VARCHAR(80),                      
                                        projdescript3 VARCHAR(200),                      
                                        projurl3 VARCHAR(100),  

                                        projnumber4 VARCHAR(5), 
                                        projchack4 VARCHAR(5),                     
                                        projname4 VARCHAR(80),                      
                                        projdescript4 VARCHAR(200),                      
                                        projurl4 VARCHAR(100),  

                                        projnumber5 VARCHAR(5), 
                                        projchack5 VARCHAR(5),                     
                                        projname5 VARCHAR(80),                      
                                        projdescript5 VARCHAR(200),                      
                                        projurl5 VARCHAR(100),  

                                        projnumber6 VARCHAR(5),
                                        projchack6 VARCHAR(5),                      
                                        projname6 VARCHAR(80),                      
                                        projdescript6 VARCHAR(200),                      
                                        projurl6 VARCHAR(100),  

                                        projnumber7 VARCHAR(5),
                                        projchack7 VARCHAR(5),                      
                                        projname7 VARCHAR(80),                      
                                        projdescript7 VARCHAR(200),                      
                                        projurl7 VARCHAR(100),  

                                        projnumber8 VARCHAR(5), 
                                        projchack8 VARCHAR(5),                     
                                        projname8 VARCHAR(80),                      
                                        projdescript8 VARCHAR(200),                      
                                        projurl8 VARCHAR(100),  

                                        projnumber9 VARCHAR(5), 
                                        projchack9 VARCHAR(5),                     
                                        projname9 VARCHAR(80),                      
                                        projdescript9 VARCHAR(200),                      
                                        projurl9 VARCHAR(100),  

                                        projnumber10 VARCHAR(5),
                                        projchack10 VARCHAR(5),                      
                                        projname10 VARCHAR(80),                      
                                        projdescript10 VARCHAR(200),                      
                                        projurl10 VARCHAR(100)                   
                                        )`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table userssettings created")});