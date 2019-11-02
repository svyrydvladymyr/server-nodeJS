let CHECK = (() => {
   
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
            SE.iconON(idF, "false", MESS.errorFormMessage().notCorectNum);
            SE.$("reg-form-send").removeEventListener("click", SE.messgeSendError);
            SE.readyToSend(idF, "");
        } else {
            // let phoneReady = SE.$(`${idF}_cod`).options[SE.$(`${idF}_cod`).selectedIndex].text + SE.$(idF).value;
            SE.readyToSend(idF, SE.$(`${idF}_cod`).options[SE.$(`${idF}_cod`).selectedIndex].text + SE.$(idF).value);
            SE.$("reg-form-send").addEventListener("click", SE.messgeSendError); 
        }
    };

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
    };

//password exclusion
    let checkPasswordInput = (idF) => {
        if (idF === "reg-oldpassword"){
            SE.iconON('reg-oldpassword', "true", '');
            SE.readyToSend('reg-oldpassword', SE.$('reg-oldpassword').value);
            SE.$("reg-form-send").addEventListener("click", SE.messgeSendError); 
        } else {
            if ((SE.$("reg-password").value !== '') && (SE.$("reg-password-two").value !== '')){
                if (SE.$('reg-password').value.length > 6){
                    if (SE.$('reg-password').value === SE.$('reg-password-two').value){
                        SE.iconON('reg-password', "true", '');
                        SE.readyToSend('reg-password', SE.$('reg-password').value);
                        SE.$("reg-form-send").addEventListener("click", SE.messgeSendError); 
                    } else {
                        SE.iconON("reg-password", "false", MESS.errorFormMessage().checkPass);
                        SE.readyToSend('reg-password', '');
                        SE.$("reg-form-send").removeEventListener("click", SE.messgeSendError);
                    } 
                }else {
                    SE.iconON("reg-password", "false", MESS.errorFormMessage().toshort);
                    SE.readyToSend('reg-password', '');
                    SE.$("reg-form-send").removeEventListener("click", SE.messgeSendError);
                }         
            } else {
                SE.iconON("reg-password", "false", MESS.errorFormMessage().repeatPass);
                SE.readyToSend('reg-password', '');
                SE.$("reg-form-send").removeEventListener("click", SE.messgeSendError);
            }
        }
    };
    
//age and email exclusion  
    let checkAgeEmailInput = (idF) => {
        if ((SE.$(idF).validity) && (!SE.$(idF).validity.valid)){
            SE.iconON(idF, "false", MESS.errorFormMessage().notCorectVar);
            SE.$("reg-form-send").removeEventListener("click", SE.messgeSendError);
            SE.readyToSend(idF, "");
        } else {
            SE.iconON(idF, "true", '');
            SE.readyToSend(idF, SE.$(idF).value);  
            SE.$("reg-form-send").addEventListener("click", SE.messgeSendError);                            
        }
    };


//login and passsword autorisation exclusion  
    let checkAutorisation = (idf, reg, reg2) => {
        let newReg = new RegExp(reg, "gi");
        let input = SE.$(idf).value;
        let res = input.replace(newReg, '');
        SE.$(idf).value = res;        
        if ((new RegExp(reg2, "gi").test(SE.$(idf).value) == true) || (SE.$(idf).value == '')) {
            SE.$('login-message').innerHTML = '';
            SE.$('login-message').style.display = 'none'; 
        } else {
            SE.$('login-message').style.display = 'table';
            SE.$('login-message').innerHTML = MESS.errorFormMessage().autorisOnlyletters;
        }
    } 

//login and passsword autorisation exclusion test 
    let testAutorisation = (idf, reg) => {
        if ((new RegExp(reg, "gi").test(SE.$(idf).value) == true) || (SE.$(idf).value == '')) {
            SE.$('login-message').innerHTML = '';
            SE.$('login-message').style.display = 'none';
        } else {
            SE.$('login-message').style.display = 'table';
            SE.$('login-message').innerHTML = MESS.errorFormMessage().autorisOnlyletters;         
        }
    }    

//check on true or error in input on change, cut all incorrect, show message
    let checkCut = (idF, reg, t) => {
        if (SE.$(idF).value === ""){
            if ((SE.$(idF).id === 'reg-login') || 
                (SE.$(idF).id === 'reg-password') || 
                (SE.$(idF).id === 'reg-name') ||
                (SE.$(idF).id === 'reg-surname') ||
                (SE.$(idF).id === 'reg-email')){
                    SE.iconON(idF, "false", MESS.errorFormMessage().notCunEmpty);
                    SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                    SE.$("reg-form-send").classList.remove('reg_send_active');
                    SE.readyToSend(idF, "");
            } else if ((SE.$(idF).id === 'autoriz-email-send-input')){
                SE.$('farrrrr').style.fontSize = "0px";
            } else {
                let idFF = idF === 'reg-password-two' ? 'reg-password' : idF;
                SE.iconON(idFF, "true", '');
                SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                SE.$("reg-form-send").classList.remove('reg_send_active');
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
                            SE.iconON(idF, "false", MESS.errorFormMessage().notCunEmpty);
                            SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                            SE.$("reg-form-send").classList.remove('reg_send_active');
                            SE.readyToSend(idF, "");
                    } else {
                        SE.readyToSend(idF, "");
                        SE.$(`${idF}-mess`).innerHTML = '';
                        SE.$(`${idF}-mess`).classList.remove('reg-message-false');
                    }
                } else {    
                    if((SE.$(idF).id === "reg-tel") || (SE.$(idF).id === "reg-message")){ 
                        CHECK.checkPhoneAndMessInput(idF);
                    } else if ((SE.$(idF).id === "reg-password") || (SE.$(idF).id === "reg-password-two") || (SE.$(idF).id === "reg-oldpassword")){
                        CHECK.checkPasswordInput(idF);
                    } else if((SE.$(idF).id === "reg-age") || (SE.$(idF).id === "reg-email")) {
                        CHECK.checkAgeEmailInput(idF);
                    } else if(SE.$(idF).id === "autoriz-email-send-input") {
                        SE.$('farrrrr').style.fontSize = ((SE.$(idF).validity) && (!SE.$(idF).validity.valid)) ? "0px" : "18px";
                    } else if ((SE.$(idF).id === "reg-country") || (SE.$(idF).id === "reg-town")){
                        CHECK.checkCountryInput(idF);
                    } else if (SE.$(idF).id === "reg-file"){         
                        if (SE.$(idF).files.length === 1){
                            if (SE.$(idF).files[0].size > 1024000) {
                                SE.iconON(idF, "false", MESS.errorFormMessage().toLBigFile);  
                                SE.$('reg-file-mess').style.display = 'table';
                                SE.$('reg-file-mess').style.marginTop = '3px';
                                SE.$('reg-ava').style.display = 'none';
                                SE.$('reg-ava').style.border = '0px solid #e0e0e0'; 
                                SE.$('form_input').style.height = '40px';
                            } else {
                                SE.$('reg-file-mess').style.display = 'none';
                                SE.$('ava-preview-wrap').style.display = 'flex';
                                SE.readURLPreview();                             
                            }
                        }
                    }else{
                        SE.iconON(idF, "true", '');         
                        SE.readyToSend(idF, SE.$(idF).value);
                        SE.$("reg-form-send").addEventListener("click", SE.messageSendError); 
                    }
                    if (SE.$("reg-form-send")){SE.$("reg-form-send").addEventListener("click", SE.messageSendError)};
                }
            }); 
        }
    };

//check on true or error in input on input and show message
    let checkTest = (idF, reg, t) => {

            if (new RegExp(reg, "gi").test(SE.$(idF).value) == true){
                if (idF === 'reg-password-two'){
                    SE.iconON('reg-password', "true", '');
                } else if (idF === 'autoriz-email-send-input'){
                    SE.$('farrrrr').style.fontSize = ((SE.$(idF).validity) && (!SE.$(idF).validity.valid)) ? "0px" : "18px";                         
                } else {
                    SE.iconON(idF, "true", '');
                }
            } else {
                if ((SE.$(idF).id == "reg-tel") || (SE.$(idF).id == "reg-message")){
                    SE.iconON(idF, "false", MESS.errorFormMessage().onlyNum);
                    SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                    SE.$("reg-form-send").classList.remove('reg_send_active');
                } else if (SE.$(idF).id == "autoriz-email-send-input"){
                    SE.$('farrrrr').style.fontSize = "0px";
                } else {
                    if (SE.$(idF).value === ''){
                        let idFF = (idF === 'reg-password-two') ? 'reg-password' : idF;                        
                        SE.iconON(idFF, "true", '');
                        SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                        SE.$("reg-form-send").classList.remove('reg_send_active');
                    } else {
                        if ((idF === 'reg-login-up') || (idF === 'reg-login') || (idF === 'reg-oldpassword')){
                            SE.iconON(idF, "false", MESS.errorFormMessage().autorisOnlyletters);
                            SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                            SE.$("reg-form-send").classList.remove('reg_send_active');
                        } else {
                            SE.iconON(idF, "false", MESS.errorFormMessage().onlyLetters);
                            SE.$("reg-form-send").removeEventListener("click", SE.messageSendError);
                            SE.$("reg-form-send").classList.remove('reg_send_active');
                        }
                    }
                }
            }

    };

//chack widget values    
    let checkWidgetsVal = (el) => {
        let reg = "[^a-zA-Zа-яА-Я0-9-()_+=.'\":/\,іІїЇєЄ /\n]";
        let newReg = new RegExp(reg, "gi");
        let input = SE.$(el.id).value;
        let res = input.replace(newReg, '');
        SE.$(el.id).value = res;    
    }

    return {
        checkTest,
        checkCut,
        checkPhoneAndMessInput,
        checkCountryInput,
        checkPasswordInput,
        checkAgeEmailInput,
        clonePhoneNumber,
        checkWidgetsVal,
        checkAutorisation,
        testAutorisation
    }
})();