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
    //name-----------------------------------------------------------------------------------
        // SE.$("reg-name").addEventListener("change", () => {CHECK.checkCut("reg-name", "[^a-zA-Zа-яА-ЯіІїЇ]")});
        // SE.$("reg-name").addEventListener("input", () => {CHECK.checkTest("reg-name", "^[a-zA-Zа-яА-ЯіІїЇ]+$")}); 
    //surname--------------------------------------------------------------------------------
        // SE.$("reg-surname").addEventListener("change", () => {CHECK.checkCut("reg-surname", "[^a-zA-Zа-яА-ЯіІїЇ]")});
        // SE.$("reg-surname").addEventListener("input", () => {CHECK.checkTest("reg-surname", "^[a-zA-Zа-яА-ЯіІїІ]+$")});
    //tel------------------------------------------------------------------------------------
        SE.$("reg-tel").addEventListener("change", () => {CHECK.checkCut("reg-tel", "[^0-9]")});
        SE.$("reg-tel").addEventListener("input", () => {CHECK.checkTest("reg-tel", "[0-9]{10}")});                
    //message------------------------------------------------------------------------------------
        SE.$("reg-message").addEventListener("change", () => {CHECK.checkCut("reg-message", "[^0-9]")});
        SE.$("reg-message").addEventListener("input", () => {CHECK.checkTest("reg-message", "[0-9]{10}")});       
    //age------------------------------------------------------------------------------------
        SE.$("reg-age").addEventListener("change", () => {CHECK.checkCut("reg-age", "")});
    //country------------------------------------------------------------------------------------
        SE.$("reg-country").addEventListener("change", () => {CHECK.checkCut("reg-country", "")});
    //town------------------------------------------------------------------------------------
        SE.$("reg-town").addEventListener("change", () => {CHECK.checkCut("reg-town", "")});
    //profession-----------------------------------------------------------------------------------
        SE.$("reg-profession").addEventListener("change", () => {CHECK.checkCut("reg-profession", "[^a-zA-Zа-яА-Я-іІїЇ ]")});
        SE.$("reg-profession").addEventListener("input", () => {CHECK.checkTest("reg-profession", "^[a-zA-Zа-яА-Я-іІїЇ ]+$")}); 
    //education-----------------------------------------------------------------------------------
        SE.$("reg-education").addEventListener("change", () => {CHECK.checkCut("reg-education", "[^a-zA-Zа-яА-Я-іІїЇ ]")});
        SE.$("reg-education").addEventListener("input", () => {CHECK.checkTest("reg-education", "^[a-zA-Zа-яА-Я-іІїЇ ]+$")}); 
    //send-----------------------------------------------------------------------------------
        SE.$("reg-form-send").addEventListener("click", SE.messageSendError);

};