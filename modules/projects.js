let con = require('../db/connectToDB').con;
let {clienttoken, checOnTrueVal, $_log} = require('./service');
let url = require('url');

let showprojects = (req, res) => {
    let pageurl = url.parse(req.body.userid, true);
    let sliceurl = pageurl.pathname.slice(1, pageurl.pathname.length);
    let sql = `SELECT S.* FROM users U INNER JOIN userprojects S on U.userid=S.userid WHERE S.userid = '${sliceurl}' AND U.userid = '${sliceurl}'`;
    con.query(sql, function (err, result) {
        if (err) {
            $_log('err', err, 'err', res);
        } else {
            if (result != ''){
                let num, descript, name, prurl, chack, masskills = [], objProj; 
                for (let i = 1; i <= 10; i++){                
                    num = result[0][`projnumber${i}`];
                    chack = result[0][`projchack${i}`];
                    name = result[0][`projname${i}`];
                    descript = result[0][`projdescript${i}`];
                    prurl = result[0][`projurl${i}`];
                    if (((name !== 'null') && (descript !== 'null') && (prurl !== 'null')) && ((name !== null) && (descript !== null) && (prurl !== null))){
                        objProj = `[${num}, ${chack}, ${name}, ${descript}, ${prurl}]`;
                        $_log('projects', objProj);
                        masskills.push(objProj);    
                    }
                }
                res.send(masskills);
            }
        }        
    });
}

let addprojects = (req, res) => {
    let name, nameObj, chack, descript, descriptObj, number, projurl, projurlObj;
    let clientToken = clienttoken(req, res);
    nameObj = req.body.name;
    name = checOnTrueVal(nameObj);
    chack = req.body.chacked;
    descriptObj = req.body.descript; 
    descript = checOnTrueVal(descriptObj);
    number = req.body.number;
    projurlObj = req.body.projurl;
    projurl = checOnTrueVal(projurlObj);
    let sql = `UPDATE userprojects S INNER JOIN users U ON S.userid = U.userid SET projnumber${number} = '${number}', projchack${number} = '${chack}', projname${number} = '${name}',  projdescript${number} = '${descript}',  projurl${number} = '${projurl}' WHERE U.token = '${clientToken}' `;
    con.query(sql, function (err, result) {
        if (err) {
            $_log('err', err, 'err', res);
        } else {
            if (result.affectedRows === 0){                 
                let sqlproj = `INSERT INTO userprojects (userid) SELECT userid FROM users WHERE token = '${clientToken}'`;
                con.query(sqlproj, function (err, result) {
                    if (err) {
                        $_log('err', err, 'error', res);
                    } else {
                        $_log('result-registr-project', result.affectedRows);
                        con.query(sql, function (err, result) {
                            if (err) {
                                $_log('err', err, 'err', res);
                            } else {
                                $_log('project-added', result.affectedRows);
                                res.send(result);
                            }
                        });
                    }            
                });
            } else {
                $_log('project-add', result.affectedRows);
                res.send(result);
            }
        }        
    });
};

let showorhiddenproj = (req, res) => {
    let chack, number;
    let clientToken = clienttoken(req, res);
    chack = req.body.chack;
    number = req.body.number;
    let sql = `UPDATE userprojects S INNER JOIN users U ON S.userid = U.userid SET projchack${number} = '${chack}' WHERE U.token = '${clientToken}' `;
    con.query(sql, function (err, result) {
        (err) ? $_log('err', err, 'err', res) : $_log('project-updates', result.affectedRows, "res", res);        
    });
}

let showprojsingle = (req, res) => {
    let number;
    let clientToken = clienttoken(req, res);
    number = req.body.number;
    let sql = `SELECT S.projnumber${number}, S.projchack${number}, S.projname${number}, S.projdescript${number}, S.projurl${number} FROM users U INNER JOIN userprojects S ON U.userid=S.userid WHERE U.token = '${clientToken}'`;    
    con.query(sql, function (err, result) {
        if (err) {
            $_log('err', err, 'err', res);
        } else {
            $_log('projects-get', result);
            res.send({"res":result, "number":number});
        }        
    });
}

let editproject = (req, res) => {
    let number,  name, nameObj, descript, descriptObj, urlproj, urlprojObj;
    let clientToken = clienttoken(req, res);
    number = req.body.number;
    nameObj = req.body.name;
    name = checOnTrueVal(nameObj);
    descriptObj = req.body.descript;
    descript = checOnTrueVal(descriptObj);
    urlprojObj = req.body.urlproj;
    urlproj = checOnTrueVal(urlprojObj);
    let sqlup = `UPDATE userprojects S INNER JOIN users U ON S.userid = U.userid SET projnumber${number} = '${number}', projname${number} = '${name}',  projdescript${number} = '${descript}',  projurl${number} = '${urlproj}'  WHERE U.token = '${clientToken}' `;
    let sql = `SELECT S.projnumber${number}, S.projchack${number}, S.projname${number},  S.projdescript${number},  S.projurl${number} FROM users U INNER JOIN userprojects S ON U.userid=S.userid WHERE U.token = '${clientToken}'`;    
    con.query(sqlup, function (err, result) {
        if (err) {
            $_log('err', err, 'err', res);
        } else {
            $_log('project-updates', result.affectedRows);
            con.query(sql, function (err, result) {
                if (err) {
                    $_log('err', err, 'err', res);
                } else {
                    $_log('project-get', result);
                    res.send({"res":result, "number":number});
                }        
            });
        }        
    });    
}

let updateallprojects = (req, res) => {
    let name, descript, chack, urlproj;
    let clientToken = clienttoken(req, res);
    chack = req.body.chack;
    name = req.body.name;    
    descript = req.body.descript;
    urlproj = req.body.urlproj;
    for (let i = 1; i <= 10; i++){
        let sqlup = `UPDATE userprojects S INNER JOIN users U ON S.userid = U.userid SET projnumber${i} = '${i}', projname${i} = '${name[i-1]}',  projchack${i} = '${chack[i-1]}',  projdescript${i} = '${descript[i-1]}',  projurl${i} = '${urlproj[i-1]}'  WHERE U.token = '${clientToken}' `;
        con.query(sqlup, function (err, result) {
            if (err) {
                $_log('err', err, 'err', res);
            } else {
                $_log('up-projects', result.affectedRows);
                if (i === 10){
                    res.send({"res":"project-del"});
                }
            }        
        });
    }  
}

module.exports = {
    showprojects,
    addprojects,
    showorhiddenproj,
    editproject,
    showprojsingle,
    updateallprojects
};