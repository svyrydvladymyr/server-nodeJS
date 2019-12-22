let con = require('../db/connectToDB').con;
let {clienttoken, $_log, readyFullDate, createTableMessage, checkProof, readyAva} = require('./service');

    let sendmessage = (req, res) => {
        let tofriend = req.body.tofriend;
        let messready = req.body.mess.replace(/[^0-9a-zA-Zа-яА-Я-іІїЇєЄ'\"',.;:_\$-\+\/\\\?\#\&\!\=\%\*() \\n]/gi, '');
        console.log("ooooooooooo", messready);
        
        checkProof(req, res, (req, res, userid) => {
            createTableMessage(tofriend); 
            let myid = userid;
            con.query(`SELECT friendid, friendstatus FROM friends_${myid} WHERE friendid = '${tofriend}' AND friendstatus = 'friend'`, (err, result) => {
                if (err) { 
                    $_log('err', err, 'err', res); 
                } else {
                    if (result == ''){ 
                        $_log('err', 'nofriend', 'nofriend', res); 
                    } else {  
                        let datesend = readyFullDate('', 'r');                          
                        let messsqlme = `INSERT INTO message_${myid} (userid, talkwith, messagefrom, message, datesend, readed) 
                                        VALUES ('${myid}', '${tofriend}', 'to', '${messready}', '${datesend}', 'no')`;
                        con.query(messsqlme, (err, result) => {
                            if (err) { 
                                $_log('err', err, 'err', res); 
                            } else {
                                $_log('message-add-me', result.affectedRows);
                                let messsqlfriend = `INSERT INTO message_${tofriend} (userid, talkwith, messagefrom, message, datesend, readed) 
                                                    VALUES ('${tofriend}', '${myid}', 'from', '${messready}', '${datesend}', 'no')`;
                                con.query(messsqlfriend, (err, result) => {
                                    err ? $_log('err', err, 'err', res) : $_log('message-add-friend', result.affectedRows, 'res', res);
                                });
                            };
                        });
                    };
                };
            });
        });
    };

    let messangerlist = (req, res) => {
        checkProof(req, res, (req, res, userid) => {
            let myid = userid;                       
            con.query(`SELECT MAX(M.id), M.talkwith, F.friendid, F.friendstatus
                        FROM message_${myid} M INNER JOIN friends_${myid} F ON M.talkwith=F.friendid
                        WHERE F.friendstatus = 'friend'
                        GROUP BY M.talkwith ORDER BY MAX(M.id) DESC`, (err, result) => {
                if (err) { 
                    $_log('err-find-group', err, 'err', res); 
                } else {
                    if (result == ''){ 
                        $_log('no-mess-to-list', 'nomessage', 'nomessage', res); 
                    } else {                  
                        $_log('messager-list', result.length); 
                        let iter = result.length;
                        let readed=[], noreaded=[], avaurl;
                        for (let i = 0; i < iter; i++) {
                            let sellist = `SELECT U.userid, U.name, U.surname, U.ava, U.avasettings, S.id, S.talkwith, S.messagefrom, S.readed 
                                            FROM users U INNER JOIN message_${myid} S ON U.userid=S.talkwith 
                                            WHERE S.talkwith = '${result[i].talkwith}' AND S.id = '${result[i]["MAX(M.id)"]}'`;
                            con.query(sellist, (err, result) => {
                                if (err) { 
                                    $_log('err-no-mess-list', err, 'err', res); 
                                } else {                              
                                    if (result == ''){ 
                                        if (i == iter-1) { $_log('no-mess-to-list', 'nomess', 'err', res); }                                        
                                    } else {       
                                        let avaurl = readyAva(result[0].ava);  
                                        if ((result[0].readed === 'no') && (result[0].messagefrom === 'from')) {
                                            noreaded.push(`|${result[0].talkwith}, ${result[0].name}, ${result[0].surname}, ${avaurl}, ${result[0].avasettings}, ${result[0].readed}`);
                                        } else {
                                            readed.push(`|${result[0].talkwith}, ${result[0].name}, ${result[0].surname}, ${avaurl}, ${result[0].avasettings}, ${result[0].readed}`);
                                        }                                            
                                        if (i == iter-1) { res.send({"readed": `${readed}`, "noreaded": `${noreaded}`});}                  
                                    };
                                };
                            }); 
                        }
                    };
                };
            });
        });       
    };

    let showmessage = (req, res) => {
        let user = req.body.user;
        checkProof(req, res, (req, res, userid) => {
            let myid = userid; 
            con.query(`SELECT U.userid, U.name, U.surname, U.ava, U.avasettings, F.friendid, F.friendstatus 
                      FROM users U INNER JOIN friends_${myid} F ON U.userid=F.friendid 
                      WHERE U.userid = '${user}' AND F.friendstatus = 'friend'`, (err, result) => {
                if (err) {
                    $_log('err', err, 'err', res); 
                } else {            
                    if (result == ''){ 
                        $_log('err', 'no-mess', 'err', res); 
                    } else {                       
                        let avaurl = readyAva(result[0].ava);
                        res.send({"userid": `${result[0].userid}`, "name": `${result[0].name}`, "surname": `${result[0].surname}`, "ava": `${avaurl}`, "avasettings": `${result[0].avasettings}`, "myid": `${myid}`}); 
                    };
                };
            });
        });  
    };

    let showmess = (req, res) => {
        let user = req.body.user;
        checkProof(req, res, (req, res, userid) => {
            let myid = userid; 
            let dateread = readyFullDate('', 'r');
            con.query(`UPDATE message_${myid} SET readed = 'yes', dateread = '${dateread}' WHERE talkwith = '${user}' AND messagefrom = 'from' AND readed = 'no'`, (err, result) => {
                if (!err) { $_log('status-readed-chenge-me', result.affectedRows);} 
            });
            con.query(`UPDATE message_${user} SET readed = 'yes', dateread = '${dateread}' WHERE talkwith = '${myid}' AND messagefrom = 'to' AND readed = 'no'`, (err, result) => {
                if (!err) { $_log('status-readed-chenge-fr', result.affectedRows);} 
            });
            con.query(`SELECT * FROM message_${myid} WHERE talkwith = '${user}' ORDER BY id DESC LIMIT ${req.body.step}, ${req.body.limit};`, (err, result) => {
                if (err) {
                    $_log('err', err, 'err', res); 
                } else {            
                    if (result == ''){ 
                        $_log('result-kilk-mess', 'no-mess', 'result', res); 
                    } else {    
                        $_log('message-show-kilk', result.length);         
                        res.send({result}); 
                    };
                };
            });
        });  
    };

    let delmess = (req, res) => {
        checkProof(req, res, (req, res, userid) => {
            let myid = userid; 
            let dateread = readyFullDate('', 'r');
            let messid = req.body.messid;
            let who = req.body.who;
            if (who === 'both') {
                con.query(`SELECT talkwith, message FROM message_${myid} WHERE id = '${messid}';`, (err, result) => {
                    if (err) {
                        $_log('err', err, 'err', res); 
                    } else {            
                        if (result == ''){ 
                            $_log('err', 'not-find', 'err', res); 
                        } else {                               
                            con.query(`DELETE FROM message_${myid} WHERE id = '${messid}';`, (err, result) => {
                                err ? $_log('err-del-mess-me', err) : $_log('res-del-mess-me', result.affectedRows); 
                            });
                            con.query(`UPDATE message_${result[0].talkwith} SET message = '', deleted = 'del', datedel = '${dateread}' WHERE message = '${result[0].message}';`, (err, result) => {
                                err ? $_log('err-del-mess-fr', err) : $_log('res-del-mess-fr', result.affectedRows); 
                            });
                            $_log('res-del-mess-me', result.length, 'result', res);
                        };
                    };
                });
            } else if (who === 'me') {
                con.query(`DELETE FROM message_${myid} WHERE id = '${messid}';`, (err, result) => {
                    err ? $_log('err-del-mess-me', err) : $_log('res-del-mess-me', result.affectedRows, 'result', res); 
                });
            } else {
                $_log('err', 'bad-req', 'err', res); 
            }
        });  
    };

    let delallmess = (req, res) => {
        checkProof(req, res, (req, res, userid) => {
            let myid = userid; 
            let dateread = readyFullDate('', 'r');
            let messid = req.body.messid;                  
            con.query(`UPDATE message_${messid} SET message = '', deleted = 'del', datedel = '${dateread}' WHERE talkwith = '${myid}' AND messagefrom = 'from';`, (err, result) => {
                if(err) { $_log('err-del-mess-fr', err) } else { $_log('res-del-mess-fr-kilk', result.affectedRows); }
            });
            con.query(`DELETE FROM message_${myid} WHERE talkwith = '${messid}';`, (err, result) => {
                if(err) { 
                    $_log('err-del-mess-me', err) 
                } else {
                    $_log('res-del-mess-me-kilk', result.affectedRows); 
                    if (result.protocol41 === true) { $_log('res-del-mess-fr', true, 'res', res); }
                }
            });
        });  
    };

    let updatemessnew = (req, res) => {
        checkProof(req, res, (req, res, userid) => {
            let myid = userid; 
            let mesusersid = req.body.messid; 
            let maxid = req.body.maxid; 
            console.log("messid", mesusersid);
            console.log("maxid", maxid);       
            con.query(`SELECT * FROM message_${myid} WHERE talkwith = '${mesusersid}' AND messagefrom = 'from' AND ID > '${maxid}'`, (err, result) => {
                if (err) { 
                    $_log('err-find-group', err, 'err', res); 
                } else {
                    if (result == ''){ 
                        $_log('no-new-mess', 'nomessage', 'nomessage', res); 
                    } else {                  
                        $_log('nem-messager-list', result, 'result', res);
                    };
                };
            });


        });  
    };


module.exports = {
    sendmessage,
    messangerlist,
    showmessage,
    showmess,
    delmess,
    delallmess,
    updatemessnew
}