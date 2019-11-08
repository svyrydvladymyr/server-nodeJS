let con = require('../db/connectToDB').con;
let fs = require('fs');
let multer  = require('multer')
let {translit, token, clienttoken, $_log} = require('./service');

class protoUsers{constructor(){ }}
let prUs = new protoUsers();

let checkObjValues = (reg, val, mess, parseObjUsers, res) => {
    if ((parseObjUsers[val] !== '') && (parseObjUsers[val] !== undefined)){
        if (new RegExp(reg, "gi").test(parseObjUsers[val]) == true){
            prUs[val] = parseObjUsers[val];
        } else {
            $_log('bad-input', mess);
            prUs[val] = '';
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
                $_log('err', err, 'err', res);
            }
            $_log('user-for-update', result[0]);
            let phone, phonecod, message, messagecod, country, RC = result[0].country;
            if (result[0].phone !== null){
                phone = result[0].phone.slice(3 ,13);
                phonecod = result[0].phone.slice(result[0].phone.length - result[0].phone.length ,result[0].phone.length - 10);
            }
            if (result[0].message !== null){
                message = result[0].message.slice(3 ,13);
                messagecod = result[0].message.slice(result[0].message.length - result[0].message.length ,result[0].message.length - 10);
            }
            country = ((RC === 'Ukraine') || (RC === 'Україна')) ?'ukraine'
            : ((RC === 'Russian') || (RC === 'Росія')) ? 'russian'
            : ((RC === 'Great Britain') || (RC === 'Великобританія')) ? 'greatbritain'
            : ((RC === 'USA') || (RC === 'Сполучені Штати')) ? 'usa' : null;        
            town = translit(result[0].town);   
            res.render(`update`, {
                userid: result[0].userid,
                regtype: result[0].regtype,
                name: result[0].name,
                surname: result[0].surname,
                email: result[0].email,
                facebookemail: `${result[0].facebookemail}`,
                googleemail: `${result[0].googleemail}`,
                instagramemail: `${result[0].instagramemail}`,
                githubemail: `${result[0].githubemail}`,
                linkedinemail: `${result[0].linkedinemail}`,
                twitteremail: `${result[0].twitteremail}`,
                birthday: result[0].birthday,
                phone: phone,
                phonecod: phonecod,
                message: message,
                messagecod: messagecod,
                country: country,
                town: result[0].town,
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
                vfriendme: result[0].vfriendme,
                vfriendall: result[0].vfriendall,
                permissAccess: `true`,
            });
        }); 
    }

};

let updatesecurity = (req, res) => {
    let parseObjUsers, sql, sqlchack;
    let clientToken = clienttoken(req, res);
    parseObjUsers = req.body;
    $_log('client-registr-obj', parseObjUsers);
    checkObjValues("^[a-zA-Z0-9-_]+$", "login", "Bad login!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "password", "Bad new password!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "oldpassword", "Bad old password!", parseObjUsers, res);
    $_log('ready-obj', prUs);
    sql = (prUs.login === '') ? `UPDATE users SET password = '${prUs.password}' WHERE token = '${clientToken}' AND password = '${prUs.oldpassword}'`
    : (prUs.password === '') ? `UPDATE users SET login = '${prUs.login}' WHERE token = '${clientToken}' AND password = '${prUs.oldpassword}'`
    : ((prUs.login !== '') && (prUs.password !== '')) ? `UPDATE users SET login = '${prUs.login}', password = '${prUs.password}' WHERE token = '${clientToken}' AND password = '${prUs.oldpassword}'` : null;
    sqlchack = `SELECT password FROM users WHERE token = '${clientToken}' AND password = '${prUs.oldpassword}'`;
    con.query(sqlchack, function (err, result) {
        if (err) {
            $_log('err', err, 'err', res);
        } else {
            if (result == ''){
                $_log('res', "BAD_PASS", 'res', res);
            } else {
                con.query(sql, function (err, result) {
                    if (err) {
                        (err.code == 'ER_DUP_ENTRY') ? res.send({"res":'ER_DUP_ENTRY'}) : res.send({"err":err});
                    } else {
                        $_log('settings-updated', result.changedRows, 'res', res);
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
    $_log('client-registr-obj', parseObjUsers);
    prUs.updateuser = updatedatetime;
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇєЄ']+$", "name", "Bad name!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇєЄ']+$", "surname", "Bad surname!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9@-_.]+$", "email", "Bad email!", parseObjUsers, res);
    checkObjValues("^[0-9-]+$", "birthday", "Bad birthday!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "phone", "Bad phone!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "message", "Bad message!", parseObjUsers, res);
    $_log('ready-obj', prUs);
    nameR = prUs.name !== '' ? `name = '${prUs.name}', ` : ``;
    surnameR = prUs.surname !== '' ? `surname = '${prUs.surname}', ` : ``;
    emailR = prUs.email !== '' ? `email = '${prUs.email}', ` : ``;
    birthdayR = prUs.birthday !== '' ? `birthday = '${prUs.birthday}', ` : ``;
    phoneR = prUs.phone !== '' ? `phone = '${prUs.phone}', ` : ``;
    messageR = prUs.message !== '' ? `message = '${prUs.message}', ` : ``;   
    sqlsel = `SELECT regtype FROM users WHERE token = '${clientToken}'`;    
    con.query(sqlsel, function (err, result) {
        if (err) {
            $_log('err', err);
        } else {
            let preem = prUs.email !== '' ? `${result[0].regtype}` : ``;         
            preem == 'null' ? rektypeee = `` : rektypeee = `${preem}`;         
            sql = `UPDATE users SET ${nameR}${surnameR}${rektypeee}${emailR}${birthdayR}${phoneR}${messageR} updateuser = '${prUs.updateuser}' WHERE token = '${clientToken}'`;
            con.query(sql, function (err, result) {
                if (err) {
                    (err.code == 'ER_DUP_ENTRY') ? res.send({"res":'ER_DUP_ENTRY'}) : res.send({"err":err});
                } else {
                    $_log('settings-updated', result.changedRows, 'res', res);
                }
            });
        }
    });
};


let updateother = (req, res) => {
    let parseObjUsers, sql, datetime, updatedatetime, user;
    parseObjUsers = req.body;
    datetime = new Date();
    updatedatetime = datetime.toISOString().slice(0,10);
    let clientToken = clienttoken(req, res);
    $_log('client-registr-obj', parseObjUsers);
    prUs.updateuser = updatedatetime;
    checkObjValues("^[a-zA-Zа-яА-Я-іІїЇ-]+$", "country", "Bad country!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-Я-іІєїЇ-]+$", "town", "Bad town!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]+$", "profession", "Bad profession!", parseObjUsers, res); 
    checkObjValues("^[a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]+$", "education", "Bad education!", parseObjUsers, res); 
    $_log('ready-obj', prUs);
    countryR = prUs.country !== '' ? ` country = '${prUs.country}',` : ``;
    townR = prUs.town !== '' ? ` town = '${prUs.town}',` : ``;
    professionR = prUs.profession !== '' ? ` profession = '${prUs.profession}',` : ``;
    educationR = prUs.education !== '' ? ` education = '${prUs.education}',` : ``;
    sql = `UPDATE users SET ${countryR}${townR}${professionR}${educationR} updateuser = '${prUs.updateuser}' WHERE token = '${clientToken}'`;
    con.query(sql, function (err, result) {
        (err) ? $_log('err', err, 'err', res) : $_log('settings-updated', result.changedRows, 'res', res);
    });
};

//update ava to DB
let updateAvatoDB = (req, res) => {
    let storage, upload, sqlsel, oldava, ava, avasettings;
    let clientToken = clienttoken(req, res);
    sqlsel = `SELECT ava, userid FROM users WHERE token = '${clientToken}'`;
    con.query(sqlsel, function (err, result) {
        if (err) {
            $_log('err', err, 'err', res);
        } else {
            oldava = result[0].ava;
            user = result[0].userid;
            $_log('old-ava', oldava);
            $_log('userid', user);
            storage = multer.diskStorage({
                destination: (req, file, cb) => {cb(null, +__dirname+"/../public/uploads")},
                filename: (req, file, cb) => {
                  if (req.file === undefined){ cb(null, token(10) +'_'+  file.originalname) };
                }});     
            upload = multer({ storage: storage }).single('file');
            upload(req, res, (err) => {
                if (err) {
                    $_log('err', err, 'err', res);
                } else {   
                    let parseAvasettings = JSON.parse(req.body.objreg);    
                    if (req.file !== undefined){
                        ava = req.file.filename;
                        avasettings = parseAvasettings.avasettings;
                        $_log('new-ava', ava);
                        $_log('new-ava-sett', avasettings);
                        let sql = `UPDATE users SET ava = '${ava}', avasettings = '${avasettings}' WHERE token = '${clientToken}'`;
                        con.query(sql, function (err, result) {
                            if (err) { $_log('err', err, 'err', res) };            
                            $_log('ava-updated', result.affectedRows);
                            fs.unlink(__dirname+`/../public/uploads/${oldava}`, (err) => {
                                if (err) { $_log('err', err) };
                                $_log('old-ava-delete', oldava);
                                res.send({"result":result});
                            });
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
    let sql = `UPDATE userssettings S INNER JOIN users U ON S.userid = U.userid AND U.token = '${clienttoken(req, res)}' SET ${req.body.el} = '${req.body.value}', ${req.body.el2} = '${req.body.value2}'`;
    con.query(sql, function (err, result) {
        if (err) {
            $_log('err', err, 'err', res);
        } else {
            $_log('widget-sett-updated', result.affectedRows);
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