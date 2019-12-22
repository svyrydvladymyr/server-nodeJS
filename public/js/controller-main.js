window.onload = function(){

//set language settings
    localStorage.kalciferLang === "ua" ? VW.changLang('ua') : localStorage.kalciferLang === "en" ? VW.changLang('en') : VW.changLang('ua');

//set main style and radius
    VW.changeSettings(localStorage.kalcifermaincolor, localStorage.kalcifersecondcolor, localStorage.kalciferbgcolor);
    VW.changeRadius(localStorage.kalcifertopleft, localStorage.kalcifertopright, localStorage.kalciferbottomleft, localStorage.kalciferbottomright);
    VW.changeFont(localStorage.kalciferfont);

//show messenger
    MESSAGER.showMessage(`${localStorage.kalciferMess}`, 'loadpage');

//set default value to main style color inputs
    SE.$('maincolor').value = localStorage.kalcifermaincolor;
    SE.$('secondcolor').value = localStorage.kalcifersecondcolor;
    SE.$('bgcolor').value = localStorage.kalciferbgcolor;
    SE.$('topleft').value = localStorage.kalcifertopleft;
    SE.$('topright').value = localStorage.kalcifertopright;
    SE.$('bottomleft').value = localStorage.kalciferbottomleft;
    SE.$('bottomright').value = localStorage.kalciferbottomright;
    SE.$('fontselect').value = localStorage.kalciferfont;

//autorisation--login---------------------------------------------------------------------------------
    if (SE.$("login")) {
        SE.$("login").addEventListener("change", () => {CHECK.checkAutorisation("login", "[^a-zA-Z0-9-_]", "^[a-zA-Z0-9-_]+$")});
        SE.$("login").addEventListener("input", () => {CHECK.testAutorisation("login", "^[a-zA-Z0-9]+$")}); 
        SE.$("login").addEventListener("keydown", (event) => {if (event.key === 'Enter'){VW.buttonLogin()}}); 
    }

//autorisation--password-------------------------------------------------------------------------------
    if (SE.$("password")) {
        SE.$("password").addEventListener("change", () => {CHECK.checkAutorisation("password", "[^a-zA-Z0-9-_]", "^[a-zA-Z0-9-_]+$")});
        SE.$("password").addEventListener("input", () => {CHECK.testAutorisation("password", "^[a-zA-Z0-9]+$")}); 
        SE.$("password").addEventListener("keydown", (event) => {if (event.key === 'Enter'){VW.buttonLogin()}}); 
    } 

//write-message----------------------------------------------------------------------------------------
    if (SE.$("messenger_write_input")) {      
        SE.$("messenger_send_mess").addEventListener("click", MESSAGER.sendMessage);

        SE.$("messenger_write_input").addEventListener("input", () => {CHECK.checkSendMess("messenger_write_input")}); 
       
        SE.$("messenger_write_input").addEventListener("keydown", (event) => {if (event.key === 'Enter'){
            if (SE.$("messenger_write_input").value !== ''){ MESSAGER.sendMessage() }
        }}); 
    } 
    if (SE.$("messenger")) {
        if (SE.$("messenger").classList.contains("messenger")) {   
            SE.$("messenger").addEventListener("click", MESSAGER.messangerList);
        }
    }


//search-----------------------------------------------------------------------------------------------
    SE.$("search").addEventListener("input", () => {CHECK.checkSearch("search")}); 

};


