let con = require('../db/connectToDB').con;
let {token} = require('./service');
let Cookies = require('cookies');

let autorisation = (req, res) => {
    let tokenId = token(20);
    console.log("--token--", tokenId);
    let sql = `UPDATE users SET token = '${tokenId}' WHERE login = '${req.body.login}' AND password = '${req.body.password}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            console.log("--result-autoriz--",result.changedRows);
            if (result.changedRows === 0){
                let cookies = new Cookies(req, res, {"keys":['volodymyr']});
                let param = {
                    maxAge: '-1', 
                    path: '/', 
                    signed:true}
                cookies.set('sessionisdd', ``, param); 
                res.send({"err":"false"});
            } else {
                let sqlsel = `SELECT U.userid, S.maincolor, S.secondcolor, S.bgcolor, S.bordertl, S.bordertr, S.borderbl, S.borderbr, S.fonts, S.language FROM users U INNER JOIN userssettings S on U.userid=S.userid WHERE U.login = '${req.body.login}' AND U.password = '${req.body.password}'`;
                con.query(sqlsel, function (err, result) {
                    if (err) {
                        console.log("err", err);
                        res.send({"error":err});
                    } else {
                        console.log("--result-userSett--", result);
                        let cookies = new Cookies(req, res, {"keys":['volodymyr']});
                        let param = {
                            maxAge: '', 
                            path: '/', 
                            signed:true}
                        cookies.set('sessionisdd', `${tokenId}`, param); 
                        res.send({"res":result[0]});
                    }
                }); 
            }           
        }
    });
};

let exit = (req, res) => {
    let cookies = new Cookies(req, res, {"keys":['volodymyr']});
    let param = {
        maxAge: '-1', 
        path: '/', 
        signed:true}
    cookies.set('sessionisdd', ``, param); 
    res.send({"exit":"exit"});
};

module.exports = {
    autorisation,
    exit
};