// function for open and close blok settings
var openSetting = function(){
    var openGASet = document.getElementById("set");
    var openGASetting = document.getElementById("setting");
    if (openGASet.className === "set"){
        openGASet.className = "set_close";
    } else {
        openGASet.className = "set";
    }
    if (openGASetting.className === "setting"){
        openGASetting.className = "setting_close";
    } else {
        openGASetting.className = "setting";
    }
};

// function for set language
(function(){
    var val = getCookie("lang");
    var ua = getID("lang_ua");
    var en = getID("lang_en");
    if (val == "ua"){
        en.style.width = 13 + "%";
        ua.style.width = 83 + "%";
    } else if (val == "en"){
        ua.style.width = 13 + "%";
        en.style.width = 83 + "%";
    } 
    return ua, en;   
})(); 

// function for change language
var changLang = function(val){
    var ua = getID("lang_ua");
    var en = getID("lang_en");
    if (val == "ua"){
        en.style.width = 13 + "%";
        ua.style.width = 83 + "%";
        setCookie("lang", "ua");
        getJson("./json/configUA.json");
    } else if (val == "en"){
        ua.style.width = 13 + "%";
        en.style.width = 83 + "%";
        setCookie("lang", "en");
        getJson("./json/configEN.json");
    } 
    return ua, en;   
}; 

// function for set background-color default
(function(){
    //var x = 27 + "px";
    //document.documentElement.style.setProperty('--border-radius-main', x);
    var bgCol = "";
    var bgColor = "";
    bgCol = getCookie("bgcolor");
    if (bgCol == ""){
        bgColor = getTAG("body");
        bgColor[0].style.backgroundColor = "#f1f1f1";
    } else {
        bgColor = getTAG("body");
        bgColor[0].style.backgroundColor = bgCol;
    }
})();


// function for change background-color 
var setBgColor = function(col) {
    var bgCol = "";
    var bgColor = "";
        setCookie("bgcolor", col);
        bgCol = getCookie("bgcolor");
        bgColor = getTAG("body");
        bgColor[0].style.backgroundColor = bgCol;
};

