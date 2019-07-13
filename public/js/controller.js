window.onload = function(){

  
//set language settings
    localStorage.kalciferLang === "ua" ? VW.changLang('ua') : localStorage.kalciferLang === "en" ? VW.changLang('en') : VW.changLang('ua');
//set main style and radius
    VW.changeSettings(localStorage.kalcifermaincolor, localStorage.kalcifersecondcolor, localStorage.kalciferbgcolor);
    VW.changeRadius(localStorage.kalcifertopleft, localStorage.kalcifertopright, localStorage.kalciferbottomleft, localStorage.kalciferbottomright);
    VW.changeFont(localStorage.kalciferfont);
//set default value to main style color inputs
    SE.$('maincolor').value = localStorage.kalcifermaincolor;
    SE.$('secondcolor').value = localStorage.kalcifersecondcolor;
    SE.$('bgcolor').value = localStorage.kalciferbgcolor;
    SE.$('topleft').value = localStorage.kalcifertopleft;
    SE.$('topright').value = localStorage.kalcifertopright;
    SE.$('bottomleft').value = localStorage.kalciferbottomleft;
    SE.$('bottomright').value = localStorage.kalciferbottomright;
    SE.$('fontselect').value = localStorage.kalciferfont;

//autorisation--login-------------------------------------------------------------------------------
    SE.$("login").addEventListener("change", () => {SE.checkAutorisation("login", "[^a-zA-Z0-9]", "^[a-zA-Z0-9]+$")});
    SE.$("login").addEventListener("input", () => {SE.checkTest("login", "^[a-zA-Z0-9]+$")}); 
//autorisation--password-------------------------------------------------------------------------------
    SE.$("password").addEventListener("change", () => {SE.checkAutorisation("password", "[^a-zA-Z0-9]", "^[a-zA-Z0-9]+$")});
    SE.$("password").addEventListener("input", () => {SE.checkTest("password", "^[a-zA-Z0-9]+$")}); 
    
  




};