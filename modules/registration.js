let con = require('../db/connectToDB').con;
let multer  = require('multer')
let {translit, token} = require('./service');
let Cookies = require('cookies');

class protoUsers{constructor(){ }}
let prUs = new protoUsers();

let checkObjValues = (reg, val, mess, parseObjUsers, res) => {
    if ((parseObjUsers[val] !== '') && (parseObjUsers[val] !== undefined)){
        if (new RegExp(reg, "gi").test(parseObjUsers[val]) == true){
            prUs[val] = parseObjUsers[val];
        } else {
            console.log("--bad-input--", mess);            
            res.status(404).send(mess);
        }
    } else {
        prUs[val] = '';
    }
};

let registrationUsers = (req, res) => {     
    let parseObjUsers = req.body;
    console.log("--client-registr-obj--", parseObjUsers);    
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
                    console.log("--err--", err.sqlMessage);
                    res.send({"error":'duplicate_entry_login'});
                } else if (parseSQLmess === 'email'){
                    console.log("--err--", err.sqlMessage);
                    res.send({"error":'duplicate_entry_email'});
                } else {
                    console.log("--err--", err);
                    res.send({"error":err});
                }             
            } else {
                console.log("--err--", err);
                res.send({"error":err});
            }
        } else {
            con.query(sqlsett, function (err, result) {
                if (err) {
                    console.log("--err--", err);
                    res.send({"error":err});   
                } else {
                    console.log("--result-registr--", result);
                    // res.send(result);
                }
            });
            console.log("--result-registr--", result);
            res.send(result);
        }
    });          
};

//if registration true add ava to DB
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
                    let cookies = new Cookies(req, res);
                    cookies.set('sessionisdd', ``, {maxAge: -1, path: '/'}); 
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

//save settings to DB
let savesett = (req, res) => {
    let clientObg = req.body;
    console.log("--client-obj--", clientObg);
    cookies = new Cookies(req, res);
    clientToken = cookies.get('sessionisdd');
    console.log("--client-token--", clientToken);
    var sqlsel = `SELECT userid FROM users WHERE token = '${clientToken}'`;
    con.query(sqlsel, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send(err);
        }
        console.log("--upd-sett-userid--", result[0].userid);  
        var sqlupt = `UPDATE userssettings 
        SET maincolor = '${clientObg.main}', secondcolor = '${clientObg.second}', bgcolor = '${clientObg.bg}', bordertl = '${clientObg.tl}', bordertr = '${clientObg.tr}', borderbl = '${clientObg.bl}', borderbr = '${clientObg.br}', fonts = '${clientObg.font}', language = '${clientObg.lang}' WHERE userid = '${result[0].userid}'`;
        con.query(sqlupt, function (err, result) {
            if (err) {
                console.log("err", err);
                res.send(err);
            }
            console.log(result.changedRows ," settings updated");
            res.send({});
        }); 
    }); 
};

let updaterender = (req, res) => {
    let cookies, clientToken;
    cookies = new Cookies(req, res, {"keys":['volodymyr']});
    clientToken = cookies.get('sessionisdd', {signed:true});
    console.log("--client-token--", clientToken);
    if (clientToken === undefined){
        permissionAccess = false;
        permissionEdit = false;
        res.render(`nouser`, {
            permissAccess: `${permissionAccess}`,
            permissEdit: `${permissionEdit}`,
            permissName: ``,
            permissSurname: ``,
            permissUserid: ``,
            onindex:`6b 61 6c 63 69 66 65 72`,
            title:``
        });
    } else {
        var sql = `SELECT userid, name, surname, email, birthday, phone, message, country, town, profession FROM users WHERE token = '${clientToken}'`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log("err", err);
                res.send(err);
            }
            console.log("--user-for-update--", result[0]);  
            let phone, phonecod, message, messagecod, country, RC = result[0].country, town;
            phone = result[0].phone.slice(3 ,13);
            phonecod = result[0].phone.slice(result[0].phone.length - result[0].phone.length ,result[0].phone.length - 10);
            message = result[0].message.slice(3 ,13);
            messagecod = result[0].phone.slice(result[0].phone.length - result[0].phone.length ,result[0].phone.length - 10);
            if ((RC === 'Ukraine') || (RC === 'Україна')){
                country = 'ukraine';
            } else if ((RC === 'Russian') || (RC === 'Росія')){
                country = 'russian';
            } else if ((RC === 'Great Britain') || (RC === 'Великобританія')){
                country = 'greatbritain';
            } else if ((RC === 'USA') || (RC === 'Сполучені Штати')){
                country = 'usa';
            } 
            town = translit(result[0].town);        
            res.render(`update`, {
                userid: result[0].userid,
                name: result[0].name,
                surname: result[0].surname,
                email: result[0].email,
                birthday: result[0].birthday,
                phone: phone,
                phonecod: phonecod,
                message: message,
                messagecod: messagecod,
                country: country,
                town: town,
                profession: result[0].profession
            });
        }); 
    }

};

let updateuser = (req, res) => {

};

module.exports = {
    registrationUsers,
    addAvatoDB,
    savesett,
    updaterender,
    updateuser    
};