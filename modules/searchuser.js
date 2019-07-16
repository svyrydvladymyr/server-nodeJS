let con = require('../db/connectToDB').con;
let {translit, token} = require('./service');

let searchUser = (req, res) => {
    let searchuser = req.body.searchuser;
    console.log(searchuser);
    let transl = translit(searchuser);
    console.log(transl);
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

module.exports = searchUser;