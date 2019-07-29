let con = require('../db/connectToDB').con;
let multer  = require('multer')
let {translit, token, clienttoken} = require('./service');
let Cookies = require('cookies');
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
        user: '6b616c6369666572@gmail.com',
        pass: 'kalcifer1988'
    },
    tls: {
        rejectUnauthorized: false
    }
});  

class protoUsers{constructor(){ }}
let prUs = new protoUsers();

let checkObjValues = (reg, val, mess, parseObjUsers, res) => {
    if ((parseObjUsers[val] !== '') && (parseObjUsers[val] !== undefined)){
        if (new RegExp(reg, "gi").test(parseObjUsers[val]) == true){
            prUs[val] = parseObjUsers[val];
        } else {
            console.log("--bad-input--", mess);    
            prUs[val] = '';        
        }
    } else { prUs[val] = '';}
};

let registrationUsers = (req, res) => {
    let settproof, skilsproof, projectproof;     
    let parseObjUsers = req.body;
    console.log("--client-registr-obj--", parseObjUsers);    
    prUs.userid = translit(`${parseObjUsers.surname}${parseObjUsers.name}`).toLowerCase() + '_' + token(10);
    checkObjValues("^[0-9-]+$", "registrdata", "Bad registration date!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "login", "Bad login!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9-_]+$", "password", "Bad password!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ]+$", "name", "Bad name!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-ЯіІїЇ]+$", "surname", "Bad surname!", parseObjUsers, res);
    checkObjValues("^[a-zA-Z0-9@-_.]+$", "email", "Bad email!", parseObjUsers, res);
    checkObjValues("^[0-9-]+$", "birthday", "Bad birthday!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "phone", "Bad phone!", parseObjUsers, res);
    checkObjValues("^[0-9+]+$", "message", "Bad message!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-Я-іІїЇ ]+$", "country", "Bad country!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-Я-іІєїЇ ]+$", "town", "Bad town!", parseObjUsers, res);
    checkObjValues("^[a-zA-Zа-яА-Я-іІїЇ ]+$", "profession", "Bad profession!", parseObjUsers, res);     
    checkObjValues("^[a-zA-Zа-яА-Я-іІїЇ ]+$", "education", "Bad education!", parseObjUsers, res);     
    let verifyToken = token(10);    
    let hostname = req.headers.host; 
    let verifyUrl = `${hostname}/verify?userid=${prUs.userid}&verifycod=${verifyToken}`;
    let tokenId = token(20);
    console.log("--verifyToken---->> ", verifyToken); 
    console.log("--verifyUrl---->>", verifyUrl);
    console.log("--clientToken---->>", tokenId); 
    let sql = `INSERT INTO users (userid, login, password, name, surname, email, birthday, phone, message, country, town, profession, education, registrdata, active, token) 
               VALUES ('${prUs.userid}', '${prUs.login}', '${prUs.password}', '${prUs.name}', '${prUs.surname}', '${prUs.email}', '${prUs.birthday}', '${prUs.phone}', '${prUs.message}', '${prUs.country}', '${prUs.town}', '${prUs.profession}', '${prUs.education}', '${prUs.registrdata}', '${verifyToken}', '${tokenId}')`;
    let sqlsett = `INSERT INTO userssettings (userid) VALUES ('${prUs.userid}')`;
    let sqlskills = `INSERT INTO userskills (userid) VALUES ('${prUs.userid}')`;
    let sqlproj = `INSERT INTO userprojects (userid) VALUES ('${prUs.userid}')`;
    let sqlfriends = `CREATE TABLE friends_${prUs.userid} (id INT AUTO_INCREMENT PRIMARY KEY,
        userid VARCHAR(100),
        friendid VARCHAR(100),
        friendstatus VARCHAR(10),
        friendvisit VARCHAR(10),
        friendadd DATE                           
        )`;  
    let mailOptions = {
        from: '6b616c6369666572@gmail.com',
        to: `${prUs.email}`,
        subject: 'Verify Email Address',
        html: `<h2>Hello!</h2>
                <p>Please click the button below to verify your email address.</p>
                <a href="${verifyUrl}">
                <p style = "margin: 20px auto;
                            cursor:pointer;
                            padding: 6px;
                            border-radius: 7px;
                            border: 1px solid #5fa7e0;
                            width: 140px;
                            color: #ffffff;
                            font-weight: bold;
                            text-align: center;
                            text-decoration: underline;
                            box-shadow: 0px 0px 3px #111111;
                            background: #76c9ef;">
                Verify Email Address</p></a>
                <p>If you did not create an account, no further action is required.</p>`
    };
    if ((prUs.login !== '') && (prUs.password !== '') && (prUs.email !== '') && (prUs.name !== '') && (prUs.surname !== '')){
        con.query(sql, function (err, result) {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY'){
                    let parseSQLmess = err.sqlMessage.slice(err.sqlMessage.length - 6,  err.sqlMessage.length - 1);
                    if (parseSQLmess === 'login'){
                        console.log("--err-dup-login--", err.sqlMessage);
                        res.send({"error":'duplicate_entry_login'});
                    } else if (parseSQLmess === 'email'){
                        console.log("--err-dup-email--", err.sqlMessage);
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
                let renameres = result;
                con.query(sqlsett, function (err, result) {
                    if (err){
                        console.log("--err-create-row-settinds--", err);
                        let sqldel = `DELETE FROM users WHERE userid = ${prUs.userid}`;
                        con.query(sqldel, function (err, result) {
                            err ? console.log("--err-clear-user-if-fail--", err) : console.log("--result-user-clear---->> ", result.affectedRows);
                            res.send({"error":"server_error"});
                        });
                    } else {
                        console.log("--result-add-row-settings---->> ", result.affectedRows);
                        con.query(sqlskills, function (err, result) {
                            err ? console.log("--err--", err) : console.log("--result-add-row-skills---->> ", result.affectedRows);
                        });
                        con.query(sqlproj, function (err, result) {
                            err ? console.log("--err--", err) : console.log("--result-add-row-projects---->> ", result.affectedRows);
                        });  
                        con.query(sqlfriends, function (err, result) {
                            err ? console.log("--err--", err) : console.log("--result-cteated-table-friends---->> ", result.protocol41);
                        });
                        transporter.sendMail(mailOptions, function(err, info){
                            err ? console.log("--err--", err) : console.log('--result-sent-Email---->> ' + info.response);
                        });
                        console.log("--result-registr-user---->> ", renameres.affectedRows);            
                        let cookies = new Cookies(req, res, {"keys":['volodymyr']});
                        let param = {
                            maxAge: '', 
                            path: '/', 
                            signed:true}
                        cookies.set('sessionisdd', `${tokenId}`, param);
                        res.send(renameres);
                    }  
                });
            }
        }); 
    } else {
        res.send({"error":"bad_data"});
    }
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
                let sql = `UPDATE users SET ava = '${prUs.ava}', avasettings = '${prUs.avasettings}' WHERE userid = '${prUs.userid}'`;
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log("err", err);
                        res.send(err);
                    }
                    console.log("--foto-updated---->> ",result.affectedRows);
                    res.send({"result":result, "userid":prUs.userid});
                }); 
            } else {
                prUs.ava = '';
                prUs.avasettings = '';
                res.send({"result":"ava_no", "userid":prUs.userid});
            }
        }
    });  
};

//save settings to DB
let savesett = (req, res) => {
    let clientObg = req.body;
    console.log("--client-obj--", clientObg);
    let clientToken = clienttoken(req, res);
    let sqlsel = `SELECT userid FROM users WHERE token = '${clientToken}'`;
    con.query(sqlsel, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send(err);
        }
        console.log("--upd-sett-userid---->> ", result[0].userid);  
        let sqlupt = `UPDATE userssettings SET maincolor = '${clientObg.main}', secondcolor = '${clientObg.second}', bgcolor = '${clientObg.bg}', bordertl = '${clientObg.tl}', bordertr = '${clientObg.tr}', borderbl = '${clientObg.bl}', borderbr = '${clientObg.br}', fonts = '${clientObg.font}', language = '${clientObg.lang}' WHERE userid = '${result[0].userid}'`;
        con.query(sqlupt, function (err, result) {
            if (err) {
                console.log("err", err);
                res.send(err);
            }
            console.log("--settings-updated---->> ",result.changedRows);
            res.send({});
        }); 
    }); 
};

module.exports = {
    registrationUsers,
    addAvatoDB,
    savesett
};