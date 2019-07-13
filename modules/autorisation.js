let con = require('../db/connectToDB').con;
let {token, clienttoken} = require('./service');
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

let autorisation = (req, res) => {
    let tokenId = token(20);
    console.log("--token--", tokenId);
    let sql = `UPDATE users SET token = '${tokenId}' WHERE login = '${req.body.login}' AND password = '${req.body.password}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            console.log("--result-autoriz--",result.changedRows);
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
                        console.log("--result-userSett--", result);
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
            console.log("--get-info-ror-email--", result);
            let hostname = req.headers.host; 
            let verifyUrl = `${hostname}/verify/${result[0].userid}${result[0].active}`;
            console.log("--verify-url--", verifyUrl);            
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
                    console.log('Email sent: ' + info.response);
                    res.send({"res":result});
                }
            });

        }        
    });
};

module.exports = {
    autorisation,
    exit,
    sendemail
};