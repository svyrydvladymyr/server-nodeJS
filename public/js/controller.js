window.onload = function(){

    //set language settings
    localStorage.kalcifer === "ua" ? VW.changLang('ua') : localStorage.kalcifer === "en" ? VW.changLang('en') : VW.changLang('ua');
    


    SE.$("click").addEventListener("click", () => {VW.buttonLogin()});

};