window.onload = function(){

//set language settings
    localStorage.kalciferLang === "ua" ? VW.changLang('ua') : localStorage.kalciferLang === "en" ? VW.changLang('en') : VW.changLang('ua');
//login button
    SE.$("click").addEventListener("click", () => {VW.buttonLogin()});
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


};