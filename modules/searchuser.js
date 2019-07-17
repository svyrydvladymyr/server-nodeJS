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
            console.log("--my-userid---->> ", result[0].userid);
            let sqlsel = `INSERT INTO friends_${result[0].userid} (userid, friendid, friendvisit, friendadd) VALUES ('${result[0].userid}', '${userid}', '1', '${addfrienddate}');`;
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
                    res.send({"res":result.affectedRows});
                }
            }); 
        }
    }); 
};

let delfromfriends = (req, res) => {
    let getuserid, clientToken, userid;
    getuserid = req.headers.referer;
    userid = url.parse(getuserid, true).pathname.replace('/', '');
    clientToken = clienttoken(req, res);
    console.log("--userid-for-remove---->> ",userid);
    let sqlsel = `SELECT userid FROM users WHERE token = '${clientToken}';`;
    con.query(sqlsel, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            console.log("--my-userid---->> ", result[0].userid);
            let sqlsel = `DELETE FROM friends_${result[0].userid} WHERE userid = '${result[0].userid}' AND friendid = '${userid}';`;
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

};

module.exports = {
    addtofriends,
    searchUser,
    delfromfriends
}