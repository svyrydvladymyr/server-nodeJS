let con = require('../db/connectToDB').con;
let Cookies = require('cookies');
let url = require('url');
let {translit, token, clienttoken} = require('./service');

let searchUser = (req, res) => {
    let searchuser = req.body.searchuser;
    let transl = translit(searchuser);
    let sql = `SELECT U.name, U.surname, U.userid, U.ava, S.avasettings FROM users U INNER JOIN userssettings S on U.userid=S.userid WHERE U.name LIKE '${searchuser}%' OR U.surname LIKE '${searchuser}%' OR U.name LIKE '${transl}%' OR U.surname LIKE '${transl}%' OR U.userid LIKE '${transl}%'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            console.log("--result-seurch---->> ", result);
            res.send(result);
        }
    });
};

let addtofriends = (req, res) => {
    let getuserid, clientToken, userid, addfrienddate;
    getuserid = req.headers.referer;
    userid = url.parse(getuserid, true).pathname.replace('/', '');
    addfrienddate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
    clientToken = clienttoken(req, res);
    console.log("--userid-for-add---->> ",userid);
    let sqlsel = `SELECT userid FROM users WHERE token = '${clientToken}';`;
    con.query(sqlsel, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            let myid = result[0].userid;
            console.log("--my-userid---->> ", result[0].userid);
            let sqlsel = `INSERT INTO friends_${result[0].userid} (userid, friendid, friendstatus, friendvisit, friendadd) VALUES ('${result[0].userid}', '${userid}', 'reqto', '1', '${addfrienddate}');`;
            con.query(sqlsel, function (err, result) {
                if (err) {
                    console.log("err", err.code);
                    if (err.code === 'ER_DUP_ENTRY'){
                        res.send({"error":'ER_DUP_ENTRY'});
                    } else {
                        res.send({"error":err});
                    }
                } else {
                    console.log("--friends-add---->> ", result.affectedRows);        
                    let sqlselto = `INSERT INTO friends_${userid} (userid, friendid, friendstatus, friendvisit, friendadd) VALUES ('${userid}', '${myid}', 'reqfrom', '1', '${addfrienddate}');`;
                    con.query(sqlselto, function (err, result) {
                        if (err) {
                            console.log("err", err.code);
                            if (err.code === 'ER_DUP_ENTRY'){
                                res.send({"error":'ER_DUP_ENTRY'});
                            } else {
                                res.send({"error":err});
                            }
                        } else {
                            console.log("--friends-add---->> ", result.affectedRows);        
                            res.send({"res":result.affectedRows});
                        }
                    }); 
                }
            }); 
        }
    }); 
};

let prooftofriends = (req, res) => {
    let getuserid, clientToken, userid, addfrienddate;
    getuserid = req.headers.referer;
    getuseridlist = req.body.userid;
    getuseridlist === undefined ? userid = url.parse(getuserid, true).pathname.replace('/', '') : userid = getuseridlist;
    addfrienddate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
    clientToken = clienttoken(req, res);
    console.log("--userid-for-add---->> ",userid);
    let sqlsel = `SELECT userid FROM users WHERE token = '${clientToken}';`;
    con.query(sqlsel, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            let myid = result[0].userid;
            console.log("--my-userid---->> ", result[0].userid);
            let sqlsel = `UPDATE friends_${result[0].userid} SET friendstatus = 'friend' WHERE userid = '${result[0].userid}' AND friendid = '${userid}' AND friendstatus = 'reqfrom';`;
            con.query(sqlsel, function (err, result) {
                if (err) {
                    console.log("err", err.code);
                    res.send({"error":err});
                } else {
                    console.log("--friends-proof---->> ", result.affectedRows);        
                    let sqlselto = `UPDATE friends_${userid} SET friendstatus = 'friend' WHERE userid = '${userid}' AND friendid = '${myid}' AND friendstatus = 'reqto';`;
                    con.query(sqlselto, function (err, result) {
                        if (err) {
                            console.log("err", err.code);
                            res.send({"error":err});
                        } else {
                            console.log("--friends-proof---->> ", result.affectedRows);        
                            res.send({"res":result.affectedRows});
                        }
                    }); 
                }
            }); 
        }
    }); 
};

let delfromfriends = (req, res) => {
    let getuserid, clientToken, userid;
    getuserid = req.headers.referer;
    getuseridlist = req.body.userid;
    getuseridlist === undefined ? userid = url.parse(getuserid, true).pathname.replace('/', '') : userid = getuseridlist;
    clientToken = clienttoken(req, res);
    console.log("--userid-for-remove---->> ",userid);
    let sqlsel = `SELECT userid FROM users WHERE token = '${clientToken}';`;
    con.query(sqlsel, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            console.log("--my-userid---->> ", result[0].userid);
            let myid = result[0].userid;
            let sqlsel = `DELETE FROM friends_${result[0].userid} WHERE userid = '${result[0].userid}' AND friendid = '${userid}';`;
            con.query(sqlsel, function (err, result) {
                if (err) {
                    console.log("err", err);
                    res.send({"error":err});
                } else {
                    console.log("--friends-remove---->> ", result.affectedRows);        
                    let sqlsel = `DELETE FROM friends_${userid} WHERE userid = '${userid}' AND friendid = '${myid}';`;
                    con.query(sqlsel, function (err, result) {
                        if (err) {
                            console.log("err", err);
                            res.send({"error":err});
                        } else {
                            console.log("--friends-remove---->> ", result.affectedRows);        
                            res.send({"res":result.affectedRows});
                        }
                    }); 
                }
            }); 
        }
    }); 
};

let showfriends = (req, res) => {
    let getuserid, userid, typesearch, limitsearch, stepsearch, step;
    typesearch = req.body.type;
    limitsearch = req.body.limit;
    stepsearch = req .body.step;
    userurlsearch = req .body.userurl;
    getuserid = req.headers.referer;
    userurlsearch === undefined ? userid = url.parse(getuserid, true).pathname.replace('/', '') : userid = userurlsearch;
    stepsearch === '' ? step = '' : step = `${stepsearch},`;
    console.log("--userid-for-friends---->> ",userid);
    let sqlkilk = `SELECT S.friendid FROM friends_${userid} S INNER JOIN users U ON U.userid=S.userid WHERE S.userid = '${userid}' AND S.friendstatus = '${typesearch}' ORDER BY S.friendvisit + 0 DESC;`;
    let sqlsel = `SELECT U.userid, U.name, U.surname, S.friendid, S.friendvisit, S.friendstatus FROM friends_${userid} S INNER JOIN users U ON U.userid=S.userid WHERE S.userid = '${userid}' AND S.friendstatus = '${typesearch}' ORDER BY S.friendvisit + 0 DESC LIMIT ${step} ${limitsearch};`;
    con.query(sqlkilk, function (err, result) {
        if (err) {
            console.log("--err-get-friends--", err);
        } else {
            console.log("--my-friends-kilk--->> ", result.length);
            let kilk = result.length;
            con.query(sqlsel, function (err, result) {
                if (err) {
                    console.log("--err-get-friends--", err);
                } else {
                    console.log("--my-friends-kilk-show---->> ", result.length);
                    let renameres = result;
                    let kilkfriends = result.length;
                    let masfriends = [];        
                    if (result.length === 0){
                        res.send({"res":"", "myid":"", "name":"", "surname":"", "kilk":"", "status":""});
                    }    
                    for(let i = 1; i <= kilkfriends; i++){
                        let sqlsel = `SELECT userid, name, surname, email, birthday, phone, country, town, profession, education, ava, avasettings FROM users WHERE userid = '${result[i-1].friendid}';`;
                        con.query(sqlsel, function (err, result) {
                            if (err) {
                                console.log("err", err);
                                res.send({"error":err});
                            } else {            
                                if (result[0] !== undefined){
                                    masfriends.push({"friendvisit":renameres[i-1].friendvisit, "userid":result[0].userid, "name":result[0].name, "surname":result[0].surname, "ava":result[0].ava, "avasettings":result[0].avasettings, "email":result[0].email, "birthday":result[0].birthday, "phone":result[0].phone, "country":result[0].country, "town":result[0].town, "profession":result[0].profession, "education":result[0].education})
                                }       
                                if (i === kilkfriends) {
                                    res.send({"res":masfriends, "myid":renameres[0].userid, "name":renameres[0].name, "surname":renameres[0].surname, "kilk":kilk, "status":renameres[0].friendstatus});
                                }
                            }
                        });
                    }
                }
            }); 
        }
    }); 
};

module.exports = {
    addtofriends,
    prooftofriends,
    searchUser,
    delfromfriends,
    showfriends
}