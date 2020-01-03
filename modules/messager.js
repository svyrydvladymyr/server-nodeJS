let con = require('../db/connectToDB').con;
let {clienttoken, $_log, readyFullDate, createTableMessage, checkProof, readyAva, sqlquery} = require('./service');

    let sendmessage = (req, res) => {
        let tofriend = req.body.tofriend;
        let messready = req.body.mess.replace(/[^0-9a-zA-Zа-яА-Я-іІїЇєЄ'\"',.;:_\$-\+\/\\\?\#\&\!\=\%\*() \\n]/gi, '');
        checkProof(req, res, (req, res, userid) => {
            createTableMessage(tofriend); 
            let myid = userid;
            let sql = `SELECT friendid, friendstatus FROM friends_${myid} WHERE friendid = '${tofriend}' AND friendstatus = 'friend'`;
            sqlquery(req, res, sql, 'err-req-check-on-fr', 'nofriend', (req, res, result) => {
                let datesend = readyFullDate('', 'r');                          
                let sql = `INSERT INTO message_${myid} (userid, talkwith, messagefrom, message, datesend, readed) 
                           VALUES ('${myid}', '${tofriend}', 'to', '${messready}', '${datesend}', 'no')`;
                sqlquery(req, res, sql, 'err-send-mess-me', 'no-add-mess-me', (req, res, result) => {
                    $_log('message-add-me', result.affectedRows);
                    let sql = `INSERT INTO message_${tofriend} (userid, talkwith, messagefrom, message, datesend, readed) 
                               VALUES ('${tofriend}', '${myid}', 'from', '${messready}', '${datesend}', 'no')`;
                    sqlquery(req, res, sql, 'err-send-mess-fr', 'no-add-mess-fr', (req, res, result) => {
                        $_log('message-add-friend', result.affectedRows, 'res', res);
                    });
                });
            });
        });
    };

    let messangerlist = (req, res) => {
        checkProof(req, res, (req, res, userid) => {
            let myid = userid;     
            let sql = `SELECT MAX(M.id), M.talkwith, F.friendid, F.friendstatus FROM message_${myid} M INNER JOIN friends_${myid} F ON M.talkwith=F.friendid
                       WHERE F.friendstatus = 'friend' GROUP BY M.talkwith ORDER BY MAX(M.id) DESC`;
            sqlquery(req, res, sql, 'err-find-group', 'no-mess-to-list', (req, res, result) => {
                $_log('messager-list', result.length); 
                let iter = result.length, readed=[], noreaded=[];
                for (let i = 0; i < iter; i++) {
                    let sql = `SELECT U.userid, U.name, U.surname, U.ava, U.avasettings, S.id, S.talkwith, S.messagefrom, S.readed 
                               FROM users U INNER JOIN message_${myid} S ON U.userid=S.talkwith WHERE S.talkwith = '${result[i].talkwith}' AND S.id = '${result[i]["MAX(M.id)"]}'`;
                    sqlquery(req, res, sql, 'err-no-mess-list', undefined, (req, res, result) => {     
                        let avaurl = readyAva(result[0].ava);  
                        if ((result[0].readed === 'no') && (result[0].messagefrom === 'from')) {
                            noreaded.push(`|${result[0].talkwith}, ${result[0].name}, ${result[0].surname}, ${avaurl}, ${result[0].avasettings}, ${result[0].readed}`);
                        } else {
                            readed.push(`|${result[0].talkwith}, ${result[0].name}, ${result[0].surname}, ${avaurl}, ${result[0].avasettings}, ${result[0].readed}`);
                        }                                            
                        if (i == iter-1) { res.send({"readed": `${readed}`, "noreaded": `${noreaded}`});}                
                    }); 
                };
            });
        });       
    };

    let showmessage = (req, res) => {
        let user = req.body.user;
        checkProof(req, res, (req, res, userid) => {
            let myid = userid; 
            let sql = `SELECT U.userid, U.name, U.surname, U.ava, U.avasettings, F.friendid, F.friendstatus 
                       FROM users U INNER JOIN friends_${myid} F ON U.userid=F.friendid WHERE U.userid = '${user}' AND F.friendstatus = 'friend'`;
            sqlquery(req, res, sql, 'err-find-mess', 'no-mess', (req, res, result) => {                    
                        let avaurl = readyAva(result[0].ava);
                        res.send({"userid": `${result[0].userid}`, "name": `${result[0].name}`, "surname": `${result[0].surname}`, "ava": `${avaurl}`, "avasettings": `${result[0].avasettings}`, "myid": `${myid}`}); 
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
            let sql = `SELECT * FROM message_${myid} WHERE talkwith = '${user}' ORDER BY id DESC LIMIT ${req.body.step}, ${req.body.limit};`;
            sqlquery(req, res, sql, 'err-find-mess', 'no-mess', (req, res, result) => {  
                $_log('message-show-kilk', result.length);         
                res.send({result}); 
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
                let sql = `SELECT talkwith, message FROM message_${myid} WHERE id = '${messid}';`;
                sqlquery(req, res, sql, 'err-del-mess', 'err-del-mess', (req, res, result) => {                               
                    con.query(`DELETE FROM message_${myid} WHERE id = '${messid}';`, (err, result) => {
                        err ? $_log('err-del-mess-me', err) : $_log('res-del-mess-me', result.affectedRows); 
                    });
                    con.query(`UPDATE message_${result[0].talkwith} SET message = '', deleted = 'del', datedel = '${dateread}' WHERE message = '${result[0].message}';`, (err, result) => {
                        err ? $_log('err-del-mess-fr', err) : $_log('res-del-mess-fr', result.affectedRows); 
                    });
                    $_log('res-del-mess-me', result.length, 'result', res);
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
            let sqlfr = `UPDATE message_${req.body.messid} SET message = '', deleted = 'del', datedel = '${readyFullDate('', 'r')}' WHERE talkwith = '${userid}' AND messagefrom = 'from';`;
            sqlquery(req, res, sqlfr, 'err-del-mess-fr', undefined, (req, res, result) => {
                $_log('res-del-mess-fr-kilk', result.affectedRows); 
            });
            let sqlme = `DELETE FROM message_${userid} WHERE talkwith = '${req.body.messid}';`;
            sqlquery(req, res, sqlme, 'err-del-mess-me', undefined, (req, res, result) => {
                $_log('res-del-mess-me-kilk', result.affectedRows); 
                if (result.protocol41 === true) { $_log('res-del-mess-fr', true, 'res', res); }
            });
        });  
    };

    let updatemessnew = (req, res) => {
        checkProof(req, res, (req, res, userid) => { 
            let sql = `SELECT * FROM message_${userid} WHERE talkwith = '${req.body.messid}' AND messagefrom = 'from' AND ID > '${req.body.maxid}'`;
            sqlquery(req, res, sql, 'err-find-messnew', 'nomessagenew', (req, res, result) => { 
                $_log('nem-messager-list', result, 'result', res);        
            });
        });  
    };

    let messangernewkilk = (req, res) => {
        checkProof(req, res, (req, res, userid) => {
            let myid = userid, masmessid = [];
            let sql = `SELECT MAX(M.id), M.talkwith, F.friendid, F.friendstatus FROM message_${myid} M INNER JOIN friends_${myid} F ON M.talkwith=F.friendid
                       WHERE F.friendstatus = 'friend' GROUP BY M.talkwith ORDER BY MAX(M.id) DESC`;
            sqlquery(req, res, sql, 'err-find-groupnew', undefined, (req, res, result) => { 
                $_log('messager-list-new-kilk', result.length); 
                let ress = result, iter = result.length, kilk = 0, dzin = 0;
                for (let i = 0; i < iter; i++) {                    
                    let sql = `SELECT talkwith FROM message_${myid} WHERE talkwith = '${ress[i].talkwith}' AND id = '${ress[i]["MAX(M.id)"]}' AND readed = 'no' AND messagefrom = 'from'`;
                    sqlquery(req, res, sql, 'mess-kilk-new-mess', undefined, (req, res, result) => {            
                        if (result.length !== 0) { 
                            kilk++; 
                            masmessid.push(result[0].talkwith);
                        }
                        let sql = `SELECT readed FROM message_${myid} WHERE talkwith = '${ress[i].talkwith}' AND id = '${ress[i]["MAX(M.id)"]}' AND readed = 'no' AND messagefrom = 'from' AND dzin != 'yes'`;
                        sqlquery(req, res, sql, 'mess-kilk-new-mess-dzin', undefined, (req, res, result) => {                             
                            if (result.length !== 0) { dzin++ }; 
                            if (i == iter-1) { 
                                con.query(`UPDATE message_${myid} SET dzin = 'yes' WHERE talkwith = '${ress[i].talkwith}' AND readed = 'no' AND messagefrom = 'from'`, (err, result) => {}); 
                                res.send({"noreadedkilk": `${kilk}`, "noreadeddzin": `${dzin}`, "masid": `${masmessid}`});
                            } 
                        }, 'noerr');                            
                    }, 'noerr');                        
                };
            }, 'noerr');
        });  
    };


module.exports = {
    sendmessage,
    messangerlist,
    showmessage,
    showmess,
    delmess,
    delallmess,
    updatemessnew,
    messangernewkilk
}