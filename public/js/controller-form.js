//registration prototipe
    class regProto{constructor(){}}
    let regPrototype = new regProto();

window.onload = function(){
//clear update object 
    CLEAR.clearRegProto();
    
//set language settings
    localStorage.kalciferLang === "ua" ? VW.changLang('ua') : localStorage.kalciferLang === "en" ? VW.changLang('en') : VW.changLang('ua');
        
//get date registration and push to prototype
    regProto.prototype.registr = SE.readyFullDate('');

//set default settings for ava
    regProto.prototype.avasettings = '50% 50%';

//set limitation to choice date zvit
    let input = document.getElementById("reg-age");
    input.setAttribute("min", "1930-01-02");
    input.setAttribute("max", SE.readyFullDate(''));

//border preview foto on start
    SE.$('reg-ava').style.border = '0px solid #e0e0e0';


//check and cut incorrect symbol form
    //logim-----------------------------------------------------------------------------------
        SE.$("reg-login").addEventListener("change", () => {CHECK.checkCut("reg-login", "[^a-zA-Z0-9-_]")});
        SE.$("reg-login").addEventListener("input", () => {CHECK.checkTest("reg-login", "^[a-zA-Z0-9-_]+$")}); 
        SE.$("reg-login").addEventListener("change", SE.messageSendErrorClear);        
        setTimeout(() => { SE.$("reg-login").value = ''}, 200);
    //password-----------------------------------------------------------------------------------
        SE.$("reg-password").addEventListener("change", () => {CHECK.checkCut("reg-password", "[^a-zA-Z0-9-_]")});
        SE.$("reg-password").addEventListener("change", () => {
            if (SE.$("reg-password").value.length < 7){
                SE.iconON("reg-password", "false", MESS.errorFormMessage().toshort);
            }
        });
        SE.$("reg-password").addEventListener("input", () => {CHECK.checkCut("reg-password", "[^a-zA-Z0-9-_]")});
        SE.$("reg-password").addEventListener("input", () => {CHECK.checkTest("reg-password", "^[a-zA-Z0-9-_]+$")}); 
        SE.$("reg-password").addEventListener("change", SE.messageSendErrorClear);
        setTimeout(() => { SE.$("reg-password").value = ''}, 200);
    //password-two-----------------------------------------------------------------------------------
        SE.$("reg-password-two").addEventListener("change", () => {CHECK.checkCut("reg-password-two", "[^a-zA-Z0-9-_]")});
        SE.$("reg-password-two").addEventListener("input", () => {CHECK.checkCut("reg-password-two", "[^a-zA-Z0-9-_]")});
        SE.$("reg-password-two").addEventListener("input", () => {CHECK.checkTest("reg-password-two", "^[a-zA-Z0-9-_]+$")}); 
        SE.$("reg-password-two").addEventListener("change", SE.messageSendErrorClear);
        setTimeout(() => { SE.$("reg-password-two").value = ''}, 200);
    //name-----------------------------------------------------------------------------------
        SE.$("reg-name").addEventListener("change", () => {CHECK.checkCut("reg-name", "[^a-zA-Zа-яА-ЯіІїЇєЄ']")});
        SE.$("reg-name").addEventListener("input", () => {CHECK.checkTest("reg-name", "^[a-zA-Zа-яА-ЯіІїЇєЄ']+$")}); 
        SE.$("reg-name").addEventListener("change", SE.messageSendErrorClear);
        setTimeout(() => { SE.$("reg-name").value = ''}, 200);
    //surname--------------------------------------------------------------------------------
        SE.$("reg-surname").addEventListener("change", () => {CHECK.checkCut("reg-surname", "[^a-zA-Zа-яА-ЯіІїЇєЄ']")});
        SE.$("reg-surname").addEventListener("input", () => {CHECK.checkTest("reg-surname", "^[a-zA-Zа-яА-ЯіІїІєЄ']+$")});
        SE.$("reg-surname").addEventListener("change", SE.messageSendErrorClear);
        setTimeout(() => { SE.$("reg-surname").value = ''}, 200);
    //tel------------------------------------------------------------------------------------
        SE.$("reg-tel").addEventListener("change", () => {CHECK.checkCut("reg-tel", "[^0-9]")});
        SE.$("reg-tel").addEventListener("input", () => {CHECK.checkTest("reg-tel", "[0-9]{10}")});  
        SE.$("reg-tel").addEventListener("change", SE.messageSendErrorClear);   
        setTimeout(() => { SE.$("reg-tel").value = ''}, 200);
    //message------------------------------------------------------------------------------------
        SE.$("reg-message").addEventListener("change", () => {CHECK.checkCut("reg-message", "[^0-9]")});
        SE.$("reg-message").addEventListener("input", () => {CHECK.checkTest("reg-message", "[0-9]{10}")});        
        SE.$("reg-message").addEventListener("change", SE.messageSendErrorClear);  
        setTimeout(() => { SE.$("reg-message").value = ''}, 200);   
    //age------------------------------------------------------------------------------------
        SE.$("reg-age").addEventListener("change", () => {CHECK.checkCut("reg-age", "")});
        SE.$("reg-age").addEventListener("change", SE.messageSendErrorClear);
    //email------------------------------------------------------------------------------------
        SE.$("reg-email").addEventListener("change", () => {CHECK.checkCut("reg-email", "[^a-zA-Z0-9@-_.]")});
        SE.$("reg-email").addEventListener("input", () => {CHECK.checkTest("reg-email", "^[a-zA-Z0-9@-_.]+$")});  
        SE.$("reg-email").addEventListener("change", SE.messageSendErrorClear);
        setTimeout(() => { SE.$("reg-email").value = ''}, 200);   
    //country------------------------------------------------------------------------------------
        SE.$("reg-country").addEventListener("change", () => {CHECK.checkCut("reg-country", "")});
        SE.$("reg-country").addEventListener("change", SE.messageSendErrorClear);
    //town------------------------------------------------------------------------------------
        SE.$("reg-town").addEventListener("change", () => {CHECK.checkCut("reg-town", "")});
        SE.$("reg-town").addEventListener("change", SE.messageSendErrorClear);
    //profession-----------------------------------------------------------------------------------
        SE.$("reg-profession").addEventListener("change", () => {CHECK.checkCut("reg-profession", "[^a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]")});
        SE.$("reg-profession").addEventListener("input", () => {CHECK.checkTest("reg-profession", "^[a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]+$")}); 
        SE.$("reg-profession").addEventListener("change", SE.messageSendErrorClear);
    //education-----------------------------------------------------------------------------------
        SE.$("reg-education").addEventListener("change", () => {CHECK.checkCut("reg-education", "[^a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]")});
        SE.$("reg-education").addEventListener("input", () => {CHECK.checkTest("reg-education", "^[a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]+$")}); 
        SE.$("reg-education").addEventListener("change", SE.messageSendErrorClear);
    //file------------------------------------------------------------------------------------
        SE.$("reg-file").addEventListener("change", () => {CHECK.checkCut("reg-file", "")});
        SE.$("reg-file").addEventListener("change", SE.messageSendErrorClear);
    //send-----------------------------------------------------------------------------------
        SE.$("reg-form-send").addEventListener("click", SE.messageSendError);

};