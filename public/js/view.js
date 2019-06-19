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
        SE.$('userlist').style.display = 'none';
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
            SE.$('ava-preview-foto').style.backgroundPosition = `${SE.$('horizontally').value}% 50%`;
        } else if (el === 'v') {
            SE.$('ava-preview-foto').style.backgroundPosition = `50% ${SE.$('vertical').value}%`;
        }      
    };   

//change main style
    let changeSettings = (mainarg, secondarg, bgarg) => {
        let main, second, bg;
        if ((mainarg === '') || (secondarg === '') || (bgarg === '') || 
            (mainarg === undefined) || (secondarg === undefined) || (bgarg === undefined)){
            main = '#2d5e8e';
            second ='#5c8ab9';
            bg = '#f1f1f1';
        } else {
            main = mainarg;
            second = secondarg;
            bg = bgarg;
        }        
        localStorage.kalcifermaincolor = main;
        localStorage.kalcifersecondcolor = second;
        localStorage.kalciferbgcolor = bg;
        document.documentElement.style.setProperty('--bg-color', `${bg}`);
        document.documentElement.style.setProperty('--border', `1px solid ${main}`);
        document.documentElement.style.setProperty('--border-5px', `5px solid ${main}`);
        document.documentElement.style.setProperty('--box-shadow-main', `0px 0px 5px ${second}`);
        document.documentElement.style.setProperty('--text-shadow-main', `0px 0px 2px ${second}`);
        document.documentElement.style.setProperty('--button-background', `linear-gradient(to bottom right, ${main}, ${second}, ${main})`);
        document.documentElement.style.setProperty('--main-color', `${main}`);
        document.documentElement.style.setProperty('--second-color', `${second}`);        
    } 

//change main style
    let changeRadius = (tla, tra, bla, bra) => {
        let tl, tr, bl, br;
        if ((tla === '') ||  (tra === '') ||  (bla === '') ||  (bra === '') || 
            (tla === undefined) ||  (tra === undefined) ||  (bla === undefined) ||  (bra === undefined)){
            tl = 9;
            tr = 9;
            bl = 9;
            br = 9;
        } else {
            tl = tla;
            tr = tra;
            bl = bla;
            br = bra;
        }  
        localStorage.kalcifertopleft = tl;
        localStorage.kalcifertopright = tr;
        localStorage.kalciferbottomleft = bl;
        localStorage.kalciferbottomright = br;
        document.documentElement.style.setProperty('--border-radius-main', `${tl}px ${tr}px ${br}px ${bl}px `);
    } 

//change font
    let changeFont = (fonta) => {
        let font;
        if ((fonta === '') || (fonta === undefined)){
            font = `'PT Sans', sans-serif`;
        } else if (fonta === 'ptsans') {
            font = `'PT Sans', sans-serif`;
        } else if (fonta === 'caveat') {
            font = `'Caveat', cursive`;
        } else if (fonta === 'marckscript') {
            font = `'Marck Script', cursive`;
        } else if (fonta === 'lobster') {
            font = `'Lobster', cursive`;
        } else if (fonta === 'neucha') {
            font = `'Neucha', cursive`;
        } 
        localStorage.kalciferfont = fonta;
        document.documentElement.style.setProperty('--main-font', `${font}`);
    } 

//open and close custom main style    
    let customMainStyle = () => {
        let el = SE.$('customcolor');
        el.style.display === "none" ? el.style.display = "flex" : el.style.display = "none";        
    }; 
    
//set custom settings    
    let setCustomSettings = (el, val, t) => {  
        if (t === 's'){
            localStorage.setItem(`kalcifer${el}`, `${val.value}`);
            VW.changeSettings(localStorage.kalcifermaincolor, localStorage.kalcifersecondcolor, localStorage.kalciferbgcolor);
        } else if (t === 'r'){
            localStorage.setItem(`kalcifer${el}`, `${val.value}`);
            VW.changeRadius(localStorage.kalcifertopleft, localStorage.kalcifertopright, localStorage.kalciferbottomleft, localStorage.kalciferbottomright);
        } else if (t === 'f'){
            localStorage.setItem(`kalcifer${el}`, `${val.value}`);
            VW.changeFont(localStorage.kalciferfont);
        }
    };

//show users list
    let showUsersList = (el) => {
        if (el.value.length > 1){
            console.log("sdfsdf");
            SE.$('userlist').style.display = 'flex';
            let searchuser = el.value;
            let obj = { "searchuser":searchuser}
            dbParam = JSON.stringify(obj);
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let parseObj = JSON.parse(this.responseText);
                    console.log(parseObj);
                    if (parseObj.length === 0){
                        if (localStorage.kalciferLang === "ua") {
                            SE.$('userlist').innerHTML = '<p style="width:100%; font-size:14px; font-weight:bold; text-align:center;">НЕ ЗНАЙДЕНО...</p>';
                        } else if (localStorage.kalciferLang === "en") {
                            SE.$('userlist').innerHTML = '<p style="width:100%; font-size:14px; font-weight:bold; text-align:center;">NOT FOUND...</p>';
                        }
                    } else {
                        SE.$('userlist').innerHTML = '';
                        for(let i = 0; i < parseObj.length; i++){
                            let avafoto;
                            if ((parseObj[i].ava === null) || (parseObj[i].ava === '') || (parseObj[i].ava === undefined)){
                                avafoto = `./img/ava_empty.jpg`;
                            } else {
                                avafoto = `./uploads/${parseObj[i].ava}`;
                            }
                            SE.$('userlist').innerHTML += `<div class="listusers-boks" id="${parseObj[i].userid}" onclick="VW.renderPage(this)">
                                                            <div class="listusers-img" 
                                                                style="background-image: url('${avafoto}'); 
                                                                background-position: ${parseObj[i].avasettings};">
                                                            </div>    
                                                            <p>${parseObj[i].name} ${parseObj[i].surname}</p>
                                                            </div>`;
                        }
                    }                    
                }
            };
            xmlhttp.open("POST", "/searchuser", true);
            xmlhttp.setRequestHeader("Content-type", "application/json");
            xmlhttp.send(dbParam);
            
        } else {
            SE.$('userlist').style.display = 'none';
        }
    }

//get and render page    
    let renderPage = (el) => {
        console.log(el.id);
        SE.redirect(el.id);        
    }

return {
    buttonLogin,
    openSetting,
    changLang,
    showClearButton,
    clearSearch,
    showPassword,
    rangeAvaFoto,
    changeSettings,
    customMainStyle,
    setCustomSettings,
    changeRadius,
    changeFont,
    showUsersList,
    renderPage
};

})();