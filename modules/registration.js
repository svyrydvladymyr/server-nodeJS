let con = require('../db/connectToDB').con;
let multer  = require('multer')
let {translit, token} = require('./service');



class protoUsers{constructor(){ }}
let prUs = new protoUsers();

let checkObjValues = (reg, val, mess, parseObjUsers, res) => {
    if ((parseObjUsers[val] !== '') && (parseObjUsers[val] !== undefined)){
        if (new RegExp(reg, "gi").test(parseObjUsers[val]) == true){
            prUs[val] = parseObjUsers[val];
        } else {
            res.status(404).send(mess);
        }
    } else {
        prUs[val] = '';
    }
};

let registrationUsers = (req, res) => {     
    let parseObjUsers = req.body;
    prUs.userid = translit(`${parseObjUsers.surname}${parseObjUsers.name}`).toLowerCase() + '-' + token(10);
    checkObjValues("^[0-9-]+$", "registrdata", "Bad registration date!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "login", "Bad login!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "password", "Bad password!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ]+$", "name", "Bad name!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ]+$", "surname", "Bad surname!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9@-_.]+$", "email", "Bad email!", parseObjUsers, res);
    checkObjValues("^[0-9-]+$", "birthday", "Bad birthday!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "phone", "Bad phone!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "message", "Bad message!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ-]+$", "country", "Bad country!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІєїЇ-]+$", "town", "Bad town!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ ]+$", "profession", "Bad profession!", parseObjUsers, res);     
    let sql = `INSERT INTO users (userid, login, password, name, surname, email, birthday, phone, message, country, town, profession, registrdata) 
               VALUES ('${prUs.userid}', '${prUs.login}', '${prUs.password}', '${prUs.name}', '${prUs.surname}', '${prUs.email}', '${prUs.birthday}', '${prUs.phone}', '${prUs.message}', '${prUs.country}', '${prUs.town}', '${prUs.profession}', '${prUs.registrdata}')`;
    let sqlsett = `INSERT INTO userssettings (userid) VALUES ('${prUs.userid}')`;
    con.query(sql, function (err, result) {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY'){
                let parseSQLmess = err.sqlMessage.slice(err.sqlMessage.length - 6,  err.sqlMessage.length - 1);
                if (parseSQLmess === 'login'){
                    console.log("err", err.sqlMessage);
                    res.send({"error":'duplicate_entry_login'});
                } else if (parseSQLmess === 'email'){
                    console.log("err", err.sqlMessage);
                    res.send({"error":'duplicate_entry_email'});
                } else {
                    console.log("err", err);
                    res.send({"error":err});
                }             
            } else {
                console.log("err", err);
                res.send({"error":err});
            }
        } else {
            con.query(sqlsett, function (err, result) {
                if (err) {
                    console.log("err", err);
                    res.send({"error":err});   
                } else {
                    console.log(result);
                    // res.send(result);
                }
            });
            console.log(result);
            res.send(result);
        }
    });          
};

let addAvatoDB = (req, res) => {
    let storage, upload;
    storage = multer.diskStorage({
        destination: (req, file, cb) => {cb(null, +__dirname+"/../public/uploads")},
        filename: (req, file, cb) => {
          if (req.file === undefined){
            cb(null, token(10) +'_'+  file.originalname);
          }
        }});     
    upload = multer({ storage: storage }).single('file');
    upload(req, res, (err) => {
        if (err) {
            console.log("err", err);
            res.send(err);
        } else {   
            let parseAvasettings = JSON.parse(req.body.objreg);    
            if (req.file !== undefined){
                prUs.ava = req.file.filename;
                prUs.avasettings = parseAvasettings.avasettings;
                var sql = `UPDATE users SET ava = '${prUs.ava}' WHERE userid = '${prUs.userid}'`;
                var sqlsett = `UPDATE userssettings SET avasettings = '${prUs.avasettings}' WHERE userid = '${prUs.userid}'`;
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log("err", err);
                        res.send(err);
                    }
                    con.query(sqlsett, function (err, result) {
                        if (err) {
                            console.log("err", err);
                            res.send(err);
                        }
                        console.log(result.affectedRows + " foto updated");
                        // res.send({"result":result, "userid":prUs.userid});
                    }); 
                    console.log(result.affectedRows + " foto updated");
                    res.send({"result":result, "userid":prUs.userid});
                }); 
            } else {
                prUs.ava = '';
                prUs.avasettings = '';
                res.send({"result":"ava_no"});
            }
        }
    });  
};


module.exports = {
    registrationUsers,
    addAvatoDB
    
};