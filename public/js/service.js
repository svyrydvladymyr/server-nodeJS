let SE = (() => {

// function for get id node
    let $ = val => getid = document.getElementById(val);

// function for get id node
    let redirect = route => window.location.href = route;

// function for get object from (*.json) file
    let getLanguage = function(namefile) {
        var file = new XMLHttpRequest();
        file.onreadystatechange = function() {
            if (file.readyState === 4 && file.status == "200") {
                let data = JSON.parse(file.responseText);
                //set innerHTML
                for (let id in data) {if (SE.$(id)) {SE.$(id).innerHTML = data[id]}}
                //set placeholder
                for (let id in data.placeholder) {if (SE.$(id)) {SE.$(id).placeholder = data.placeholder[id]}}
                //set innerHTML to label
                for (let id in data.label) {if (SE.$(id)) {SE.$(id).innerHTML = data.label[id]}}
            }
        };
        file.open("GET", namefile, true);
        file.send(null);
    }; 

//for send AJAX  
    let send = (obj, url, fun) => {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                fun(this.responseText);
            }};
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(JSON.stringify(obj));
    };   
    
//cut incorrect symbol 
    let incorrectCheck = function(val, reg, fun){
        let newReg = new RegExp(reg, "gi");
        let input = SE.$(val).value;
        let res = input.replace(newReg, '');
        if ((val === "reg-name")||(val === "reg-surname")){
            SE.$(val).value = res.charAt(0).toUpperCase() + res.slice(1);
            fun();
        } else if (val === "reg-file"){
            fun();
        } else {
            SE.$(val).value = res;
            fun();
        }
    };

//date format day
    let readyDay = function(fullDate){
        let finDay, createDate;
        createDate = new Date(fullDate);
        return finDay = ((createDate.getDate() >= 1) && (createDate.getDate() <= 9)) ? "0" + createDate.getDate() : createDate.getDate();
    };  

//date format month
    let readyMonth = function(fullDate){    
        let createDate;
        createDate = new Date(fullDate);
        if ((createDate.getMonth() >= 0) && (createDate.getMonth() <= 8)) {
            return finMonth = "0" + (createDate.getMonth()+1);
        } else if (createDate.getMonth() == 9){            
            return finMonth = 10;
        } else if (createDate.getMonth() == 10){            
            return finMonth = 11;
        } else if (createDate.getMonth() == 11){            
            return finMonth = 12;
        }            
    }; 
    
//ready full date
    let readyFullDate = (fullDate, reverse) => {
        let dateRegFull = new Date(fullDate);
        let dateRegFullEmpty = new Date();
        if (reverse === 'r'){
            if ((fullDate === '') || (fullDate === undefined)){
                return dateReg = SE.readyDay(dateRegFullEmpty) + "-" + SE.readyMonth(dateRegFullEmpty) + "-" + dateRegFullEmpty.getFullYear();
            } else {
                return dateReg = SE.readyDay(dateRegFull) + "-" + SE.readyMonth(dateRegFull) + "-" + dateRegFull.getFullYear();
            }
        } else {
            if ((fullDate === '') || (fullDate === undefined)){
                return dateReg = dateRegFullEmpty.getFullYear() + "-" + SE.readyMonth(dateRegFullEmpty) + "-" + SE.readyDay(dateRegFullEmpty);
            } else {
                return dateReg = dateRegFull.getFullYear() + "-" + SE.readyMonth(dateRegFull) + "-" + SE.readyDay(dateRegFull);
            }
        }
    };     

//transliteration    
    let rus_to_latin = ( str ) => {    
        var ru = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
            'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
            'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
            'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
            'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
            'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'}, n_str = [];        
        str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');        
        for ( var i = 0; i < str.length; ++i ) {
           n_str.push(
                  ru[ str[i] ]
               || ru[ str[i].toLowerCase() ] == undefined && str[i]
               || ru[ str[i].toLowerCase() ].replace(/^(.)/, function ( match ) { return match.toUpperCase() })
           );
        }        
        return n_str.join('');
    } 
    
//change icon
    let iconON = function(idF, on, message){
        if (on == "true"){
            SE.$(`${idF}-mess`).classList.remove('reg-message-false');     
            SE.$(`${idF}-mess`).classList.add('reg-message-true');     
            SE.$(`${idF}-mess`).innerHTML = '';
        } else if (on == "false") {
            SE.$(`${idF}-mess`).classList.remove('reg-message-true');     
            SE.$(`${idF}-mess`).classList.add('reg-message-false');
            SE.$(`${idF}-mess`).innerHTML = message;
        }
    };  

//login and passsword autorisation exclusion  
    let checkAutorisation = (idf, reg, reg2) => {
        let newReg = new RegExp(reg, "gi");
        let input = SE.$(idf).value;
        let res = input.replace(newReg, '');
        SE.$(idf).value = res;        
        if (new RegExp(reg2, "gi").test(SE.$(idf).value) == true) {
            SE.$('login-message').innerHTML = '';
            SE.$('login-message').style.display = 'none'; 
        } else {
            SE.$('login-message').style.display = 'table';
            SE.$('login-message').innerHTML = MESS.errorFormMessage().autorisOnlyletters;
        }
    }

//show preview foto     
    let readURL = (type) => {
        if (SE.$('reg-file').files && SE.$('reg-file').files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                if (type === 'm'){
                    let url = e.target.result;
                    let sett = SE.$('ava-preview-foto').style.backgroundPosition;
                    SE.$('ava').style.backgroundPosition = sett;
                    SE.updateAvaToDB(url, sett);
                } else if (type === 'r'){
                    SE.$('reg-ava').setAttribute("style", `background-image: url("${e.target.result}")`)
                }
            }          
            reader.readAsDataURL(SE.$('reg-file').files[0]);
            setTimeout(() => {
                if (type === 'r'){
                    SE.$("reg-form-send").addEventListener("click", SE.messageSendError);
                    SE.$("reg-form-send").classList.add('reg_send_active');
                    SE.$("reg-form-send").style.cursor = 'pointer'; 
                    SE.$('reg-ava').style.display = 'table';
                    SE.$('reg-ava').style.backgroundPosition = SE.$('ava-preview-foto').style.backgroundPosition;
                    regProto.prototype.avasettings = SE.$('ava-preview-foto').style.backgroundPosition;
                    SE.$('ava-preview-foto').setAttribute("style", `background-image: url("")`)                  
                }
            },500);
        }
    }

//show preview foto     
    let readURLPreview = () => {
        SE.$('ava-preview-foto').setAttribute("style", `background-image: url("")`)
        if (SE.$('reg-file').files && SE.$('reg-file').files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) { SE.$('ava-preview-foto').setAttribute("style", `background-image: url("${e.target.result}")`)};          
            reader.readAsDataURL(SE.$('reg-file').files[0]);
        }
    }

//confirm preview ava
    let confirmPreview = (type) => {
        if (type === 'm'){
            SE.$('ava-preview-wrap-main').style.display = 'none';
        } else if (type === 'r'){
            SE.$('ava-preview-wrap').style.display = 'none';
        }
        SE.$('horizontally').value = '50%';
        SE.$('vertical').value = '50%';
        SE.readURL(type); 
    }

//confirm preview ava close
    let confirmPreviewClose = (type) => {
        SE.$('horizontally').value = '50%';
        SE.$('vertical').value = '50%';
        SE.$('ava-preview-foto').setAttribute("style", `background-image: url("")`)
        if (type === 'm'){
            SE.$('ava-preview-wrap-main').style.display = 'none'; 
            SE.$('reg-file').type = "text";
            setTimeout(() => { SE.$('reg-file').type = "file" },100);
        } else if (type === 'r'){
            if (SE.$('reg-ava').style.backgroundImage === ''){ SE.$('reg-file-mess').style.display = 'table' };
            SE.$('ava-preview-wrap').style.display = 'none'; 
            SE.$('reg-ava').setAttribute("style", `background-image: url("")`);
            SE.clearFileInput();
        }
    };

//clear file input
    let clearFileInput = () => {
        SE.$('reg-file').type = "text";
        setTimeout(() => {
            SE.$('ava-preview-foto').setAttribute("style", `background-image: url("")`)
            SE.$('reg-ava').setAttribute("style", `background-image: url("")`)
            SE.$('reg-ava').style.display = 'none';
            SE.$('horizontally').value = '50%';
            SE.$('vertical').value = '50%';
            SE.$('reg-file-mess').style.display = 'table';
            SE.$('reg-file-mess').innerHTML = '';
            SE.iconON('reg-file', "true", '');         
            SE.$('reg-file').type = "file";
            regProto.prototype.avasettings = '';
        },100);
    }    

//function for make prototype for send obgect
    let readyToSend = function(idF, value){
        console.log(regProto.prototype);        
        let idReplace = idF.replace(/[\-]/gi, "");
        regProto.prototype[idReplace] = value;
        //for change button
        if (SE.$('reg-form-send').getAttribute('param') === 'add'){
            if (((regPrototype.reglogin !== "") && (regPrototype.reglogin !== undefined)) &&
            ((regPrototype.regpassword !== "") && (regPrototype.regpassword !== undefined)) &&
            ((regPrototype.regname !== "") && (regPrototype.regname !== undefined)) && 
            ((regPrototype.regsurname !== "") && (regPrototype.regsurname !== undefined)) && 
            ((regPrototype.regemail !== "") && (regPrototype.regemail !== undefined))        
            ){
                SE.$("reg-form-send").classList.add('reg_send_active');
                SE.$("reg-form-send").style.cursor = 'pointer';
                SE.$("reg-form-send").addEventListener("click", SE.messageSendError); 
            } else {
                SE.$("reg-form-send").classList.remove('reg_send_active');
                SE.$("reg-form-send").style.cursor = 'no-drop';            
            }
        }
    }; 
 
//clear message if not empty name surname or E-mail input
    let messageSendErrorClear = () => {
        if ((SE.$('reg-login').value !== "") && (SE.$('reg-password').value !== "") && (SE.$('reg-name').value !== "") && (SE.$('reg-surname').value !== "") && (SE.$('reg-email').value !== "")){
            SE.$("main-form-message").innerHTML = "";
        }
    }

//message if empty name surname or E-mail input
    let messageSendError = () => {
        if (SE.$('reg-form-send').getAttribute('param') === 'add'){
            if ((SE.$('reg-login').value === "") || (SE.$('reg-password').value === "") ||(SE.$('reg-name').value === "") || (SE.$('reg-surname').value === "") || (SE.$('reg-email').value === "")){
                let masIdRequired = ['reg-login', 'reg-password', 'reg-name', 'reg-surname', 'reg-email',];
                for(let i = 0; i < 5; i++){
                    if ((regPrototype.reglogin === "") || (SE.$(masIdRequired[i]).value === '')){
                        SE.iconON(masIdRequired[i], "false", MESS.errorFormMessage().notCunEmpty);
                    }
                }       
                SE.$("main-form-message").innerHTML = MESS.errorFormMessage().allInputs;
            } 
            if ((SE.$('reg-login').value !== "") && (SE.$('reg-password').value !== "") && (SE.$('reg-name').value !== "") && (SE.$('reg-surname').value !== "") && (SE.$('reg-email').value !== "")){
                SE.$("main-form-message").innerHTML = "";
                SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                SE.$("reg-form-send").classList.remove('reg_send_active');
                SE.$("reg-form-send").style.cursor = 'no-drop'; 
                SE.registerUserToDB();
            }
        } 
    };    

//show main message    
    let showErrorMainMess = () => {
        SE.$("main-form-message").innerHTML = '';
        SE.$('reg-login').removeEventListener('change', SE.showErrorMainMess);
        SE.$('reg-email').removeEventListener('change', SE.showErrorMainMess);
    };
    
// function for add user ava to DB
    let addAvaToDB = function(){
        let obj, fileAva, formData;
        obj = (regPrototype.avasettings === '') ? { "avasettings":"50% 50%"} : { "avasettings":regPrototype.avasettings};
        fileAva = document.getElementById('reg-file').files;      
        formData = new FormData();
        formData.append("objreg",JSON.stringify(obj));
        for(let i = 0; i < fileAva.length; i++){
            formData.append("file",fileAva[i]);
        } 
        let contenttype = {headers:{"Content-type": "multipart/form-data"}}  
        axios.post('/addavatodb', formData, contenttype)
        .then(function (response) {              
            if (response.request.readyState == 4 && response.request.status == "200") {  
                SE.$("main-form-message").innerHTML = MESS.errorFormMessage().registrationGood;
                setTimeout(() => {
                    SE.$("main-form-message").innerHTML = '';
                    // CLEAR.clearRegProto();
                    SE.redirect(`/${response.data.userid}`);
                }, 1000);
            }
        })
        .catch(function (error) { console.log(error) });
    };

// function for add user ava to DB
    let updateAvaToDB = function(url, sett){
        let obj, fileAva, formData, avaset;
        avaset = SE.$('ava').style.backgroundPosition;
        obj = { "avasettings":avaset};
        fileAva = document.getElementById('reg-file').files;      
        formData = new FormData();
        formData.append("objreg",JSON.stringify(obj));
        for(let i = 0; i < fileAva.length; i++){
            formData.append("file",fileAva[i]);
        } 
        let contenttype = {headers:{"Content-type": "multipart/form-data"}}  
        axios.post('/updateavatodb', formData, contenttype)
        .then(function (response) {                    
            if (response.request.readyState == 4 && response.request.status == "200") {  
                SE.$('ava').setAttribute("style", `background-image: url("${url}")`);
                SE.$('ava').style.backgroundPosition = sett;
            }
        })
        .catch(function (error) { console.log(error) });
    };   

// function for add user to DB
let registerUserToDB = function(){
    let obj;
    obj = { "login":regPrototype.reglogin, 
            "password":regPrototype.regpassword, 
            "name":regPrototype.regname, 
            "surname":regPrototype.regsurname, 
            "email":regPrototype.regemail, 
            "birthday":regPrototype.regage, 
            "phone":regPrototype.regtel, 
            "message":regPrototype.regmessage, 
            "country":regPrototype.regcountry, 
            "town":regPrototype.regtown, 
            "profession":regPrototype.regprofession, 
            "education":regPrototype.regeducation, 
            "registrdata":regPrototype.registr,
            "avasettings":regPrototype.avasettings};
        SE.send(obj, "/registrationUser", VW.registerUserToDB);
    };

//show users list
    let showUsersList = (el) => {
        if (el.value.length > 1){
            SE.$('userlist').style.display = 'flex';
            let searchuser = el.value;
            let obj = { "searchuser":searchuser};
            SE.send(obj, "/searchuser", VW.showUsersList);
        } else {
            SE.$('userlist').style.display = 'none';
        }
    };       
    
//save settings to DB   
    let saveSett = () => {
        let obj = { 
            "main":localStorage.kalcifermaincolor,
            "second":localStorage.kalcifersecondcolor,
            "bg":localStorage.kalciferbgcolor,
            "tl":localStorage.kalcifertopleft,
            "tr":localStorage.kalcifertopright,
            "bl":localStorage.kalciferbottomleft,
            "br": localStorage.kalciferbottomright,
            "font": localStorage.kalciferfont,
            "lang": localStorage.kalciferLang}; 
        SE.send(obj, "/savesett", VW.saveSett); 
    };    

//for exit from session    
    let exit = () => { SE.send({}, "/exit", VW.exit) };

//update security and enter
    let updateUser = (val) => {
        if (val === 's'){
            let obj = { "login":regPrototype.regloginup, 
                        "oldpassword":regPrototype.regoldpassword, 
                        "password":regPrototype.regpassword};            
            if ((regPrototype.regpassword !== '') && (regPrototype.regoldpassword === '')){
                SE.iconON('reg-oldpassword', "false", MESS.errorFormMessage().enterPassword);
            }else if ((regPrototype.regloginup !== '') && (regPrototype.regoldpassword === '')){
                SE.iconON('reg-oldpassword', "false", MESS.errorFormMessage().enterPassword);
            } else if ((regPrototype.regpassword === regPrototype.regoldpassword) && (regPrototype.regoldpassword !== '')){
                SE.$('main-form-message1').innerHTML = MESS.errorFormMessage().notSame;
            } else if (((regPrototype.regloginup !== '') && (regPrototype.regoldpassword !== '')) || 
            ((regPrototype.regpassword !== regPrototype.regoldpassword) && (regPrototype.regpassword !== '') && (regPrototype.regoldpassword !== '')) || 
            ((regPrototype.regpassword !== regPrototype.regoldpassword) && (regPrototype.regpassword !== '') && (regPrototype.regoldpassword !== '') && (regPrototype.regloginup !== ''))){
            SE.send(obj, '/updatesecurity', VW.updateSecurity);   
            }
        } else if (val === 'm'){
            let obj = {"name":regPrototype.regname, 
                        "surname":regPrototype.regsurname, 
                        "email":regPrototype.regemail, 
                        "birthday":regPrototype.regage, 
                        "phone":regPrototype.regtel, 
                        "message":regPrototype.regmessage};
            if ((regPrototype.regname !== '') || (regPrototype.regsurname !== '') || (regPrototype.regemail !== '') || (regPrototype.regage !== '') || (regPrototype.regtel !== '') || (regPrototype.regmessage !== '')){
                SE.send(obj, '/updatemain', VW.updateMain);                
            }
        } else if (val === 'o'){
            let obj = {"country":regPrototype.regcountry, 
                        "town":regPrototype.regtown, 
                        "profession":regPrototype.regprofession,
                        "education":regPrototype.regeducation};
            if ((regPrototype.regcountry !== '') || (regPrototype.regtown !== '') || (regPrototype.regprofession !== '') || (regPrototype.regeducation !== '')){
                SE.send(obj, '/updateother', VW.updateOther);                
            }
        }
    };  

    return {
        $, 
        getLanguage,
        redirect,
        send,
        incorrectCheck,
        readyToSend,
        registerUserToDB,
        iconON,
        readyDay,
        readyMonth,
        messageSendError,
        messageSendErrorClear,
        rus_to_latin,
        readURL,
        readyFullDate,
        readURLPreview,
        confirmPreview,
        confirmPreviewClose,
        clearFileInput,
        addAvaToDB,
        showErrorMainMess,
        checkAutorisation,
        exit,
        updateUser,
        send,
        showUsersList,
        saveSett,
        updateAvaToDB
    };
})();    