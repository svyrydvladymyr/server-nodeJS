let con = require('../db/connectToDB').con;
let {clienttoken} = require('./service');
let url = require('url');

let showprojects = (req, res) => {
    let pageurl = url.parse(req.body.userid, true);
    let sliceurl = pageurl.pathname.slice(1, pageurl.pathname.length);
    let sql = `SELECT S.* FROM users U INNER JOIN userprojects S on U.userid=S.userid WHERE S.userid = '${sliceurl}' AND U.userid = '${sliceurl}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"err": err});
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
                        console.log("--projects--",objProj);
                        masskills.push(objProj);    
                    }
                }
                res.send(masskills);
            }
        }        
    });

}

let addprojects = (req, res) => {
    let name, chack, descript, number, projurl;
    let clientToken = clienttoken(req, res);
    name = req.body.name;
    chack = req.body.chacked;
    descript = req.body.descript; 
    number = req.body.number;
    projurl = req.body.projurl;
    let sql = `UPDATE userprojects S INNER JOIN users U ON S.userid = U.userid SET projnumber${number} = '${number}', projchack${number} = '${chack}', projname${number} = '${name}',  projdescript${number} = '${descript}',  projurl${number} = '${projurl}' WHERE U.token = '${clientToken}' `;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"err": err});
        } else {
            if (result.affectedRows === 0){                 
                let sqlproj = `INSERT INTO userprojects (userid) SELECT userid FROM users WHERE token = '${clientToken}'`;
                con.query(sqlproj, function (err, result) {
                    if (err) {
                        console.log("--err--", err);
                        res.send({"error":err});   
                    } else {
                        console.log("--result-registr-project--", result.affectedRows);
                        con.query(sql, function (err, result) {
                            if (err) {
                                console.log("err", err);
                                res.send({"err": err});
                            } else {
                                console.log("--project-added--", result.affectedRows);
                                res.send(result);
                            }
                        });
                    }            
                });
            } else {
                console.log("--skill-project--", result.affectedRows);
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
        if (err) {
            console.log("err", err);
            res.send({"err": err});
        } else {
            console.log("--project-updates--", result.affectedRows);
            res.send({"res":result.affectedRows});
        }        
    });
}

let showprojsingle = (req, res) => {
    let number;
    let clientToken = clienttoken(req, res);
    number = req.body.number;
    let sql = `SELECT S.projnumber${number}, S.projchack${number}, S.projname${number}, S.projdescript${number}, S.projurl${number} FROM users U INNER JOIN userprojects S ON U.userid=S.userid WHERE U.token = '${clientToken}'`;    
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"err": err});
        } else {
            console.log("--projects-get--", result);
            res.send({"res":result, "number":number});
        }        
    });
}

let editproject = (req, res) => {
    let number, name, descript, urlproj;
    let clientToken = clienttoken(req, res);
    number = req.body.number;
    name = req.body.name;
    descript = req.body.descript;
    urlproj = req.body.urlproj;
    let sqlup = `UPDATE userprojects S INNER JOIN users U ON S.userid = U.userid SET projnumber${number} = '${number}', projname${number} = '${name}',  projdescript${number} = '${descript}',  projurl${number} = '${urlproj}'  WHERE U.token = '${clientToken}' `;
    let sql = `SELECT S.projnumber${number}, S.projchack${number}, S.projname${number},  S.projdescript${number},  S.projurl${number} FROM users U INNER JOIN userprojects S ON U.userid=S.userid WHERE U.token = '${clientToken}'`;    
    con.query(sqlup, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"err": err});
        } else {
            console.log("--project-updates--", result.affectedRows);
            con.query(sql, function (err, result) {
                if (err) {
                    console.log("err", err);
                    res.send({"err": err});
                } else {
                    console.log("--project-get--", result);
                    res.send({"res":result, "number":number});
                }        
            });
        }        
    });    
}

let updateallprojects = (req, res) => {
    let name, descript, chack, urlproj;
    let clientToken = clienttoken(req, res);
    name = req.body.name;
    descript = req.body.descript;
    chack = req.body.chack;
    urlproj = req.body.urlproj;
    for (let i = 1; i <= 10; i++){
        let sqlup = `UPDATE userprojects S INNER JOIN users U ON S.userid = U.userid SET projnumber${i} = '${i}', projname${i} = '${name[i-1]}',  projchack${i} = '${chack[i-1]}',  projdescript${i} = '${descript[i-1]}',  projurl${i} = '${urlproj[i-1]}'  WHERE U.token = '${clientToken}' `;
        con.query(sqlup, function (err, result) {
            if (err) {
                console.log("err", err);
                res.send({"err": err});
            } else {
                console.log("--up-projects--", result.affectedRows);
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