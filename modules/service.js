let transliteration = require('transliteration.cyr');
let Cookies = require('cookies');
let con = require('../db/connectToDB').con;
let fs = require('fs');

//transliteration
let translit = word => {return transliteratedValue = transliteration.transliterate(word)};

//generate token
let token = length => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {result += characters.charAt(Math.floor(Math.random() * characters.length))}
    return result;
};

//client token
let clienttoken = (req, res) => {
    let cookies, clientToken;
    cookies = new Cookies(req, res, {"keys":['volodymyr']});
    clientToken = cookies.get('sessionisdd', {signed:true});
    console.log("--client-token---->> ", clientToken);
    return clientToken;
};

//chack on true values
let checOnTrueVal = (el) => {
    let reg = "[^a-zA-Zа-яА-Я0-9-()_+=.'\":/\,іІїЇєЄ /\n]";
    let newReg = new RegExp(reg, "gi");    
    let res = el.replace(newReg, '');
    return res;    
}

//save logs
let accessLog = (req, res, next) => {
    let logs = `IP: ${req.ip}  TIME: ${new Date().toLocaleString()}  URL: ${req.url}\n`;
    let namefile = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
    fs.appendFile(`./log/${namefile}.txt`, logs, (err) => {console.log(err)});
    next();
}

//create table for user friends
let createTableFriends = (getuserid) => {
    let sqlfriends = `CREATE TABLE friends_${getuserid} (id INT AUTO_INCREMENT PRIMARY KEY,
        userid VARCHAR(100),
        friendid VARCHAR(100),
        friendstatus VARCHAR(10),
        friendvisit VARCHAR(10),
        friendadd DATE                           
        )`;
    con.query(sqlfriends, function (err, result) {
        err ? console.log("--err-create-table-friends--", err.code) : console.log("--Table-friends-created---->> ", result.protocol41);
    });  
}

//render page if bad autorization 
let renderIfErrAutoriz = (req, res, err) => {
    permissionAccess = false;
    permissionEdit = false;
    permissionFriend = false;
    res.render(`nouser`, {
        permissAccess: `${permissionAccess}`,
        permissEdit: `${permissionEdit}`,
        permissName: ``,
        permissSurname: ``,
        permissUserid: ``,
        onindex:`err_autoriz`,
        setsettings:`false`,
        errautoriz:`${err}`,
        userid: ``,
        activee: `active`,
        title:``
    });
}

module.exports = {
    translit,
    token,
    clienttoken,
    checOnTrueVal,
    accessLog,
    createTableFriends,
    renderIfErrAutoriz
};