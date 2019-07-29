let con = require('../db/connectToDB').con;
let {token, clienttoken} = require('./service');
let Cookies = require('cookies');
let url = require('url');
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

let autorisation = (req, res) => {
    let tokenId = token(20);
    console.log("--token--", tokenId);
    let sql = `UPDATE users SET token = '${tokenId}' WHERE login = '${req.body.login}' AND password = '${req.body.password}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            console.log("--result-autoriz---->> ",result.changedRows);
            if (result.changedRows === 0){
                let cookies = new Cookies(req, res, {"keys":['volodymyr']});
                let param = {
                    maxAge: '-1', 
                    path: '/', 
                    signed:true}
                cookies.set('sessionisdd', ``, param); 
                res.send({"err":"false"});
            } else {
                let sqlsel = `SELECT U.userid, S.maincolor, S.secondcolor, S.bgcolor, S.bordertl, S.bordertr, S.borderbl, S.borderbr, S.fonts, S.language FROM users U INNER JOIN userssettings S on U.userid=S.userid WHERE U.login = '${req.body.login}' AND U.password = '${req.body.password}'`;
                con.query(sqlsel, function (err, result) {
                    if (err) {
                        console.log("err", err);
                        res.send({"error":err});
                    } else {
                        console.log("--result-userSett---->> ", result);
                        let cookies = new Cookies(req, res, {"keys":['volodymyr']});
                        let param = {
                            maxAge: '', 
                            path: '/', 
                            signed:true}
                        cookies.set('sessionisdd', `${tokenId}`, param);
                        res.send({"res":result[0]});                      
                    }
                }); 
            }           
        }
    });
};

let exit = (req, res) => {
    let cookies = new Cookies(req, res, {"keys":['volodymyr']});
    let param = {
        maxAge: '-1', 
        path: '/', 
        signed:true}
    cookies.set('sessionisdd', ``, param); 
    res.send({"exit":"exit"});
};

let sendemail = (req, res) => {
    let clientToken = clienttoken(req, res);
    let sql = `SELECT email, userid, active FROM users  WHERE token = '${clientToken}'`;    
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"err": err});
        } else {
            console.log("--get-info-for-email---->> ", result);
            let hostname = req.headers.host; 
            let verifyUrl = `${hostname}/verify?userid=${result[0].userid}&verifycod=${result[0].active}`;
            console.log("--verify-url---->> ", verifyUrl);            
            let mailOptions = {
                from: '6b616c6369666572@gmail.com',
                to: `${result[0].email}`,
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
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    res.send({"error":error});
                } else {
                    console.log('--Email-sent---->> ' + info.response);                  
                    res.send({"res":info.response});
                }
            });
        }        
    });
};

let verifyuser = (req, res) => {
    let getuserid, clientToken, verify, verifyobj, userid, cod;
    getuserid = req.headers.referer;
    verify = url.parse(getuserid, true);
    verifyobj = verify.query
    cod = verifyobj.verifycod;
    userid = verifyobj.userid;
    clientToken = clienttoken(req, res);
    console.log("--verify-cod---->> ",cod);
    console.log("--verify-user---->> ",userid);
    let sql = `UPDATE users SET active = 'active' WHERE token = '${clientToken}' AND userid = '${userid}' AND active = '${cod}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            console.log(result);
            res.send({"res":userid});
        }
    });
}

let autorisationSocial = (profile, done) => {
    con.query(`SELECT * FROM users WHERE userid = ${profile.id}`, (err, result) => {
        if(err) {
            console.log("--err-autoriz---->>",err);    
            return done(null, profile);             
        } else if (result && result.length === 0) {
            console.log("--register-user---->>");
            let login = token(10);
            let password = token(10);
            let datetime = new Date();
            let updatedatetime = datetime.toISOString().slice(0,10);
            let sql = `INSERT INTO users (userid, name, surname, login, password, email, active, regtype, registrdata, ava) VALUES ('${profile.id}', '${profile.name.givenName}', '${profile.name.familyName}', '${login}', '${password}', '${profile.emails[0].value}', 'active', 'facebook', '${updatedatetime}',  '${profile.photos[0].value}')`;
            let sqlsett = `INSERT INTO userssettings (userid) VALUES ('${profile.id}')`;          
            con.query(sql, function (err, result) {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY'){
                        let parseSQLmess = err.sqlMessage.slice(err.sqlMessage.length - 6,  err.sqlMessage.length - 1);
                        if (parseSQLmess === 'login'){ 
                            return done('ER_DUP_LOGIN', null);
                        } else if (parseSQLmess === 'email'){
                            return done('ER_DUP_EMAIL', null);
                        } else {
                            return done(`${err}`, null);
                        }             
                    } else {
                        return done(`${err}`, null);
                    }
                } else {
                con.query(sqlsett, function (err, result) {
                    if (err){
                    console.log("--err-create-row-settinds--", err);
                    let sqldel = `DELETE FROM users WHERE userid = ${profile.id}`;
                        con.query(sqldel, function (err, result) {
                            if (err){
                                console.log("--err-clear-user-if-fail--", err);
                            } else {
                                console.log("--result-user-clear---->> ", result.affectedRows);
                            return done('ER_SERVER', null);
                            }
                        });
                    } else {
                        console.log("--result-add-row-settings---->> ", result.affectedRows);
                    return done(null, profile);
                    }  
                });
                }
            }); 
        } else if (result[0].userid === profile.id){
            console.log("--user-is-authorized---->>".profile);
            return done(null, profile);
        }
    }); 
}

let autorisSocialSetCookie = (req, res, user) => {
    let tokenId = token(20);
    let sql = `UPDATE users SET token = '${tokenId}' WHERE userid = '${user.id}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.redirect('/');
        } else {
            console.log("--result-autoriz---->> ",result.changedRows);
            if (result.changedRows === 0){
                let cookies = new Cookies(req, res, {"keys":['volodymyr']});
                let param = {
                maxAge: '-1', 
                path: '/', 
                signed:true}
                cookies.set('sessionisdd', ``, param); 
                res.redirect(user.id);
            } else {
                let sqlsel = `SELECT userid FROM users WHERE userid = '${user.id}'`;
                con.query(sqlsel, function (err, result) {
                if (err) {
                    console.log("err", err);
                    res.redirect(user.id);
                } else {
                    console.log("--result-userSett---->> ", result.changedRows);
                    let cookies = new Cookies(req, res, {"keys":['volodymyr']});
                    let param = {
                    maxAge: '', 
                    path: '/', 
                    signed:true}
                    cookies.set('sessionisdd', `${tokenId}`, param);
                    res.redirect(user.id);                      
                }
                }); 
            }           
        }
    });    
}

module.exports = {
    autorisation,
    exit,
    sendemail,
    verifyuser,
    autorisationSocial,
    autorisSocialSetCookie
};