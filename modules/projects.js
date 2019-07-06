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

// let addskills = (req, res) => {
//     let name, chack, level, number;
//     let clientToken = clienttoken(req, res);
//     name = req.body.name;
//     chack = req.body.chacked;
//     level = req.body.level; 
//     number = req.body.number;
//     let sql = `UPDATE userskills S INNER JOIN users U ON S.userid = U.userid SET skillnumber${number} = '${number}', skillchack${number} = '${chack}', skill${number} = '${name}',  skilllevel${number} = '${level}' WHERE U.token = '${clientToken}' `;
//     con.query(sql, function (err, result) {
//         if (err) {
//             console.log("err", err);
//             res.send({"err": err});
//         } else {
//             if (result.affectedRows === 0){                 
//                 let sqlskills = `INSERT INTO userskills (userid) SELECT userid FROM users WHERE token = '${clientToken}'`;
//                 con.query(sqlskills, function (err, result) {
//                     if (err) {
//                         console.log("--err--", err);
//                         res.send({"error":err});   
//                     } else {
//                         console.log("--result-registr-skills--", result.affectedRows);
//                         con.query(sql, function (err, result) {
//                             if (err) {
//                                 console.log("err", err);
//                                 res.send({"err": err});
//                             } else {
//                                 console.log("--skill-added--", result.affectedRows);
//                                 res.send(result);
//                             }
//                         });
//                     }            
//                 });
//             } else {
//                 console.log("--skill-added--", result.affectedRows);
//                 res.send(result);
//             }
//         }        
//     });
// };

// let showorhiddenskills = (req, res) => {
//     let chack, number;
//     let clientToken = clienttoken(req, res);
//     chack = req.body.chack;
//     number = req.body.number;
//     let sql = `UPDATE userskills S INNER JOIN users U ON S.userid = U.userid SET skillchack${number} = '${chack}' WHERE U.token = '${clientToken}' `;
//     con.query(sql, function (err, result) {
//         if (err) {
//             console.log("err", err);
//             res.send({"err": err});
//         } else {
//             console.log("--skill-updates--", result.affectedRows);
//             res.send({"res":result.affectedRows});
//         }        
//     });
// }

// let showskillsingle = (req, res) => {
//     let number;
//     let clientToken = clienttoken(req, res);
//     number = req.body.number;
//     let sql = `SELECT S.skillnumber${number}, S.skillchack${number}, S.skill${number},  S.skilllevel${number} FROM users U INNER JOIN userskills S ON U.userid=S.userid WHERE U.token = '${clientToken}'`;    
//     con.query(sql, function (err, result) {
//         if (err) {
//             console.log("err", err);
//             res.send({"err": err});
//         } else {
//             console.log("--skill-get--", result);
//             res.send({"res":result, "number":number});
//         }        
//     });
// }

// let editskill = (req, res) => {
//     let number, name, level;
//     let clientToken = clienttoken(req, res);
//     number = req.body.number;
//     name = req.body.name;
//     level = req.body.level;
//     let sqlup = `UPDATE userskills S INNER JOIN users U ON S.userid = U.userid SET skill${number} = '${name}',  skilllevel${number} = '${level}'  WHERE U.token = '${clientToken}' `;
//     let sql = `SELECT S.skillnumber${number}, S.skillchack${number}, S.skill${number},  S.skilllevel${number} FROM users U INNER JOIN userskills S ON U.userid=S.userid WHERE U.token = '${clientToken}'`;    
//     con.query(sqlup, function (err, result) {
//         if (err) {
//             console.log("err", err);
//             res.send({"err": err});
//         } else {
//             console.log("--skill-updates--", result.affectedRows);
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     console.log("err", err);
//                     res.send({"err": err});
//                 } else {
//                     console.log("--skill-get--", result);
//                     res.send({"res":result, "number":number});
//                 }        
//             });
//         }        
//     });    
// }

// let updateallskill = (req, res) => {
//     let name, level, chack;
//     let clientToken = clienttoken(req, res);
//     name = req.body.name;
//     level = req.body.level;
//     chack = req.body.chack;
//     for (let i = 1; i <= 10; i++){
//         let sqlup = `UPDATE userskills S INNER JOIN users U ON S.userid = U.userid SET skillnumber${i} = '${i}', skill${i} = '${name[i-1]}',  skillchack${i} = '${chack[i-1]}',  skilllevel${i} = '${level[i-1]}'  WHERE U.token = '${clientToken}' `;
//         con.query(sqlup, function (err, result) {
//             if (err) {
//                 console.log("err", err);
//                 res.send({"err": err});
//             } else {
//                 console.log("--up-skill--", result.affectedRows);
//                 if (i ===10){
//                     res.send({"res":"skill-del"});
//                 }
//             }        
//         });
//     }  
// }


module.exports = {
    showprojects
    // addskills,
    // showorhiddenskills,
    // showskillsingle,
    // editskill,
    // updateallskill
};