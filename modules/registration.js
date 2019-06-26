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
                let sql = `UPDATE users SET ava = '${prUs.ava}' WHERE userid = '${prUs.userid}'`;
                let sqlsett = `UPDATE userssettings SET avasettings = '${prUs.avasettings}' WHERE userid = '${prUs.userid}'`;
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
    let sqlsel = `SELECT userid FROM users WHERE token = '${clientToken}'`;
    con.query(sqlsel, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send(err);
        }
        console.log("--upd-sett-userid--", result[0].userid);  
        let sqlupt = `UPDATE userssettings 
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
        let sql = `SELECT userid, name, surname, email, birthday, phone, message, country, town, profession FROM users WHERE token = '${clientToken}'`;
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
            messagecod = result[0].message.slice(result[0].message.length - result[0].message.length ,result[0].message.length - 10);
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

let updatesecurity = (req, res) => {
    let cookies, clientToken, parseObjUsers, sql, sqlchack;
    parseObjUsers = req.body;
    cookies = new Cookies(req, res, {"keys":['volodymyr']});
    clientToken = cookies.get('sessionisdd', {signed:true});
    console.log("--client-token--", clientToken);
    console.log("--client-registr-obj--", parseObjUsers); 
    checkObjValues("^[a-zA-Z0-9-_]+$", "login", "Bad login!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "password", "Bad new password!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "oldpassword", "Bad old password!", parseObjUsers, res);
    console.log("--ready-obj--", prUs);
    if (prUs.login === ''){
        sql = `UPDATE users SET password = '${prUs.password}' WHERE token = '${clientToken}' AND password = '${prUs.oldpassword}'`;
    } else if (prUs.password === '') {
        sql = `UPDATE users SET login = '${prUs.login}' WHERE token = '${clientToken}' AND password = '${prUs.oldpassword}'`;
    } else if ((prUs.login !== '') && (prUs.password !== '')){
        sql = `UPDATE users SET login = '${prUs.login}', password = '${prUs.password}' WHERE token = '${clientToken}' AND password = '${prUs.oldpassword}'`;
    }  
    sqlchack = `SELECT password FROM users WHERE token = '${clientToken}' AND password = '${prUs.oldpassword}'`;
    con.query(sqlchack, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"err": err});
        } else {
            if (result == ''){
                console.log("--res--", "BAD_PASS");
                res.send({"res": "BAD_PASS"});
            } else {
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log("err", err);
                        console.log("err", err.code);
                        if (err.code == 'ER_DUP_ENTRY'){
                            res.send({"res":'ER_DUP_ENTRY'});
                        } else {
                            res.send({"err":err});
                        }
                    } else {
                        console.log(result.changedRows ," settings updated");
                        res.send({"res": result.changedRows});
                    }
                }); 
            }
        }        
    });
}; 

let updatemain = (req, res) => {
    let cookies, clientToken, parseObjUsers, sql, datetime, updatedatetime;
    parseObjUsers = req.body;
    datetime = new Date();
    updatedatetime = datetime.toISOString().slice(0,10);
    cookies = new Cookies(req, res, {"keys":['volodymyr']});
    clientToken = cookies.get('sessionisdd', {signed:true});
    console.log("--client-token--", clientToken);
    console.log("--client-registr-obj--", parseObjUsers); 
    prUs.updateuser = updatedatetime;
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ]+$", "name", "Bad name!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ]+$", "surname", "Bad surname!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9@-_.]+$", "email", "Bad email!", parseObjUsers, res);
    checkObjValues("^[0-9-]+$", "birthday", "Bad birthday!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "phone", "Bad phone!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "message", "Bad message!", parseObjUsers, res);
    console.log("--ready-obj--", prUs);
    prUs.name !== '' ? nameR = ` name = '${prUs.name}',` :  nameR = ``;
    prUs.surname !== '' ? surnameR = ` surname = '${prUs.surname}',` : surnameR = ``;
    prUs.email !== '' ? emailR = ` email = '${prUs.email}',` : emailR = ``;
    prUs.birthday !== '' ? birthdayR = ` birthday = '${prUs.birthday}',` : birthdayR = ``;
    prUs.phone !== '' ? phoneR = ` phone = '${prUs.phone}',` : phoneR = ``;
    prUs.message !== '' ? messageR = ` message = '${prUs.message}',` : messageR = ``;
    sql = `UPDATE users SET ${nameR}${surnameR}${emailR}${birthdayR}${phoneR}${messageR} updateuser = '${prUs.updateuser}' WHERE token = '${clientToken}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            console.log("err", err.code);
            if (err.code == 'ER_DUP_ENTRY'){
                res.send({"res":'ER_DUP_ENTRY'});
            } else {
                res.send({"err":err});
            }
        } else {
            console.log(result.changedRows ," settings updated");
            res.send({"res": result.changedRows});
        }
    });
};

module.exports = {
    registrationUsers,
    addAvatoDB,
    savesett,
    updaterender,
    updatesecurity,    
    updatemain
};