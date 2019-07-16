let con = require('../db/connectToDB').con;
let fs = require('fs');
let multer  = require('multer')
let {translit, token, clienttoken} = require('./service');

class protoUsers{constructor(){ }}
let prUs = new protoUsers();

let checkObjValues = (reg, val, mess, parseObjUsers, res) => {
    if ((parseObjUsers[val] !== '') && (parseObjUsers[val] !== undefined)){
        if (new RegExp(reg, "gi").test(parseObjUsers[val]) == true){
            prUs[val] = parseObjUsers[val];
        } else {
            console.log("--bad-input---->> ", mess);            
            res.status(404).send(mess);
        }
    } else {
        prUs[val] = '';
    }
};

let updaterender = (req, res) => {
    let clientToken = clienttoken(req, res);
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
        let sql = `SELECT U.*, S.* FROM users U INNER JOIN userssettings S on U.userid=S.userid WHERE U.token = '${clientToken}'`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log("err", err);
                res.send(err);
            }
            console.log("--user-for-update---->> ", result[0]);  
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
                profession: result[0].profession,
                education: result[0].education,
                vskillsall: result[0].vskillsall,
                vskillsme: result[0].vskillsme,
                vprojectsall: result[0].vprojectsall,
                vprojectsme: result[0].vprojectsme,
                vskillsalltop: result[0].vskillsalltop,
                vskillsmetop: result[0].vskillsmetop,
                vprojectsalltop: result[0].vprojectsalltop,
                vprojectsmetop: result[0].vprojectsmetop,
                vblogall: result[0].vblogall,
                vblogme: result[0].vblogme,
            });
        }); 
    }

};

let updatesecurity = (req, res) => {
    let parseObjUsers, sql, sqlchack;
    let clientToken = clienttoken(req, res);
    parseObjUsers = req.body;
    console.log("--client-registr-obj---->> ", parseObjUsers); 
    checkObjValues("^[a-zA-Z0-9-_]+$", "login", "Bad login!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "password", "Bad new password!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "oldpassword", "Bad old password!", parseObjUsers, res);
    console.log("--ready-obj---->> ", prUs);
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
                console.log("--res---->> ", "BAD_PASS");
                res.send({"res": "BAD_PASS"});
            } else {
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log("--err---->> ", err);
                        console.log("--err---->> ", err.code);
                        if (err.code == 'ER_DUP_ENTRY'){
                            res.send({"res":'ER_DUP_ENTRY'});
                        } else {
                            res.send({"err":err});
                        }
                    } else {
                        console.log("--settings-updated---->> ",result.changedRows);
                        res.send({"res": result.changedRows});
                    }
                }); 
            }
        }        
    });
}; 

let updatemain = (req, res) => {
    let parseObjUsers, sql, datetime, updatedatetime;
    parseObjUsers = req.body;
    datetime = new Date();
    updatedatetime = datetime.toISOString().slice(0,10);
    let clientToken = clienttoken(req, res);
    console.log("--client-registr-obj---->> ", parseObjUsers); 
    prUs.updateuser = updatedatetime;
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ]+$", "name", "Bad name!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ]+$", "surname", "Bad surname!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9@-_.]+$", "email", "Bad email!", parseObjUsers, res);
    checkObjValues("^[0-9-]+$", "birthday", "Bad birthday!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "phone", "Bad phone!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "message", "Bad message!", parseObjUsers, res);
    console.log("--ready-obj---->> ", prUs);
    prUs.name !== '' ? nameR = ` name = '${prUs.name}',` :  nameR = ``;
    prUs.surname !== '' ? surnameR = ` surname = '${prUs.surname}',` : surnameR = ``;
    prUs.email !== '' ? emailR = ` email = '${prUs.email}',` : emailR = ``;
    prUs.birthday !== '' ? birthdayR = ` birthday = '${prUs.birthday}',` : birthdayR = ``;
    prUs.phone !== '' ? phoneR = ` phone = '${prUs.phone}',` : phoneR = ``;
    prUs.message !== '' ? messageR = ` message = '${prUs.message}',` : messageR = ``;
    sql = `UPDATE users SET ${nameR}${surnameR}${emailR}${birthdayR}${phoneR}${messageR} updateuser = '${prUs.updateuser}' WHERE token = '${clientToken}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("--err----->> ", err);
            console.log("--err----->> ", err.code);
            if (err.code == 'ER_DUP_ENTRY'){
                res.send({"res":'ER_DUP_ENTRY'});
            } else {
                res.send({"err":err});
            }
        } else {
            console.log("--settings-updated---->> ",result.changedRows);
            res.send({"res": result.changedRows});
        }
    });
};


let updateother = (req, res) => {
    let parseObjUsers, sql, datetime, updatedatetime, user;
    parseObjUsers = req.body;
    datetime = new Date();
    updatedatetime = datetime.toISOString().slice(0,10);
    let clientToken = clienttoken(req, res);
    console.log("--client-registr-obj---->> ", parseObjUsers); 
    prUs.updateuser = updatedatetime;
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ-]+$", "country", "Bad country!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІєїЇ-]+$", "town", "Bad town!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ ]+$", "profession", "Bad profession!", parseObjUsers, res); 
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ ]+$", "education", "Bad education!", parseObjUsers, res); 
    console.log("--ready-obj--", prUs);
    prUs.country !== '' ? countryR = ` country = '${prUs.country}',` :  countryR = ``;
    prUs.town !== '' ? townR = ` town = '${prUs.town}',` : townR = ``;
    prUs.profession !== '' ? professionR = ` profession = '${prUs.profession}',` : professionR = ``;
    prUs.education !== '' ? educationR = ` education = '${prUs.education}',` : educationR = ``;
    sql = `UPDATE users SET ${countryR}${townR}${professionR}${educationR} updateuser = '${prUs.updateuser}' WHERE token = '${clientToken}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"err":err});
        } else {
            console.log("--settings-updated---->> ",result.changedRows);
            res.send({"res": result.changedRows});
        }
    });
};

//update ava to DB
let updateAvatoDB = (req, res) => {
    let storage, upload, sqlsel, oldava, ava, avasettings;
    let clientToken = clienttoken(req, res);
    sqlsel = `SELECT ava, userid FROM users WHERE token = '${clientToken}'`;
    con.query(sqlsel, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"err": err});
        } else {
            oldava = result[0].ava;
            user = result[0].userid;
            console.log("--old-ava---->> ",oldava);
            console.log("--userid---->> ",user);
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
                    res.send({"err":err});
                } else {   
                    let parseAvasettings = JSON.parse(req.body.objreg);    
                    if (req.file !== undefined){
                        ava = req.file.filename;
                        avasettings = parseAvasettings.avasettings;
                        console.log("--new-ava---->> ",ava);
                        console.log("--new-ava-sett---->> ",avasettings);                   
                        let sql = `UPDATE users SET ava = '${ava}' WHERE token = '${clientToken}'`;
                        let sqlsett = `UPDATE userssettings SET avasettings = '${avasettings}' WHERE userid = '${user}'`;
                        con.query(sql, function (err, result) {
                            if (err) {
                                console.log("err", err);
                                res.send({"err":err});
                            }
                            con.query(sqlsett, function (err, result) {
                                if (err) {
                                    console.log("err", err);
                                    res.send({"err":err});
                                }
                                console.log("--ava-name-updated---->> ",result.affectedRows);
                                fs.unlink(__dirname+`/../public/uploads/${oldava}`, (err) => {
                                    if (err) {
                                        console.log("err", err);
                                    }
                                    console.log('--old-ava-delete---->> ',oldava);
                                    res.send({"result":result});
                                });
                            }); 
                            console.log("--ava-sett-updated---->> ",result.affectedRows);
                        }); 
                    } else {
                        ava = '';
                        avasettings = '';
                        res.send({"result":"ava_no"});
                    }
                }
            });           
        }        
    });
};

let widgetsett = (req, res) => {
    let widget, values;
    let clientToken = clienttoken(req, res);
    widget = req.body.el;
    values = req.body.value;
    console.log("--widget---->> ", widget, "--value--",values);
    widget2 = req.body.el2;
    values2 = req.body.value2;
    console.log("--widget---->> ", widget2, "--value--", values2);
    let sql = `UPDATE userssettings S INNER JOIN users U ON S.userid = U.userid AND U.token = '${clientToken}' SET ${widget} = '${values}', ${widget2} = '${values2}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"err":err});
        } else {
            console.log("--widget-sett-updated---->> ",result.affectedRows);
            res.send({"res":result});
        }
    });    
}

module.exports = {
    updaterender,
    updatesecurity,    
    updatemain,
    updateother,
    updateAvatoDB,
    widgetsett
};