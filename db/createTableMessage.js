let con = require('./connectToDB').con;
let sql = `CREATE TABLE message_nnnnnnnn_glmjlVgdMs (id INT AUTO_INCREMENT PRIMARY KEY,
                                userid VARCHAR(100),
                                talkwith VARCHAR(100),
                                messagefrom VARCHAR(10),
                                message VARCHAR(255),
                                datesend DATE,
                                readed VARCHAR(6),
                                dateread DATE,
                                edited VARCHAR(6),
                                dateedit DATE,
                                deleted VARCHAR(6),
                                datedel DATE,                          
                                )`;            
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table message created")});