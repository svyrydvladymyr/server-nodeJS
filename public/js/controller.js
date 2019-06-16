window.onload = function(){

//set language settings
    localStorage.kalciferLang === "ua" ? VW.changLang('ua') : localStorage.kalciferLang === "en" ? VW.changLang('en') : VW.changLang('ua');
//login button
    SE.$("click").addEventListener("click", () => {VW.buttonLogin()});
//set main style
    VW.changeSettings(localStorage.kalcifermaincolor, localStorage.kalcifersecondcolor, localStorage.kalciferbgcolor);
//set default value to main style color inputs
    SE.$('maincolor').value = localStorage.kalcifermaincolor;
    SE.$('secondcolor').value = localStorage.kalcifersecondcolor;
    SE.$('bgcolor').value = localStorage.kalciferbgcolor;


};