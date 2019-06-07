let SE = (() => {

    // function for get id node
    let $ = function(val) {
        return getid = document.getElementById(val);
    };

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
    
//clone phone number
    let clonePhoneNumber = () => {
        let phoneNum = SE.$('reg-tel').value;
        if ((phoneNum !== '') && (phoneNum.length === 10) && (/^[0-9]+$/g.test(phoneNum))){
            SE.$('reg-message_cod').value = SE.$('reg-tel_cod').value;
            SE.$('reg-message').value = SE.$('reg-tel').value;
            SE.iconON('reg-message', "true", '');
            SE.readyToSend('reg-message', SE.$('reg-message').value); 
        }        
    }; 

//make AJAX request
    let send = function(objUrlSend){
        let {obj, urlSend} = objUrlSend;
        return new Promise(function(resolve, reject){
            dbParam = JSON.stringify(obj);
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let responses = this.responseText;
                    (responses != "[]") ? resolve(responses) : reject("Помилка авторизації!!!");
                }
            };
            xmlhttp.open("GET", urlSend + dbParam, true);
            xmlhttp.send();
        });
    };

//cut incorrect symbol 
    let incorrectCheck = function(val, reg, fun){
        let newReg = new RegExp(reg, "gi");
        let input = SE.$(val).value;
        let res = input.replace(newReg, '');
        if ((val === "reg-name")||(val === "reg-surname")){
            SE.$(val).value = res.charAt(0).toUpperCase() + res.slice(1);
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
        if ((createDate.getDate() >= 1) && (createDate.getDate() <= 9)) {            
            return finDay = "0" + createDate.getDate();
        } else {
            return finDay = createDate.getDate();
        }
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
    
//function for make prototype for send obgect
    let readyToSend = function(idF, value){
        console.log(regProto.prototype);
        
        //replace (-) and push to prototype
        let idReplace = idF.replace(/[\-]/gi, "");
        regProto.prototype[idReplace] = value;
        //for change button
        if (((regPrototype.reglogin != "") && (regPrototype.reglogin != undefined)) &&
        ((regPrototype.regpassword != "") && (regPrototype.regpassword != undefined)) &&
        ((regPrototype.regname != "") && (regPrototype.regname != undefined)) && 
        ((regPrototype.regsurname != "") && (regPrototype.regsurname != undefined)) && 
        ((regPrototype.regemail != "") && (regPrototype.regemail != undefined))        
        ){
            SE.$("reg-form-send").classList.add('reg_send_active');
            SE.$("reg-form-send").style.cursor = 'pointer';
            SE.$("reg-form-send").addEventListener("click", SE.sendToDB); 
        } else {
            SE.$("reg-form-send").classList.remove('reg_send_active');
            SE.$("reg-form-send").style.cursor = 'no-drop';            
        }
    }; 
    
    // function for add to DB
    let addToDB = function(){
        SE.$("send").removeEventListener("click", SE.sendToDB);
        let obj, priseResult, urlToDB, dbParam, xmlhttp;
        //set price for guest or worker
        (sendReadyObg.addstatusgгest == "worker") ? priseResult = sendReadyObg.price / 2 : priseResult = sendReadyObg.price;
        //set url for send
        (sessionStorage.arnikatabs == "two") ? urlToDB = "php/addToDbTwo.php?x=" : 
        (sessionStorage.arnikatabs == "three") ? urlToDB = "php/addToDbThree.php?x=" : SE.errorAutorization();        
        //make iteration 
        let day = 0;
        for(let i = 0; i < sendReadyObg.addkilk; i++){
            let startdata = new Date(sendReadyObg.addstartdata);
            //add day
            let nextday = new Date(startdata.getFullYear(),startdata.getMonth(),startdata.getDate()+day);
            day = day + 1;
            //format date
            let resDateDZ = nextday.getFullYear() + "-" + SE.readyMonth(nextday) + "-" + SE.readyDay(nextday);
            obj = { "name":sendReadyObg.addname, 
                    "surname":sendReadyObg.addsurname, 
                    "tel":sendReadyObg.addtel, 
                    "number":sendReadyObg.addnomer, 
                    "dz":resDateDZ, 
                    "kilk":sendReadyObg.addkilk, 
                    "price":priseResult, 
                    "buking":sendReadyObg.addstatuszamovl, 
                    "tip":sendReadyObg.addstatusgгest, 
                    "admin":sendReadyObg.admin, 
                    "datazapovn":sendReadyObg.registr, 
                    "login":sessionStorage.arnikalogin, 
                    "password":sessionStorage.arnikapassword};
            dbParam = JSON.stringify(obj);
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {                    
                    SE.setMessage("autoriz-message-wrap", "none", "", ""); 
                    (this.responseText.trim() == "") ? VW.addToDB() : SE.setMessage("message-send", "table", "red", `${this.responseText}`);
                }
            };
            xmlhttp.open("GET", urlToDB + dbParam, true);
            xmlhttp.send();
        };            
    };    


    return {
        $, 
        getLanguage,
        redirect,
        clonePhoneNumber,
        send,
        incorrectCheck,
        iconON,
        readyToSend,
        addToDB,
        readyDay,
        readyMonth
    };
})();    