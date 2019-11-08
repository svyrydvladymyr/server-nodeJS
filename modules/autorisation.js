let con = require('../db/connectToDB').con;
let {token, clienttoken, renderIfErrAutoriz, $_log} = require('./service');
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
        pass: 'kalcifer1911'
    },
    tls: {
        rejectUnauthorized: true 
    }
});  

let autorisation = (req, res) => {
    let tokenId = token(20);
    $_log("token", tokenId);
    let sql = `UPDATE users SET token = '${tokenId}' WHERE login = '${req.body.login}' AND password = '${req.body.password}'`;
    con.query(sql, function (err, result) {
        if (err) {
            $_log("err", err, "error", res);
        } else {
            $_log("result-autoriz", result.changedRows);
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
                        $_log("err", err, "error", res);
                    } else {
                        $_log("result-userSett", result);
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
            $_log("err", err, "err", res);
        } else {
            $_log("get-info-for-email", result);
            let verifyUrl = `${req.headers.host}/verify?userid=${result[0].userid}&verifycod=${result[0].active}`;
            $_log("verify-url", verifyUrl);      
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
                (error) ? $_log("error", error, "error", res) : $_log("Email-sent", info.response, "res", res);
            });
        }        
    });
};

let recoverdata = (req, res) => {
    let sql = `SELECT regtype, login, password, email, facebookemail, googleemail, instagramemail, githubemail, linkedinemail, twitteremail FROM users  WHERE email = '${req.body.email}' OR facebookemail = '${req.body.email}' OR googleemail = '${req.body.email}' OR instagramemail = '${req.body.email}' OR githubemail = '${req.body.email}' OR linkedinemail = '${req.body.email}' OR twitteremail = '${req.body.email}'`;    
    con.query(sql, function (err, result) {
        if (err) {
            $_log("err", err);
            res.redirect(user.id);
        } else {            
            let messSoc, login, passsword, arrprovider = ``, log, pass, and, koma;
            if (result.length > 1){
                and = `<span><b>You also have other registrations, but these are different accounts!</b></span>`;
                koma = `,`;
            } else if (result.length === 1){
                and = ``;
                koma = ``;
                log = ``;
                pass = ``;
            }
            for(let i = 0; i < result.length; i++){
                if(result[i].regtype === null){
                    log = `<span>Your login: <b style="font-size:14px;">${result[i].login};</b></span>`;
                    pass = `<span>Your password: <b style="font-size:14px;">${result[i].password};</b></span>`;
                } else if (result[i].regtype !== null) {
                    arrprovider += `${result[i].regtype}${koma} `;
                }
            }
            if (result != ''){
                if ((result[0].regtype === 'facebook') || (result[0].regtype === 'googleemail') || (result[0].regtype === 'instagramemail') || (result[0].regtype === 'githubemail') || (result[0].regtype === 'linkedinemail') || (result[0].regtype === 'twitteremail')) {
                    messSoc = `<span>You are registered with <b style="font-size:14px;">${arrprovider}</b> and You can login using this resources.</span>`
                    login = `${log}`;
                    passsword = `${pass}`;
                } else {
                    messSoc = ``;
                    login = `${log}`;
                    passsword = `${pass}`;
                } 
                let mailOptions = {
                    from: '6b616c6369666572@gmail.com',
                    to: `${req.body.email}`,
                    subject: 'Recover data user',
                    html: `<h2>Hello!</h2>                            
                            <p>${login}</p>
                            <p>${passsword}</p>
                            <p>${and}</p>
                            <p>${messSoc}</p>
                            <p>Thank you for using our resource!</p>`
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        $_log("Error-email-sent", error);
                        res.send({"res":"err"});
                    } else {
                        $_log("Email-sent", info.response, 'res', res);           
                    }
                });
            } else {
                res.send({"res":"notfind"});
            }       
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
    $_log("verify-cod", cod);
    $_log("verify-user", userid);
    let sql = `UPDATE users SET active = 'active' WHERE token = '${clientToken}' AND userid = '${userid}' AND active = '${cod}'`;
    con.query(sql, function (err, result) {
        if (err) {
            $_log("Error-email-sent", error, "error", res);
        } else {
            console.log(result);
            res.send({"res":userid});
        }
    });
}

let autorisationSocial = (profile, done) => {
    let id = profile.provider === 'linkedin' ? profile.id.replace(/-/gi, '') : profile.id;
    con.query(`SELECT * FROM users WHERE userid = '${id}'`, (err, result) => {
        let ava, name, surname, emailadd, provider, emailprovider;
        if (profile.provider === 'instagram'){
            ava = profile._json.data.profile_picture === undefined ? '' : `${profile._json.data.profile_picture}`;
            name = profile.displayName === undefined ? '' : `${profile.displayName}`;
            surname = '';
            emailadd = '';
            provider = profile.provider === undefined ? '' : `${profile.provider}`;
            emailprovider = profile.provider === undefined ? '' : `${profile.provider}`;
        } else if (profile.provider === 'github'){
            ava = profile.photos === undefined ? '' : `${profile.photos[0].value}`;
            name = profile.displayName === undefined ? '' : `${profile.displayName}`;
            surname = '';
            emailadd = '';
            provider = profile.provider === undefined ? '' : `${profile.provider}`;
            emailprovider = profile.provider === undefined ? '' : `${profile.provider}`;
        } else if (profile.provider === 'linkedin'){
            ava = profile.photos === undefined ? '' : `${profile.photos[2].value}`;
            name = profile.name.givenName === undefined ? '' : `${profile.name.givenName}`;
            surname = profile.name.familyName === undefined ? '' : `${profile.name.familyName}`;
            emailadd = '';
            provider = profile.provider === undefined ? '' : `${profile.provider}`;
            emailprovider = profile.provider === undefined ? '' : `${profile.provider}`;
        } else {
            ava = profile.photos === undefined ? '' : `${profile.photos[0].value}`;
            name = profile.name.givenName === undefined ? '' : `${profile.name.givenName}`;
            surname = profile.name.familyName === undefined ? '' : `${profile.name.familyName}`;
            emailadd = profile.emails === undefined ? '' : `${profile.emails[0].value}`;
            provider = profile.provider === undefined ? '' : `${profile.provider}`;
            emailprovider = profile.provider === undefined ? '' : `${profile.provider}`;
        }
        if(err) {
            $_log("err-autoriz", err);  
            return done(null, profile);             
        } else if (result && result.length === 0) {
            $_log("register-user-with-social", result);
            // let login = token(10);
            // let password = token(10);
            // let datetime = new Date();
            // let updatedatetime = datetime.toISOString().slice(0,10);
            let sql = `INSERT INTO users (userid, name, surname, login, password, ${emailprovider}email, active, regtype, registrdata, ava) 
                       VALUES ('${id}', '${name}', '${surname}', '${token(10)}', '${token(10)}', '${emailadd}', 'active', '${provider}', '${new Date().toISOString().slice(0,10)}', '${ava}')`;
            let sqlsett = `INSERT INTO userssettings (userid) VALUES ('${id}')`;          
            con.query(sql, function (err, result) {
                if (err) {
                    $_log("err-with-social-registr", err);                 
                    if (err.code === 'ER_DUP_ENTRY'){
                        let parseSQLmess = err.sqlMessage.slice(err.sqlMessage.length - 6,  err.sqlMessage.length - 1);
                        return (parseSQLmess === 'login') ? done('ER_DUP_LOGIN', null) : (parseSQLmess === 'email') ? done('ER_DUP_EMAIL', null) : done(`${err}`, null);
                        // if (parseSQLmess === 'login'){ 
                        //     return done('ER_DUP_LOGIN', null);
                        // } else if (parseSQLmess === 'email'){
                        //     return done('ER_DUP_EMAIL', null);
                        // } else {
                        //     return done(`${err}`, null);
                        // }             
                    } else {
                        return done(`${err}`, null);
                    }
                } else {
                    con.query(sqlsett, function (err, result) {
                        if (err){
                            $_log("err-create-row-settinds", err);
                            let sqldel = `DELETE FROM users WHERE userid = ${id}`;
                            con.query(sqldel, function (err, result) {
                                if (err){
                                    $_log("err-clear-user-if-fail", err);
                                } else {
                                    $_log("result-user-clear", result.affectedRows);
                                    return done('ER_SERVER', null);
                                }
                            });
                        } else {
                            $_log("result-add-row-settings", result.affectedRows);
                            return done(null, profile);
                        }  
                    });
                }
            }); 
        } else if (result[0].userid === id){
            $_log("user-is-authorized", id);
            let emailproviderrr = profile.provider === undefined ? 'email' : `${profile.provider}email`;
            con.query(`UPDATE users SET name = '${name}' WHERE userid = '${id}'`, function (err, result) {$_log("set-new-name", result.affectedRows)});
            con.query(`UPDATE users SET surname = '${surname}' WHERE userid = '${id}'`, function (err, result) {$_log("set-new-surname", result.affectedRows)});
            con.query(`UPDATE users SET ava = '${ava}' WHERE userid = '${id}'`, function (err, result) {$_log("set-new-ava", result.affectedRows)});
            if ((emailadd !== '') && (emailadd !== undefined)){
                con.query(`UPDATE users SET ${emailproviderrr} = '${emailadd}' WHERE userid = '${id}'`, function (err, result) {$_log("set-new-email", result.affectedRows)});
            }
            return done(null, profile);
        }
    }); 
}

let autorisSocialSetCookie = (req, res, user) => {
    let id = user.provider === 'linkedin' ? user.id.replace(/-/gi, '') : user.id;
    let tokenId = token(20);
    let sql = `UPDATE users SET token = '${tokenId}' WHERE userid = '${id}'`;
    con.query(sql, function (err, result) {
        if (err) {
            $_log("err", err);
            res.redirect('/');
        } else {
            $_log("result-autoriz", result.changedRows);
            if (result.changedRows === 0){
                let cookies = new Cookies(req, res, {"keys":['volodymyr']});
                // let param = {maxAge: '-1', 
                //              path: '/', 
                //              signed:true}
                cookies.set('sessionisdd', ``, {maxAge: '-1', path: '/', signed:true}); 
                res.redirect(id);
            } else {              
                let sqlsel = `SELECT U.*, S.* FROM users U INNER JOIN userssettings S on U.userid=S.userid WHERE U.userid = '${id}'`;
                con.query(sqlsel, function (err, result) {
                    if (err) {
                        $_log("err", err);
                        res.redirect(id);
                    } else {
                        $_log("result-userSett", result[0].userid);
                        // let clientToken = clienttoken(req, res);
                        let cookies = new Cookies(req, res, {"keys":['volodymyr']});
                        // let param = {maxAge: '', 
                        //              path: '/', 
                        //              signed:true}
                        cookies.set('sessionisdd', `${tokenId}`, {maxAge: '', path: '/', signed:true});
                        res.render(`nouser`, {
                            permissAccess: `${(result[0].token === clienttoken(req, res)) ? true : false}`,
                            permissEdit: `${(result[0].token === clienttoken(req, res)) ? true : false}`,
                            permissName: `${result[0].name}`,
                            permissSurname: `${result[0].surname}`,
                            permissUserid: `${result[0].userid}`,
                            onindex:`verifyuser`,
                            setsettings:`true`,
                            userid: ``,
                            activee: `active`,
                            title:``,
                            maincolor:`${result[0].maincolor}`,
                            secondcolor:`${result[0].secondcolor}`,
                            bgcolor:`${result[0].bgcolor}`,
                            topleft:`${result[0].bordertl}`,
                            topright:`${result[0].bordertr}`,
                            bottomleft:`${result[0].borderbl}`,
                            bottomright:`${result[0].borderbr}`,
                            font:`${result[0].fonts}`,
                            lang:`${result[0].language}`
                        });                 
                    }
                }); 
            }           
        }
    });    
}

let autorisRouts = (req, res, err, user) => {
    if(err){
        (err === 'ER_DUP_EMAIL') ? renderIfErrAutoriz(req, res, 'err_autoriz_email') 
        : (err === 'ER_DUP_LOGIN') ? renderIfErrAutoriz(req, res, 'err_autoriz_login')
        : (err === 'ER_SERVER') ? renderIfErrAutoriz(req, res, 'err_autoriz_server') 
        : res.redirect('/');  
    } else {
        autorisSocialSetCookie(req, res, user); 
    }     
}

module.exports = {
    autorisation,
    exit,
    sendemail,
    verifyuser,
    autorisationSocial,
    autorisRouts,
    recoverdata
};