window.onload = function(){

//set language settings
    localStorage.kalciferLang === "ua" ? VW.changLang('ua') : localStorage.kalciferLang === "en" ? VW.changLang('en') : VW.changLang('ua');
        
//get date registration and push to prototype
    let dateRegFull = new Date();
    let dateReg = dateRegFull.getFullYear() + "-" + SE.readyMonth(dateRegFull) + "-" + SE.readyDay(dateRegFull);
    regProto.prototype.registr = dateReg;
//set limitation to choice date zvit
    let tooday = new Date();
    let readyTooday = tooday.getFullYear() + '-' + SE.readyMonth(tooday) + '-' + SE.readyDay(tooday);
    let input = document.getElementById("reg-age");
    input.setAttribute("min", "1930-01-02");
    input.setAttribute("max", readyTooday);


//check and cut incorrect symbol form
    //logim-----------------------------------------------------------------------------------
        SE.$("reg-login").addEventListener("change", () => {VW.checkCut("reg-login", "[^a-zA-Z0-9-_]")});
        SE.$("reg-login").addEventListener("input", () => {VW.checkTest("reg-login", "^[a-zA-Z0-9-_]+$")}); 
    //password-----------------------------------------------------------------------------------
        SE.$("reg-password").addEventListener("change", () => {VW.checkCut("reg-password", "[^a-zA-Z0-9-_]")});
        SE.$("reg-password").addEventListener("input", () => {VW.checkCut("reg-password", "[^a-zA-Z0-9-_]")});
        SE.$("reg-password").addEventListener("input", () => {VW.checkTest("reg-password", "^[a-zA-Z0-9-_]+$")}); 
    //password-two-----------------------------------------------------------------------------------
        SE.$("reg-password-two").addEventListener("change", () => {VW.checkCut("reg-password-two", "[^a-zA-Z0-9-_]")});
        SE.$("reg-password-two").addEventListener("input", () => {VW.checkCut("reg-password-two", "[^a-zA-Z0-9-_]")});
        SE.$("reg-password-two").addEventListener("input", () => {VW.checkTest("reg-password-two", "^[a-zA-Z0-9-_]+$")}); 
    //name-----------------------------------------------------------------------------------
        SE.$("reg-name").addEventListener("change", () => {VW.checkCut("reg-name", "[^a-zA-Zа-яА-Яі]")});
        SE.$("reg-name").addEventListener("input", () => {VW.checkTest("reg-name", "^[a-zA-Zа-яА-Я]+$")}); 
    //surname--------------------------------------------------------------------------------
        SE.$("reg-surname").addEventListener("change", () => {VW.checkCut("reg-surname", "[^a-zA-Zа-яА-Яі]")});
        SE.$("reg-surname").addEventListener("input", () => {VW.checkTest("reg-surname", "^[a-zA-Zа-яА-Я]+$")});
    //tel------------------------------------------------------------------------------------
        SE.$("reg-tel").addEventListener("change", () => {VW.checkCut("reg-tel", "[^0-9]")});
        SE.$("reg-tel").addEventListener("input", () => {VW.checkTest("reg-tel", "[0-9]{10}")});                
    //message------------------------------------------------------------------------------------
        SE.$("reg-message").addEventListener("change", () => {VW.checkCut("reg-message", "[^0-9]")});
        SE.$("reg-message").addEventListener("input", () => {VW.checkTest("reg-message", "[0-9]{10}")});                
    //age------------------------------------------------------------------------------------
        SE.$("reg-age").addEventListener("change", () => {VW.checkCut("reg-age", "")});
    //email------------------------------------------------------------------------------------
        SE.$("reg-email").addEventListener("change", () => {VW.checkCut("reg-email", "[^a-zA-Z0-9@-_.]")});
        SE.$("reg-email").addEventListener("input", () => {VW.checkTest("reg-email", "^[a-zA-Z0-9@-_.]+$")});  
    //country------------------------------------------------------------------------------------
        SE.$("reg-country").addEventListener("change", () => {VW.checkCut("reg-country", "")});

    //send-----------------------------------------------------------------------------------
        SE.$("reg-form-send").addEventListener("click", VW.messageSendError);

};