window.onload = function(){

    //set language settings
    localStorage.kalciferLang === "ua" ? VW.changLang('ua') : localStorage.kalciferLang === "en" ? VW.changLang('en') : VW.changLang('ua');
    

    //login button
    SE.$("click").addEventListener("click", () => {VW.buttonLogin()});

};