let VW = (() => {
    
    //function for change login button
    let buttonLogin = function(){
        let logIn = document.getElementById("send-login-close");
        if (logIn.classList == "click-login-close"){
            logIn.classList = "click-login-open";
     
        } else if(logIn.classList == "click-login-open"){
            let inputLogin = SE.$("login").value;
            let inputPassword = SE.$("password").value;


            logIn.classList = "click-login-close";




            //chack on empty login and password and show message
            if ((inputLogin == "") && (inputPassword == "")){
            } else if ((inputLogin == "")) {
            } else if ((inputPassword == "")) {
            } else{

            }
        } else if (logIn.classList == "click-login-exit"){
            logIn.classList = "click-login-close";

            //clear session
            sessionStorage.autorisetionUser = "";
        }
    };

// function for open and close blok settings
    let openSetting = () => {
        var openGASet = SE.$("set");
        var openGASetting = SE.$("setting");
        openGASet.className === "set" ? openGASet.className = "set_close" : openGASet.className = "set";
        openGASetting.className === "setting" ? openGASetting.className = "setting_close" : openGASetting.className = "setting";
    };

// function for change language
    var changLang = function(val){
        var ua = SE.$("lang_ua");
        var en = SE.$("lang_en");
        if (val == "ua"){
            en.style.width = 13 + "%";
            ua.style.width = 83 + "%";
            localStorage.kalciferLang = val;
            SE.getLanguage("./json/configUA.json");
        } else if (val == "en"){
            ua.style.width = 13 + "%";
            en.style.width = 83 + "%";
            localStorage.kalciferLang = val;
            SE.getLanguage("./json/configEN.json");
        } 
    }; 
   
//show clear button
    let showClearButton = () => { 
        SE.$("search").value !== '' ? SE.$("search_clear").style.display = 'table' : SE.$("search_clear").style.display = 'none';
    }

//clear search input
    let clearSearch = () => {
        SE.$("search").value = '';
        SE.$("search_clear").style.display = 'none'
    }

//show password
    let showPassword = () => {
        if (( SE.$("reg-password").type === 'password') || ( SE.$("reg-password").type === "password")){
            SE.$("reg-password").type = 'text';
            SE.$("reg-password-two").type = 'text'
        } else {
            SE.$("reg-password").type = 'password';
            SE.$("reg-password-two").type = 'password'
        }
    };

//range ava foto
    let rangeAvaFoto = (el) => {
        if (el === 'h') {
            let cc = SE.$('horizontally').value;
            console.log(cc);
            SE.$('ava-preview-foto').style.backgroundPosition = `${SE.$('horizontally').value}% 50%`;
            
        } else if (el === 'v') {
            SE.$('ava-preview-foto').style.backgroundPosition = `50% ${SE.$('vertical').value}%`;

        }   
    
    };   

return {
    buttonLogin,
    openSetting,
    changLang,
    showClearButton,
    clearSearch,
    showPassword,
    rangeAvaFoto    
};

})();