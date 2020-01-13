let transliteration = require('transliteration.cyr');
let Cookies = require('cookies');
let con = require('../db/connectToDB').con;
let dbName = require('../db/connectToDB').dbName;
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

//consoleLog message
let $_log = (mess, val, errsend, res, cod = 200) => {
    let iter = 25 - mess.length, arrow = '', obj = {[`${errsend}`]:val};
    for (let i = 0; i < iter; i++){
        arrow += '-';
    }
    console.log(`--${mess}${arrow}>> `, val);   
    errsend !== undefined ? res.status(cod).send(obj) : null; 
};

//client token
let clienttoken = (req, res) => {
    let cookies, clientToken;
    cookies = new Cookies(req, res, {"keys":['volodymyr']});
    clientToken = cookies.get('sessionisdd', {signed:true});
    $_log('//-CLIENT-TOKEN-//', clientToken);                    
    return clientToken;
};

//date format minures
let readyMin = function(fullDate){
    let createDate = new Date(fullDate);
    return finDay = ((createDate.getMinutes() >= 1) && (createDate.getMinutes() <= 9)) ? "0" + createDate.getMinutes() : createDate.getMinutes();
};  

//date format day
let readyDay = function(fullDate){
    let createDate = new Date(fullDate);
    return finDay = ((createDate.getDate() >= 1) && (createDate.getDate() <= 9)) ? "0" + createDate.getDate() : createDate.getDate();
};  

//date format month
let readyMonth = function(fullDate){    
    let createDate = new Date(fullDate);
    return finMonth = ((createDate.getMonth() >= 0) && (createDate.getMonth() <= 8)) 
        ? "0" + (createDate.getMonth()+1) 
        : (createDate.getMonth() == 9) ? 10 
        : (createDate.getMonth() == 10) ? 11
        : (createDate.getMonth() == 11) ? 12 : null;          
}; 

//ready full date
let readyFullDate = (fullDate, reverse) => {
    let dateRegFull = new Date(fullDate);
    let dateRegFullEmpty = new Date();
    if (reverse === 'r'){
        return dateReg = ((fullDate === '') || (fullDate === undefined)) 
            ? dateRegFullEmpty.getHours() + ":" + readyMin(dateRegFullEmpty) + " " + readyDay(dateRegFullEmpty) + "-" + readyMonth(dateRegFullEmpty) + "-" + dateRegFullEmpty.getFullYear() 
            : dateRegFull.getHours() + ":" + readyMin(dateRegFull) + " " + readyDay(dateRegFull) + "-" + readyMonth(dateRegFull) + "-" + dateRegFull.getFullYear();
    } else {
        return dateReg = ((fullDate === '') || (fullDate === undefined))
            ? dateRegFullEmpty.getHours() + ":" + readyMin(dateRegFullEmpty) + " " + dateRegFullEmpty.getFullYear() + "-" + readyMonth(dateRegFullEmpty) + "-" + readyDay(dateRegFullEmpty)
            : dateRegFull.getHours() + ":" + readyMin(dateRegFull) + " " + dateRegFull.getFullYear() + "-" + readyMonth(dateRegFull) + "-" + readyDay(dateRegFull);
    }
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

//check proof token
let checkProof = (req, res, fun) => {
    con.query(`SELECT userid FROM users WHERE token = '${clienttoken(req, res)}'`, (err, result) => {
        if (err) {
            $_log('err', err, 'err', res); 
        } else {            
            result == '' ? $_log('err', err, 'err', res) : fun(req, res, result[0].userid);
        };
    });            
};

//SQL query
let sqlquery = (req, res, sql, errmess, emptyres, fun, noerr) => {  
    con.query(sql, (err, result) => {
        if (noerr === 'noerr') {
            if (!err) { 
                fun(req, res, result);
            }
        } else {
            if (err) { 
                $_log(errmess, err, emptyres, res); 
            } else {
                if (result == ''){ 
                    $_log(errmess, emptyres, emptyres, res); 
                } else {  
                    fun(req, res, result);
                };
            };
        };
    });            
};

//check proof token
let readyAva = (ava) => {
    if ((/^http:/i.test(ava)) || (/^https:/i.test(ava))){
        return avaurl = `${ava}`;
    } else {
        return avaurl = ((ava === null) || (ava === '') || (ava === undefined)) ? `./img/ava_empty.jpg` : `./uploads/${ava}`;
    }            
};

//create table for user friends
let createTable = (getuserid, type) => {
    let sql;
    if (type === 'friend') {
        sql = `CREATE TABLE friends_${getuserid} (id INT AUTO_INCREMENT PRIMARY KEY,
            userid VARCHAR(100),
            friendid VARCHAR(100),
            friendstatus VARCHAR(10),
            friendvisit VARCHAR(10),
            friendadd DATE                           
            )`; 
    } else if (type === 'message') {
        sql = `CREATE TABLE message_${getuserid} (id INT AUTO_INCREMENT PRIMARY KEY,
            userid VARCHAR(100),
            talkwith VARCHAR(100),
            messagefrom VARCHAR(10),
            message VARCHAR(900),
            datesend VARCHAR(20),
            readed VARCHAR(6),
            dateread VARCHAR(20), 
            edited VARCHAR(6),
            dateedit VARCHAR(20),
            deleted VARCHAR(6),
            datedel VARCHAR(20),
            dzin VARCHAR(5)
            )`;  
    } else if (type === 'blog') {
        sql = `CREATE TABLE blog_${getuserid} (id INT AUTO_INCREMENT PRIMARY KEY,
            userid VARCHAR(100),
            postfromid VARCHAR(100),
            post VARCHAR(4000),
            postimg1 VARCHAR(200),
            postimg2 VARCHAR(200),
            postimg3 VARCHAR(200),
            postimg4 VARCHAR(200),
            postimg5 VARCHAR(200),
            postimg6 VARCHAR(200),
            postid VARCHAR(30) UNIQUE,
            postdate VARCHAR(20),
            perepostfromid VARCHAR(100),
            perepostdate VARCHAR(20),
            perepostid VARCHAR(30)
            )`; 
    } else if (type === 'like') {
        sql = `CREATE TABLE like_${getuserid} (id INT AUTO_INCREMENT PRIMARY KEY,
            likeuserid VARCHAR(100),
            likepostid VARCHAR(50),
            liketype VARCHAR(20),
            comment VARCHAR(400),
            datecomment VARCHAR(20)
            )`; 
    }      
    con.query(sql, function (err, result) {
        err ? $_log(`err-create-table-${type}`, err.code) : $_log(`table-${type}-created`, result.protocol41);
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
        activee: `noactive`,
        title:``
    });
}

module.exports = {
    translit,
    token,
    clienttoken,
    checOnTrueVal,
    accessLog,
    createTable,
    renderIfErrAutoriz,
    $_log,
    readyFullDate,
    checkProof,
    readyAva,
    sqlquery
};