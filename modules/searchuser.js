let con = require('../db/connectToDB').con;
let {translit, token} = require('./service');

let searchUser = (req, res) => {
    let searchuser = req.body.searchuser;
    console.log(searchuser);
    let transl = translit(searchuser);
    console.log(transl);
    let sql = `SELECT name, surname, userid, ava, avasettings FROM users WHERE name LIKE '${searchuser}%' OR surname LIKE '${searchuser}%' OR name LIKE '${transl}%' OR surname LIKE '${transl}%' OR userid LIKE '${transl}%'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            console.log(result);
            res.send(result);
        }
    });
}


module.exports = searchUser;