let con = require('../db/connectToDB').con;

let {translit, token} = require('./service');

class protoUsers{constructor(){ }}
let prUs = new protoUsers();

let checkObjValues = (reg, val, mess, parseObjUsers, res) => {
    if (new RegExp(reg, "gi").test(parseObjUsers[val]) == true){
        prUs[val] = parseObjUsers[val];
    } else {
        res.status(404).send(mess);
    }
};

let registrationUsers = (req, res) => {     

    let parseObjUsers = JSON.parse(req.body.objreg);
    console.log("body", JSON.parse(req.body.objreg));
    console.log("files", req.file);

//if file are, set name file to proto obj
    if (req.file !== undefined){
        console.log("files", req.file.originalname);
        console.log("files", req.file.filename);
        prUs.ava = req.file.filename;
        checkObjValues("^[0-9%]+$", "avasettings", "Bad ava parameters!", parseObjUsers, res);
    }
//set registration date     
    checkObjValues("^[0-9-]+$", "registrdata", "Bad registration date!", parseObjUsers, res);
//check login
    checkObjValues("^[a-zA-Z0-9-_]+$", "login", "Bad login!", parseObjUsers, res);
//check password
    checkObjValues("^[a-zA-Z0-9-_]+$", "password", "Bad password!", parseObjUsers, res);
//check name 
    checkObjValues("^[a-zA-Zа-яА-Я]+$", "name", "Bad name!", parseObjUsers, res);
//check surname 
    checkObjValues("^[a-zA-Zа-яА-Я]+$", "surname", "Bad surname!", parseObjUsers, res);
//check email 
    checkObjValues("^[a-zA-Z0-9@-_.]+$", "email", "Bad email!", parseObjUsers, res);
//check birthday 
    checkObjValues("^[0-9-]+$", "birthday", "Bad birthday!", parseObjUsers, res);
//check phone 
    checkObjValues("^[0-9+]+$", "phone", "Bad phone!", parseObjUsers, res);
//check message 
    checkObjValues("^[0-9+]+$", "message", "Bad message!", parseObjUsers, res);
//check country 
    checkObjValues("^[a-zA-Zа-яА-ЯіІ-]+$", "country", "Bad country!", parseObjUsers, res);
//check town 
    checkObjValues("^[a-zA-Zа-яА-ЯіІє-]+$", "town", "Bad town!", parseObjUsers, res);
//check profession 
    checkObjValues("^[a-zA-Zа-яА-Я-]+$", "profession", "Bad profession!", parseObjUsers, res);

    

    console.log("proto----", prUs);



    // res.send({"res":"sours"});

};



module.exports = {
    registrationUsers
    
};