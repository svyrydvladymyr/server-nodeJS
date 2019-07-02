let con = require('../db/connectToDB').con;
let {translit, token} = require('./service');
let url = require('url');
let Cookies = require('cookies');

class protoUsers{constructor(){ }}
let prUs = new protoUsers();

let showskills = (req, res) => {
    let cookies, clientToken;
    cookies = new Cookies(req, res, {"keys":['volodymyr']});
    clientToken = cookies.get('sessionisdd', {signed:true});
    console.log("--client-token--", clientToken);
    if ((clientToken === '') || (clientToken === undefined)){
        let pageurl = url.parse(req.body.userid, true);
        let sliceurl = pageurl.pathname.slice(1, pageurl.pathname.length);
        let sql = `SELECT S.* FROM users U INNER JOIN userskills S on U.userid=S.userid WHERE U.userid = '${sliceurl}' AND S.userid = '${sliceurl}'`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log("err", err);
                res.send({"err": err});
            } else {
                if (result != ''){
                    let num, chack, name, level, masskills = [], objSkills; 
                    for (let i = 1; i <= 10; i++){                
                        num = result[0][`skillnumber${i}`];
                        chack = result[0][`skillchack${i}`];
                        name = result[0][`skill${i}`];
                        level = result[0][`skilllevel${i}`];
                        if ((num !== null) && (chack !== null) && (name !== null) && (level !== null)){
                            objSkills = `[${num}, ${chack}, ${name}, ${level}]`;
                            console.log("--skill--",objSkills);
                            masskills.push(objSkills);    
                        }
                    }
                    res.send(masskills);       
                }      
            }        
        });
    } else {
        let sql = `SELECT S.* FROM users U INNER JOIN userskills S on U.userid=S.userid WHERE U.token = '${clientToken}'`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log("err", err);
                res.send({"err": err});
            } else {
                if (result != ''){
                    let num, chack, name, level, masskills = [], objSkills; 
                    for (let i = 1; i <= 10; i++){                
                        num = result[0][`skillnumber${i}`];
                        chack = result[0][`skillchack${i}`];
                        name = result[0][`skill${i}`];
                        level = result[0][`skilllevel${i}`];
                        if ((num !== null) && (chack !== null) && (name !== null) && (level !== null)){
                            objSkills = `[${num}, ${chack}, ${name}, ${level}]`;
                            console.log("--skill--",objSkills);
                            masskills.push(objSkills);    
                        }
                    }
                    res.send(masskills);
                }
            }        
        });
    }
}

let addskills = (req, res) => {
    let cookies, clientToken, name, chack, level, number;
    cookies = new Cookies(req, res, {"keys":['volodymyr']});
    clientToken = cookies.get('sessionisdd', {signed:true});
    console.log("--client-token--", clientToken);
    name = req.body.name;
    chack = req.body.chacked;
    level = req.body.level;
    number = req.body.number;
    let sql = `UPDATE userskills S INNER JOIN users U ON S.userid = U.userid SET skillnumber${number} = '${number}', skillchack${number} = '${chack}', skill${number} = '${name}',  skilllevel${number} = '${level}' WHERE U.token = '${clientToken}' `;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"err": err});
        } else {
            if (result.affectedRows === 0){                 
                let sqlskills = `INSERT INTO userskills (userid) SELECT userid FROM users WHERE token = '${clientToken}'`;
                con.query(sqlskills, function (err, result) {
                    if (err) {
                        console.log("--err--", err);
                        res.send({"error":err});   
                    } else {
                        console.log("--result-registr-skills--", result.affectedRows);
                        con.query(sql, function (err, result) {
                            if (err) {
                                console.log("err", err);
                                res.send({"err": err});
                            } else {
                                console.log("--skill-added--", result.affectedRows);
                                res.send(result);
                            }
                        });
                    }            
                });
            } else {
                console.log("--skill-added--", result.affectedRows);
                res.send(result);
            }
        }        
    });
};

module.exports = {
    showskills,
    addskills
};