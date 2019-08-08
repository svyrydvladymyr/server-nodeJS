window.onload = function(){

//clear update object 
    CLEAR.clearRegProto();

//set language settings
    localStorage.kalciferLang === "ua" ? VW.changLang('ua') : localStorage.kalciferLang === "en" ? VW.changLang('en') : VW.changLang('ua');
        
//set limitation to choice date zvit
    let input = document.getElementById("reg-age");
    input.setAttribute("min", "1930-01-02");
    input.setAttribute("max", SE.readyFullDate(''));

//check and cut incorrect symbol form
    //logim-----------------------------------------------------------------------------------
        if (SE.$("reg-login-up")) {
            SE.$("reg-login-up").addEventListener("change", () => {SE.checkCut("reg-login-up", "[^a-zA-Z0-9-_]")});
            SE.$("reg-login-up").addEventListener("input", () => {SE.$('main-form-messageone').innerHTML = '';});
            SE.$("reg-login-up").addEventListener("input", () => {SE.checkTest("reg-login-up", "^[a-zA-Z0-9-_]+$")}); 
        }
    //old-password-----------------------------------------------------------------------------------
        if (SE.$("reg-oldpassword")){
            SE.$("reg-oldpassword").addEventListener("change", () => {SE.checkCut("reg-oldpassword", "[^a-zA-Z0-9-_]")});
            SE.$("reg-oldpassword").addEventListener("input", () => {SE.$('main-form-messageone').innerHTML = '';});
            SE.$("reg-oldpassword").addEventListener("input", () => {SE.checkTest("reg-oldpassword", "^[a-zA-Z0-9-_]+$")}); 
        }
    //password-----------------------------------------------------------------------------------
        if (SE.$("reg-password")){
            SE.$("reg-password").addEventListener("change", () => {SE.checkCut("reg-password", "[^a-zA-Z0-9-_]")});
            SE.$("reg-password").addEventListener("change", () => {
                if (SE.$("reg-password").value.length < 7){
                    SE.iconON("reg-password", "false", SE.errorFormMessage().toshort);
                }
            });
            SE.$("reg-password").addEventListener("input", () => {SE.$('main-form-messageone').innerHTML = '';});
            SE.$("reg-password").addEventListener("input", () => {SE.checkCut("reg-password", "[^a-zA-Z0-9-_]")});
            SE.$("reg-password").addEventListener("input", () => {SE.checkTest("reg-password", "^[a-zA-Z0-9-_]+$")}); 
        }
    //password-two-----------------------------------------------------------------------------------
        if (SE.$("reg-password-two")){
            SE.$("reg-password-two").addEventListener("change", () => {SE.checkCut("reg-password-two", "[^a-zA-Z0-9-_]")});
            SE.$("reg-password-two").addEventListener("input", () => {SE.$('main-form-messageone').innerHTML = '';});
            SE.$("reg-password-two").addEventListener("input", () => {SE.checkCut("reg-password-two", "[^a-zA-Z0-9-_]")});
            SE.$("reg-password-two").addEventListener("input", () => {SE.checkTest("reg-password-two", "^[a-zA-Z0-9-_]+$")}); 
        }
    //name-----------------------------------------------------------------------------------
        if (SE.$("reg-name")){
            SE.$("reg-name").addEventListener("change", () => {SE.checkCut("reg-name", "[^a-zA-Zа-яА-ЯіІїЇєЄ']")});
            SE.$("reg-name").addEventListener("input", () => {SE.checkTest("reg-name", "^[a-zA-Zа-яА-ЯіІїЇєЄ']+$")}); 
        }
    //surname--------------------------------------------------------------------------------
        if (SE.$("reg-surname")) {
            SE.$("reg-surname").addEventListener("change", () => {SE.checkCut("reg-surname", "[^a-zA-Zа-яА-ЯіІїЇєЄ']")});
            SE.$("reg-surname").addEventListener("input", () => {SE.checkTest("reg-surname", "^[a-zA-Zа-яА-ЯіІїІєЄ']+$")});
        }
    //tel------------------------------------------------------------------------------------
        SE.$("reg-tel").addEventListener("change", () => {SE.checkCut("reg-tel", "[^0-9]")});
        SE.$("reg-tel").addEventListener("input", () => {SE.checkTest("reg-tel", "[0-9]{10}")});                
    //message------------------------------------------------------------------------------------
        SE.$("reg-message").addEventListener("change", () => {SE.checkCut("reg-message", "[^0-9]")});
        SE.$("reg-message").addEventListener("input", () => {SE.checkTest("reg-message", "[0-9]{10}")});                
    //age------------------------------------------------------------------------------------
        SE.$("reg-age").addEventListener("change", () => {SE.checkCut("reg-age", "")});
    //email------------------------------------------------------------------------------------
        SE.$("reg-email").addEventListener("change", () => {SE.checkCut("reg-email", "[^a-zA-Z0-9@-_.]")});
        SE.$("reg-email").addEventListener("input", () => {SE.checkTest("reg-email", "^[a-zA-Z0-9@-_.]+$")});  
    //country------------------------------------------------------------------------------------
        SE.$("reg-country").addEventListener("change", () => {SE.checkCut("reg-country", "")});
    //town------------------------------------------------------------------------------------
        SE.$("reg-town").addEventListener("change", () => {SE.checkCut("reg-town", "")});
    //profession-----------------------------------------------------------------------------------
        SE.$("reg-profession").addEventListener("change", () => {SE.checkCut("reg-profession", "[^a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]")});
        SE.$("reg-profession").addEventListener("input", () => {SE.checkTest("reg-profession", "^[a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]+$")}); 
    //education-----------------------------------------------------------------------------------
        SE.$("reg-education").addEventListener("change", () => {SE.checkCut("reg-education", "[^a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]")});
        SE.$("reg-education").addEventListener("input", () => {SE.checkTest("reg-education", "^[a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]+$")}); 
    //send-----------------------------------------------------------------------------------
        SE.$("reg-form-send").addEventListener("click", SE.messageSendError);

};