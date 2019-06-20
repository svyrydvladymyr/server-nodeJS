let con = require('../db/connectToDB').con;
let {token} = require('./service');
let Cookies = require('cookies');

let autorisation = (req, res) => {
    let cookies = new Cookies(req, res);
    cookies.set('sessionid', 'dfgdffghfghgdg', {maxAge: '', path: '/'}); 
    cookies.set('sessionisdd', 'dfgdffghfghgdg', {maxAge: '', path: '/'}); 

    console.log(req.body);
    console.log(req.body.login);
    console.log(req.body.password);
    let tokenId = token(20);

    // let sql = `UPDATE users SET token = '${tokenId}' WHERE login = '${req.body.login}' AND password = '${req.body.password}'`;
    // con.query(sql, function (err, result) {
    //     if (err) {
    //         console.log("err", err);
    //         res.send({"error":err});
    //     } else {
    //         console.log(result);
    //         let sqlsel = `SELECT userid FROM users WHERE login = '${req.body.login}' AND password = '${req.body.password}'`;
    //         con.query(sqlsel, function (err, result) {
    //             if (err) {
    //                 console.log("err", err);
    //                 res.send({"error":err});
    //             } else {
    //                 console.log(result);
    //                 if (result !== ''){

    //                 }
    //             }
    //         });            
    //     }
    // });

};

module.exports = autorisation;