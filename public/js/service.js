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
//-----------------------------------------------------------------------------------------------------
//-------------------------function for form-----------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

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
    
//error form message    
    let errorFormMessage = () => {
        if (localStorage.kalciferLang === "ua"){
            let allInputs = "Заповніть всі обов'язкові поля!";
            let notCunEmpty = 'Не може бути пустим!';
            let notCorectNum = 'Некоректний номер!';
            let notCorectVar = 'Некоректне значення!';
            let checkPass = 'Перевірте пароль!';
            let repeatPass = 'Повторіть пароль!';
            let onlyNum = "Тільки цифри!";
            let onlyLetters = "Тільки букви!";
            let toLBigFile = "Занадто великий файл! Макс. розмір 1мб";
            let dupllogin = "Користувач з таким логіном вже існує!";
            let duplemail = "Користувач з такою поштою вже існує!";
            let toshort = "Мінімум 7 символів!";
            let registrationGood = "Реєстрація успішна!";
            let autorisNotEmpty = "Заповніть всі поля!";
            let autorisOnlyletters = "Тільки лат. букви та цифри!";
            let autorisNotAvtoris = "Логін або пароль не вірні!";
            return {
                notCunEmpty,
                notCorectNum,
                notCorectVar,
                checkPass,
                repeatPass,
                onlyNum,
                onlyLetters,
                allInputs,
                toLBigFile,
                dupllogin,
                duplemail,
                toshort,
                registrationGood,
                autorisNotEmpty,
                autorisOnlyletters,
                autorisNotAvtoris
            };
        } else if (localStorage.kalciferLang === "en"){
            let allInputs = "Fill in all required fields!";
            let notCunEmpty = 'It can not be empty!';
            let notCorectNum = 'Not a valid number!';
            let notCorectVar = 'Invalid value!';
            let checkPass = 'Check your password!';
            let repeatPass = 'Repeat password!';
            let onlyNum = "Only numbers!";
            let onlyLetters = "Only letters!";
            let toLBigFile = "Too large file! Max. size 1MB";
            let dupllogin = "A user with this login already exists!";
            let duplemail = "A user with such mail already exists!";
            let toshort = "Minimum of 7 characters!";
            let registrationGood = "Registration is successful!";
            let autorisNotEmpty = "Fill in all fields!";
            let autorisOnlyletters = "Only letters and numbers!";
            let autorisNotAvtoris = "Login or pass. is incorrect!";
            return {
                notCunEmpty,
                notCorectNum,
                notCorectVar,
                checkPass,
                repeatPass,
                onlyNum,
                onlyLetters,
                allInputs,
                toLBigFile,
                dupllogin,
                duplemail,
                toshort,
                registrationGood,
                autorisNotEmpty,
                autorisOnlyletters,
                autorisNotAvtoris
            };
        }
    };    
    
//clone phone number
let clonePhoneNumber = () => {
    let phoneNum = SE.$('reg-tel').value;
    if ((phoneNum !== '') && (phoneNum.length === 10) && (/^[0-9]+$/g.test(phoneNum))){
        SE.$('reg-message_cod').value = SE.$('reg-tel_cod').value;
        SE.$('reg-message').value = SE.$('reg-tel').value;
        SE.iconON('reg-message', "true", '');
        SE.readyToSend('reg-message', SE.$(`reg-message_cod`).options[SE.$(`reg-message_cod`).selectedIndex].text + SE.$('reg-message').value); 
    }        
}; 

//phone and message exclusion
    let checkPhoneAndMessInput = (idF) => {
        if (SE.$(idF).value.length != 10) {
            SE.iconON(idF, "false", SE.errorFormMessage().notCorectNum);
            SE.$("reg-form-send").removeEventListener("click", SE.messgeSendError);
            SE.readyToSend(idF, "");
        } else {
            // let phoneReady = SE.$(`${idF}_cod`).options[SE.$(`${idF}_cod`).selectedIndex].text + SE.$(idF).value;
            SE.readyToSend(idF, SE.$(`${idF}_cod`).options[SE.$(`${idF}_cod`).selectedIndex].text + SE.$(idF).value);
            SE.$("reg-form-send").addEventListener("click", SE.messgeSendError); 
        }
    }

//country or town exclusion
    let checkCountryInput = (idF) => {
        let b = SE.$(idF);
        let gгest = b.options[b.selectedIndex].text;
        if (gгest != ""){
            SE.iconON(idF, "true", '');    
            SE.readyToSend(idF, b.options[b.selectedIndex].text);
            SE.$("reg-form-send").addEventListener("click", SE.messgeSendError);
            if (idF === 'reg-country'){
                SE.readyToSend('reg-town', '');
                let getTownId = SE.$('reg-town');
                let getSelectedCountry = SE.$(idF).value;
                getTownId.innerHTML = `<option disabled selected></option>`;
                if (localStorage.kalciferLang === "ua"){
                    for (let i = 0; i < towns_ua[getSelectedCountry].length; i++){
                        let translitID = SE.rus_to_latin(towns_ua[getSelectedCountry][i])
                        getTownId.innerHTML += `<option value="${translitID}" id="${translitID}">${towns_ua[getSelectedCountry][i]}</option>`;
                    }
                } else if (localStorage.kalciferLang === "en"){
                    for (let i = 0; i < towns_en[getSelectedCountry].length; i++){
                        let translitID = SE.rus_to_latin(towns_en[getSelectedCountry][i])
                        getTownId.innerHTML += `<option value="${translitID}" id="${translitID}">${towns_en[getSelectedCountry][i]}</option>`;
                    }
                }
            } 
        } else {
            SE.iconON(idF, "false", '');
            SE.$("reg-form-send").removeEventListener("click", SE.messgeSendError);
            SE.readyToSend(idF, "");
        }
    }

//password exclusion
    let checkPasswordInput = (idF) => {
        if ((SE.$("reg-password").value !== '') && (SE.$("reg-password-two").value !== '')){
            if (SE.$('reg-password').value === SE.$('reg-password-two').value){
                SE.iconON('reg-password', "true", '');
                SE.readyToSend('reg-password', SE.$('reg-password').value);
                SE.$("reg-form-send").addEventListener("click", SE.messgeSendError); 
            } else {
                SE.iconON("reg-password", "false", SE.errorFormMessage().checkPass);
                SE.readyToSend('reg-password', '');
                SE.$("reg-form-send").removeEventListener("click", SE.messgeSendError);
            }                            
        } else {
            SE.iconON("reg-password", "false", SE.errorFormMessage().repeatPass);
            SE.readyToSend('reg-password', '');
            SE.$("reg-form-send").removeEventListener("click", SE.messgeSendError);
        }
    }
    
//age and email exclusion  
    let checkAgeEmailInput = (idF) => {
        if ((SE.$(idF).validity) && (!SE.$(idF).validity.valid)){
            SE.iconON(idF, "false", SE.errorFormMessage().notCorectVar);
            SE.$("reg-form-send").removeEventListener("click", SE.messgeSendError);
            SE.readyToSend(idF, "");
        } else {
            SE.iconON(idF, "true", '');
            SE.readyToSend(idF, SE.$(idF).value);  
            SE.$("reg-form-send").addEventListener("click", SE.messgeSendError);                            
        }
    }

//-----------------------------------------------------------------------------------------------------
//--------------------------function for autorisation--------------------------------------------------
//-----------------------------------------------------------------------------------------------------
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
            SE.$('login-message').innerHTML = SE.errorFormMessage().autorisOnlyletters;
        }
    }

//-----------------------------------------------------------------------------------------------------
//-------------------------function for work with ava--------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//show preview foto     
    let readURL = () => {
        if (SE.$('reg-file').files && SE.$('reg-file').files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                SE.$('reg-ava').setAttribute("style", `background-image: url("${e.target.result}")`)
            }          
            reader.readAsDataURL(SE.$('reg-file').files[0]);
            setTimeout(() => {
                SE.$("reg-form-send").addEventListener("click", SE.messageSendError);
                SE.$("reg-form-send").classList.add('reg_send_active');
                SE.$("reg-form-send").style.cursor = 'pointer'; 
                SE.$('reg-ava').style.display = 'table';
                SE.$('reg-ava').style.backgroundPosition = SE.$('ava-preview-foto').style.backgroundPosition;
                regProto.prototype.avasettings = SE.$('ava-preview-foto').style.backgroundPosition;
                SE.$('ava-preview-foto').setAttribute("style", `background-image: url("")`)
            },500);
        }
    }

//show preview foto     
    let readURLPreview = () => {
        SE.$('ava-preview-foto').setAttribute("style", `background-image: url("")`)
        if (SE.$('reg-file').files && SE.$('reg-file').files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                SE.$('ava-preview-foto').setAttribute("style", `background-image: url("${e.target.result}")`)
            }          
            reader.readAsDataURL(SE.$('reg-file').files[0]);
        }
    }

//confirm preview ava
    let confirmPreview = () => {
        SE.$('ava-preview-wrap').style.display = 'none';  
        SE.$('horizontally').value = '50%';
        SE.$('vertical').value = '50%';
        SE.readURL(); 
    }

//confirm preview ava close
    let confirmPreviewClose = () => {
        if (SE.$('reg-ava').style.backgroundImage === ''){
            SE.$('reg-file-mess').style.display = 'table';
        }
        SE.$('horizontally').value = '50%';
        SE.$('vertical').value = '50%';
        SE.$('ava-preview-foto').setAttribute("style", `background-image: url("")`)
        SE.$('reg-ava').setAttribute("style", `background-image: url("")`)
        SE.$('ava-preview-wrap').style.display = 'none';  
        SE.clearFileInput();
    }

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

//-----------------------------------------------------------------------------------------------------
//-----------------------check on true or error in input on change-------------------------------------
//-----------------------------------------------------------------------------------------------------    
//check on true or error in input on change, cut all incorrect, show message
    let checkCut = (idF, reg, t) => {
        if (SE.$(idF).value === ""){
            if ((SE.$(idF).id === 'reg-login') || 
                (SE.$(idF).id === 'reg-password') || 
                (SE.$(idF).id === 'reg-name') ||
                (SE.$(idF).id === 'reg-surname') ||
                (SE.$(idF).id === 'reg-email')){
                    SE.iconON(idF, "false", SE.errorFormMessage().notCunEmpty);
                    SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                    SE.$("reg-form-send").classList.remove('reg_send_active');
                    SE.$("reg-form-send").style.cursor = "no-drop";
                    SE.readyToSend(idF, "");
            } else {
                SE.iconON(idF, "true", '');
                SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                SE.$("reg-form-send").classList.remove('reg_send_active');
                SE.$("reg-form-send").style.cursor = "no-drop";
                SE.readyToSend(idF, "");
            }
        } else {
            SE.incorrectCheck(idF, reg, function(){
                if(SE.$(idF).value === ""){
                    if ((SE.$(idF).id === 'reg-login') || 
                        (SE.$(idF).id === 'reg-password') || 
                        (SE.$(idF).id === 'reg-name') ||
                        (SE.$(idF).id === 'reg-surname') ||
                        (SE.$(idF).id === 'reg-email')){
                            SE.iconON(idF, "false", SE.errorFormMessage().notCunEmpty);
                            SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                            SE.$("reg-form-send").classList.remove('reg_send_active');
                            SE.$("reg-form-send").style.cursor = "no-drop";
                            SE.readyToSend(idF, "");
                   } else {
                        SE.readyToSend(idF, "");
                        SE.$(`${idF}-mess`).innerHTML = '';
                        SE.$(`${idF}-mess`).classList.remove('reg-message-false');
                   }
                } else {    
                    if((SE.$(idF).id === "reg-tel") || (SE.$(idF).id === "reg-message")){ 
                        SE.checkPhoneAndMessInput(idF);
                    } else if ((SE.$(idF).id === "reg-password") || (SE.$(idF).id === "reg-password-two")){
                        SE.checkPasswordInput(idF);
                    } else if((SE.$(idF).id === "reg-age") || (SE.$(idF).id === "reg-email")) {
                        SE.checkAgeEmailInput(idF);
                    } else if ((SE.$(idF).id === "reg-country") || (SE.$(idF).id === "reg-town")){
                        SE.checkCountryInput(idF);
                    } else if (SE.$(idF).id === "reg-file"){         
                        if (SE.$(idF).files.length === 1){
                            if (SE.$(idF).files[0].size > 1024000) {
                                SE.iconON(idF, "false", SE.errorFormMessage().toLBigFile);  
                                SE.$('reg-file-mess').style.display = 'table';
                                SE.$('reg-file-mess').style.marginTop = '3px';
                                SE.$('reg-ava').style.display = 'none';
                                SE.$('reg-ava').style.border = '0px solid #e0e0e0'; 
                                SE.$('form_input').style.height = '40px';
                            } else {
                                SE.$('reg-file-mess').style.display = 'none';
                                //show preview
                                SE.$('ava-preview-wrap').style.display = 'flex';
                                SE.readURLPreview();                             
                            }
                        }
                    }else{
                        SE.iconON(idF, "true", '');         
                        SE.readyToSend(idF, SE.$(idF).value);
                        SE.$("reg-form-send").addEventListener("click", SE.messageSendError); 
                    }
                    SE.$("reg-form-send").addEventListener("click", SE.messageSendError); 
                }
            }); 
        }
    };    

//check on true or error in input on input and show message
    let checkTest = (idF, reg, t) => {
        if ((idF === 'login') || (idF === 'password')){
            if (new RegExp(reg, "gi").test(SE.$(idF).value) == true){
                SE.$('login-message').innerHTML = '';
                SE.$('login-message').style.display = 'none';
            } else {
                SE.$('login-message').style.display = 'table';
                SE.$('login-message').innerHTML = SE.errorFormMessage().autorisOnlyletters;         
            }
        } else {
            if (new RegExp(reg, "gi").test(SE.$(idF).value) == true){
                if (idF === 'reg-password-two'){
                    SE.iconON('reg-password', "true", '');
                } else {
                    SE.iconON(idF, "true", '');
                }
            } else {
                if ((SE.$(idF).id == "reg-tel") || (SE.$(idF).id == "reg-message")){
                    SE.iconON(idF, "false", SE.errorFormMessage().onlyNum);
                    SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                    SE.$("reg-form-send").classList.remove('reg_send_active');
                } else {
                    if (SE.$(idF).value === ''){
                        SE.iconON(idF, "true", '');
                        SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                        SE.$("reg-form-send").classList.remove('reg_send_active');
                    } else {
                        SE.iconON(idF, "false", SE.errorFormMessage().onlyLetters);
                        SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                        SE.$("reg-form-send").classList.remove('reg_send_active');
                    }
                }
            }
        }
    };
    
//function for make prototype for send obgect
    let readyToSend = function(idF, value){
        // console.log(regProto.prototype);        
        let idReplace = idF.replace(/[\-]/gi, "");
        regProto.prototype[idReplace] = value;

        console.log(regPrototype);    

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
        } else if (SE.$('reg-form-send').getAttribute('param') === 'up'){



            SE.$("reg-form-send").classList.add('reg_send_active');
            SE.$("reg-form-send").style.cursor = 'pointer';
            SE.$("reg-form-send").addEventListener("click", SE.messageSendError); 


            
        }

    }; 
 
//message if empty name surname or E-mail input
    let messageSendError = () => {
        if (SE.$('reg-form-send').getAttribute('param') === 'add'){
            if ((SE.$('reg-login').value === "") || (SE.$('reg-password').value === "") ||(SE.$('reg-name').value === "") || (SE.$('reg-surname').value === "") || (SE.$('reg-email').value === "")){
                let masIdRequired = ['reg-login', 'reg-password', 'reg-name', 'reg-surname', 'reg-email',];
                for(let i = 0; i < 5; i++){
                    if ((regPrototype.reglogin === "") || (SE.$(masIdRequired[i]).value === '')){
                        SE.iconON(masIdRequired[i], "false", SE.errorFormMessage().notCunEmpty);
                    }
                }       
                SE.$("main-form-message").innerHTML = SE.errorFormMessage().allInputs;
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
        SE.$('reg-login').removeEventListener('change', showErrorMainMess);
        SE.$('reg-email').removeEventListener('change', showErrorMainMess);
    };
    
// function for add user to DB
    let registerUserToDB = function(){
        let obj, xmlhttp;
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
                "registrdata":regPrototype.registr,
                "avasettings":regPrototype.avasettings};
        dbParam = JSON.stringify(obj);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let parseObj = JSON.parse(this.responseText);
                if (parseObj.error === 'duplicate_entry_login'){
                    SE.$("main-form-message").innerHTML = SE.errorFormMessage().dupllogin;
                    SE.$('reg-login').addEventListener('change', showErrorMainMess);
                } else if (parseObj.error === 'duplicate_entry_email'){
                    SE.$("main-form-message").innerHTML = SE.errorFormMessage().duplemail;  
                    SE.$('reg-email').addEventListener('change', showErrorMainMess);
                } else if ((parseObj.affectedRows === 1) && (parseObj.protocol41 === true)){
                    SE.addAvaToDB();
                } else {
                    console.log(this.responseText);
                }
            }
        };
        xmlhttp.open("POST", "/registrationUser", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(dbParam);
    };

// function for add user to DB
    let addAvaToDB = function(){
        let obj, fileAva, formData;
        if (regPrototype.avasettings === ''){
            obj = { "avasettings":"50% 50%"};
        } else {
            obj = { "avasettings":regPrototype.avasettings};
        }
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
                SE.$("main-form-message").innerHTML = SE.errorFormMessage().registrationGood;
                setTimeout(() => {
                    SE.$("main-form-message").innerHTML = '';
                    CLEAR.clearRegProto();
                    SE.redirect(`/${response.data.userid}`);
                }, 2000);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    };    

//for exit from session    
    let exit = () => {
        let obj, xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                localStorage.kalcifermaincolor = '#2d5e8e';
                localStorage.kalcifersecondcolor = '#5c8ab9';
                localStorage.kalciferbgcolor = '#f1f1f1';
                localStorage.kalcifertopleft = 9;
                localStorage.kalcifertopright = 9;
                localStorage.kalciferbottomleft = 9;
                localStorage.kalciferbottomright = 9;
                localStorage.kalciferfont = 'ptsans';
                localStorage.kalciferLang = 'ua';
                location.reload()}};
        xmlhttp.open("POST", "/exit", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(JSON.stringify({}));
    }    


    return {
        $, 
        getLanguage,
        redirect,
        clonePhoneNumber,
        send,
        incorrectCheck,
        iconON,
        readyToSend,
        registerUserToDB,
        readyDay,
        readyMonth,
        checkCut,
        checkTest,
        messageSendError,
        checkPhoneAndMessInput,
        checkCountryInput,
        checkPasswordInput,
        checkAgeEmailInput,
        errorFormMessage,
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
        exit
    };
})();    