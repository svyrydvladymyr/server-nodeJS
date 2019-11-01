//registration prototipe
    class regProto{constructor(){}}
    let regPrototype = new regProto();

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
            SE.$("reg-login-up").addEventListener("change", () => {CHECK.checkCut("reg-login-up", "[^a-zA-Z0-9-_]")});
            SE.$("reg-login-up").addEventListener("input", () => {SE.$('main-form-messageone').innerHTML = '';});
            SE.$("reg-login-up").addEventListener("input", () => {CHECK.checkTest("reg-login-up", "^[a-zA-Z0-9-_]+$")}); 
            setTimeout(() => { SE.$("reg-login-up").value = ''}, 200);  
        }
    //old-password-----------------------------------------------------------------------------------
        if (SE.$("reg-oldpassword")){
            SE.$("reg-oldpassword").addEventListener("change", () => {CHECK.checkCut("reg-oldpassword", "[^a-zA-Z0-9-_]")});
            SE.$("reg-oldpassword").addEventListener("input", () => {SE.$('main-form-messageone').innerHTML = '';});
            SE.$("reg-oldpassword").addEventListener("input", () => {CHECK.checkTest("reg-oldpassword", "^[a-zA-Z0-9-_]+$")}); 
            setTimeout(() => { SE.$("reg-oldpassword").value = ''}, 200); 
        }
    //password-----------------------------------------------------------------------------------
        if (SE.$("reg-password")){
            SE.$("reg-password").addEventListener("change", () => {CHECK.checkCut("reg-password", "[^a-zA-Z0-9-_]")});
            SE.$("reg-password").addEventListener("change", () => {
                if (SE.$("reg-password").value.length < 7){
                    SE.iconON("reg-password", "false", MESS.errorFormMessage().toshort);
                }
            });
            SE.$("reg-password").addEventListener("input", () => {SE.$('main-form-messageone').innerHTML = '';});
            SE.$("reg-password").addEventListener("input", () => {CHECK.checkCut("reg-password", "[^a-zA-Z0-9-_]")});
            SE.$("reg-password").addEventListener("input", () => {CHECK.checkTest("reg-password", "^[a-zA-Z0-9-_]+$")}); 
            setTimeout(() => { SE.$("reg-password").value = ''}, 200);   
        }
    //password-two-----------------------------------------------------------------------------------
        if (SE.$("reg-password-two")){
            SE.$("reg-password-two").addEventListener("change", () => {CHECK.checkCut("reg-password-two", "[^a-zA-Z0-9-_]")});
            SE.$("reg-password-two").addEventListener("input", () => {SE.$('main-form-messageone').innerHTML = '';});
            SE.$("reg-password-two").addEventListener("input", () => {CHECK.checkCut("reg-password-two", "[^a-zA-Z0-9-_]")});
            SE.$("reg-password-two").addEventListener("input", () => {CHECK.checkTest("reg-password-two", "^[a-zA-Z0-9-_]+$")}); 
            setTimeout(() => { SE.$("reg-password-two").value = ''}, 200);
        }
    //name-----------------------------------------------------------------------------------
        if (SE.$("reg-name")){
            SE.$("reg-name").addEventListener("change", () => {CHECK.checkCut("reg-name", "[^a-zA-Zа-яА-ЯіІїЇєЄ']")});
            SE.$("reg-name").addEventListener("input", () => {CHECK.checkTest("reg-name", "^[a-zA-Zа-яА-ЯіІїЇєЄ']+$")}); 
        }
    //surname--------------------------------------------------------------------------------
        if (SE.$("reg-surname")) {
            SE.$("reg-surname").addEventListener("change", () => {CHECK.checkCut("reg-surname", "[^a-zA-Zа-яА-ЯіІїЇєЄ']")});
            SE.$("reg-surname").addEventListener("input", () => {CHECK.checkTest("reg-surname", "^[a-zA-Zа-яА-ЯіІїІєЄ']+$")});
        }
    //tel------------------------------------------------------------------------------------
        SE.$("reg-tel").addEventListener("change", () => {CHECK.checkCut("reg-tel", "[^0-9]")});
        SE.$("reg-tel").addEventListener("input", () => {CHECK.checkTest("reg-tel", "[0-9]{10}")});                
    //message------------------------------------------------------------------------------------
        SE.$("reg-message").addEventListener("change", () => {CHECK.checkCut("reg-message", "[^0-9]")});
        SE.$("reg-message").addEventListener("input", () => {CHECK.checkTest("reg-message", "[0-9]{10}")});                
    //age------------------------------------------------------------------------------------
        SE.$("reg-age").addEventListener("change", () => {CHECK.checkCut("reg-age", "")});
    //email------------------------------------------------------------------------------------
        if (SE.$("reg-email")){
            SE.$("reg-email").addEventListener("change", () => {CHECK.checkCut("reg-email", "[^a-zA-Z0-9@-_.]")});
            SE.$("reg-email").addEventListener("input", () => {CHECK.checkTest("reg-email", "^[a-zA-Z0-9@-_.]+$")});  
        }
    //country------------------------------------------------------------------------------------
        SE.$("reg-country").addEventListener("change", () => {CHECK.checkCut("reg-country", "")});
    //town------------------------------------------------------------------------------------
        SE.$("reg-town").addEventListener("change", () => {CHECK.checkCut("reg-town", "")});
    //profession-----------------------------------------------------------------------------------
        SE.$("reg-profession").addEventListener("change", () => {CHECK.checkCut("reg-profession", "[^a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]")});
        SE.$("reg-profession").addEventListener("input", () => {CHECK.checkTest("reg-profession", "^[a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]+$")}); 
    //education-----------------------------------------------------------------------------------
        SE.$("reg-education").addEventListener("change", () => {CHECK.checkCut("reg-education", "[^a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]")});
        SE.$("reg-education").addEventListener("input", () => {CHECK.checkTest("reg-education", "^[a-zA-Zа-яА-Я-іІїЇєЄ'\",._ ]+$")}); 
    //send-----------------------------------------------------------------------------------
        SE.$("reg-form-send").addEventListener("click", SE.messageSendError);

};