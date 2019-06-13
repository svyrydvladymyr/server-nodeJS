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

    console.log("objClient---", parseObjUsers);

    prUs.userid = translit(`${parseObjUsers.name}${parseObjUsers.surname}`).toLowerCase() + '-' + token(10);

    checkObjValues("^[0-9-]+$", "registrdata", "Bad registration date!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "login", "Bad login!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "password", "Bad password!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯїЇ]+$", "name", "Bad name!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯїЇ]+$", "surname", "Bad surname!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9@-_.]+$", "email", "Bad email!", parseObjUsers, res);
    checkObjValues("^[0-9-]+$", "birthday", "Bad birthday!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "phone", "Bad phone!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "message", "Bad message!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ-]+$", "country", "Bad country!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІєїЇ-]+$", "town", "Bad town!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-Я-]+$", "profession", "Bad profession!", parseObjUsers, res);            
 
    console.log("obj----", prUs);        

    var sql = `INSERT INTO users (userid, login, password, name, surname, email, birtday, phone, message, country, town, profession) VALUES ('fff', 'fff', 'fff', 'ffff', 'ffff', 'ffff', '2019-09-12', '+380660961462', '+380660961462', 'ffff', 'fffff', 'ffff')`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send(err);
        }
            console.log(result);
        }
    );            
            
};

let addAvatoDB = (req, res) => {
    let storage, upload;
    storage = multer.diskStorage({
        destination: (req, file, cb) => {cb(null, +__dirname+"/../uploads")},
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
            } else {
                prUs.ava = '';
                prUs.avasettings = '';
            }

            console.log("obj----", prUs);  
        }
    });

    


};


module.exports = {
    registrationUsers,
    addAvatoDB
    
};