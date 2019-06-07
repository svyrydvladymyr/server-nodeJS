let VW = (() => {
    
    //function for change login button
    let buttonLogin = function(){
        let logIn = document.getElementById("send-login-close");
        if (logIn.classList == "click-login-close"){
            logIn.classList = "click-login-open";
     
        } else if(logIn.classList == "click-login-open"){
            let inputLogin = SE.$("login").value;
            let inputPassword = SE.$("password").value;


            logIn.classList = "click-login-close";




            //chack on empty login and password and show message
            if ((inputLogin == "") && (inputPassword == "")){
            } else if ((inputLogin == "")) {
            } else if ((inputPassword == "")) {
            } else{

            }
        } else if (logIn.classList == "click-login-exit"){
            logIn.classList = "click-login-close";

            //clear session
            sessionStorage.autorisetionUser = "";
        }
    };

// function for open and close blok settings
    let openSetting = () => {
        var openGASet = SE.$("set");
        var openGASetting = SE.$("setting");
        openGASet.className === "set" ? openGASet.className = "set_close" : openGASet.className = "set";
        openGASetting.className === "setting" ? openGASetting.className = "setting_close" : openGASetting.className = "setting";
    };

// function for change language
    var changLang = function(val){
        var ua = SE.$("lang_ua");
        var en = SE.$("lang_en");
        if (val == "ua"){
            en.style.width = 13 + "%";
            ua.style.width = 83 + "%";
            localStorage.kalciferLang = val;
            SE.getLanguage("./json/configUA.json");
        } else if (val == "en"){
            ua.style.width = 13 + "%";
            en.style.width = 83 + "%";
            localStorage.kalciferLang = val;
            SE.getLanguage("./json/configEN.json");
        } 
    }; 
   
//show clear button
    let showClearButton = () => { 
        SE.$("search").value !== '' ? SE.$("search_clear").style.display = 'table' : SE.$("search_clear").style.display = 'none';
    }

//clear search input
    let clearSearch = () => {
        SE.$("search").value = '';
        SE.$("search_clear").style.display = 'none'
    }

//check on true or error in input on change, cut all incorrect, show message
    let checkCut = (idF, reg) => {
        if (SE.$(idF).value == ""){
            SE.iconON(idF, "false", 'Не може бути пустим!');
        } else {
            //chack on incorrect and show message and icon
            SE.incorrectCheck(idF, reg, function(){
                if(SE.$(idF).value === ""){
                    SE.iconON(idF, "false", 'Не може бути пустим!');
                    SE.$("reg-form-send").removeEventListener("click", SE.sendToDB);
                    SE.$("reg-form-send").classList.remove('reg_send_active');
                    SE.$("reg-form-send").style.cursor = "no-drop";
                    SE.readyToSend(idF, "");
                } else {
                    //phone and message exclusion
                    if ((SE.$(idF).id === "reg-tel") || (SE.$(idF).id === "reg-message")){ 
                        if (SE.$(idF).value.length != 10) {
                            SE.iconON(idF, "false", 'Не коректний номер!');
                            SE.$("reg-form-send").removeEventListener("click", SE.sendToDB);
                            SE.readyToSend(idF, "");
                        } else {
                            SE.readyToSend(idF, SE.$(idF).value);
                            SE.$("reg-form-send").addEventListener("click", SE.sendToDB); 
                        }
                    //password exclusion    
                    } else if ((SE.$(idF).id === "reg-password") || (SE.$(idF).id === "reg-password-two")){
                        if ((SE.$("reg-password").value !== '') && (SE.$("reg-password-two").value !== '')){
                            if (SE.$('reg-password').value === SE.$('reg-password-two').value){
                                SE.iconON('reg-password', "true", '');
                                SE.readyToSend('reg-password', SE.$('reg-password').value);
                                SE.$("reg-form-send").addEventListener("click", SE.sendToDB); 
                            } else {
                                SE.iconON("reg-password", "false", 'Провірте пароль!');
                                SE.readyToSend('reg-password', '');
                                SE.$("reg-form-send").removeEventListener("click", SE.sendToDB);
                            }                            
                        } else {
                            SE.iconON("reg-password", "false", 'Повторіть пароль!');
                            SE.readyToSend('reg-password', '');
                            SE.$("reg-form-send").removeEventListener("click", SE.sendToDB);
                        }
                    //age and email exclusion  
                    } else if((SE.$(idF).id === "reg-age") || (SE.$(idF).id === "reg-email")) {
                        if ((SE.$(idF).validity) && (!SE.$(idF).validity.valid)){
                            SE.iconON(idF, "false", 'Не коректний значення!');
                            SE.$("reg-form-send").removeEventListener("click", SE.sendToDB);
                            SE.readyToSend(idF, "");
                        } else {
                            SE.iconON(idF, "true", '');
                            SE.readyToSend(idF, SE.$(idF).value);  
                            SE.$("reg-form-send").addEventListener("click", SE.sendToDB);                            
                        }
                    //country exclusion
                    } else if (SE.$(idF).id === "reg-country") {
                        let b = SE.$(idF);
                        let gгest = b.options[b.selectedIndex].text;
                        if (gгest != ""){
                            SE.iconON(idF, "true", '');                            
                            SE.readyToSend(idF, SE.$(idF).value);
                            SE.$("reg-form-send").addEventListener("click", SE.sendToDB); 
                        } else {
                            SE.iconON(idF, "false", '');
                            SE.$("reg-form-send").removeEventListener("click", SE.sendToDB);
                            SE.readyToSend(idF, "");
                        }
                    } else {
                        SE.iconON(idF, "true", '');         
                        SE.readyToSend(idF, SE.$(idF).value);
                        SE.$("reg-form-send").addEventListener("click", SE.sendToDB); 
                    }
                    SE.$("reg-form-send").addEventListener("click", SE.sendToDB); 
                }
            }); 
        }
    };
    
//check on true or error in input on input and show message
    let checkTest = (idF, reg) => {
        if (new RegExp(reg, "gi").test(SE.$(idF).value) == true){
            if (idF === 'reg-password-two'){
                SE.iconON('reg-password', "true", '');
            } else {
                SE.iconON(idF, "true", '');
            }
        } else {
            if ((SE.$(idF).id == "reg-tel") || (SE.$(idF).id == "reg-message")){
                SE.iconON(idF, "false", "Тільки цифри!");
                SE.$("reg-form-send").removeEventListener("click", SE.sendToDB);
                SE.$("reg-form-send").classList.remove('reg_send_active');
            } else {
                SE.iconON(idF, "false", "Тільки букви!");
                SE.$("reg-form-send").removeEventListener("click", SE.sendToDB);
                SE.$("reg-form-send").classList.remove('reg_send_active');
            }
        }
    };


//message if empty name surname or E-mail input
    let messageSendError = () => {
        localStorage.kalciferLang === "ua" ? message = ("Логін, пароль, ім'я, прізвище та E-mail не можуть бути пустими!") : message = ('The login, password, name, surname and E-mail can not be blank!');
        if ((SE.$('reg-name').value === "") || (SE.$('reg-surname').value === "") || (SE.$('reg-email').value === "")){
            SE.$("main-form-message").innerHTML = message;
        } else {
            SE.$("main-form-message").innerHTML = "";
        }
    };

return {
    buttonLogin,
    openSetting,
    changLang,
    showClearButton,
    clearSearch,
    checkCut,
    checkTest,
    messageSendError
    
};

})();