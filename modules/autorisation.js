let con = require('../db/connectToDB').con;
let {token} = require('./service');
let Cookies = require('cookies');

let autorisation = (req, res) => {
    let tokenId = token(20);
    console.log(tokenId);
    let sql = `UPDATE users SET token = '${tokenId}' WHERE login = '${req.body.login}' AND password = '${req.body.password}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            console.log("token--",result.changedRows);
            if (result.changedRows === 0){
                let cookies = new Cookies(req, res);
                cookies.set('sessionisdd', ``, {maxAge: -1, path: '/'}); 
                res.send({"err":false});
            } else {
                let sqlsel = `SELECT userid FROM users WHERE login = '${req.body.login}' AND password = '${req.body.password}'`;
                con.query(sqlsel, function (err, result) {
                    if (err) {
                        console.log("err", err);
                        res.send({"error":err});
                    } else {
                        console.log(result);
                        let cookies = new Cookies(req, res);
                        cookies.set('sessionisdd', `${tokenId}`, {maxAge: '', path: '/'}); 
                        res.send({"res":result[0].userid});
                    }
                }); 
            }           
        }
    });
};

let exit = (req, res, next) => {
    let cookies = new Cookies(req, res);
    cookies.set('sessionisdd', ``, {maxAge: -1, path: '/'}); 
    res.render(`nouser`);
    next();
}

module.exports = {
    autorisation,
    exit
};