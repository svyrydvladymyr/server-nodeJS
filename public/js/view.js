let VW = (() => {
    
//function for change login button
    let buttonLogin = function(){
        let logIn = document.getElementById("send-login-close");
        if (logIn.classList == "click-login-close"){
            logIn.classList = "click-login-open";     
        } else if(logIn.classList == "click-login-open"){
            let inputLogin = SE.$("login").value;
            let inputPassword = SE.$("password").value;
            if ((inputLogin === "") && (inputPassword === "")){
                SE.$('login-message').style.display = 'table';
                SE.$('login-message').innerHTML = MESS.errorFormMessage().autorisNotEmpty;
            } else{
                SE.$('login-message').innerHTML = '';
                SE.$('login-message').style.display = 'none'; 
                let obj, xmlhttp;
                obj = { "login":inputLogin, 
                        "password":inputPassword};
                SE.send(obj, "/autorisation", VW.autorizationSett);                
            }
        }
    };

//function for close login button
    let buttonLoginClose = function(){
        let logIn = document.getElementById("send-login-close");
        if (logIn.classList == "click-login-close"){
            logIn.classList = "click-login-open";     
            SE.$("login").value = '';
            SE.$("password").value = '';
        } else if(logIn.classList == "click-login-open"){        
            if ((SE.$("login").value !== '') || (SE.$("password").value !== '')) {
                VW.buttonLogin();
            } else {
                logIn.classList = "click-login-close";   
                SE.$('login-message').innerHTML = '';
                SE.$('login-message').style.display = 'none'; 
            }
        }
    }

//view after autorization
    let autorizationSett = (res) => {
        let parseObj = JSON.parse(res);
        if (parseObj.err === 'false'){
            SE.$('login-message').style.display = 'table';
            SE.$('login-message').innerHTML = MESS.errorFormMessage().autorisNotAvtoris;
        } else if (parseObj.res !== undefined){
            localStorage.kalcifermaincolor = parseObj.res.maincolor;
            localStorage.kalcifersecondcolor = parseObj.res.secondcolor;
            localStorage.kalciferbgcolor = parseObj.res.bgcolor;
            localStorage.kalcifertopleft = parseObj.res.bordertl;
            localStorage.kalcifertopright = parseObj.res.bordertr;
            localStorage.kalciferbottomleft = parseObj.res.borderbl;
            localStorage.kalciferbottomright = parseObj.res.borderbr;
            localStorage.kalciferfont = parseObj.res.fonts;
            localStorage.kalciferLang = parseObj.res.language;
            SE.redirect(parseObj.res.userid);
        }   
    };    

//for exit from session    
    let exit = (res) => {
        localStorage.kalciferMess = '';       
        localStorage.kalcifermaincolor = '#2d5e8e';
        localStorage.kalcifersecondcolor = '#5c8ab9';
        localStorage.kalciferbgcolor = '#f1f1f1';
        localStorage.kalcifertopleft = 9;
        localStorage.kalcifertopright = 9;
        localStorage.kalciferbottomleft = 9;
        localStorage.kalciferbottomright = 9;
        localStorage.kalciferfont = 'ptsans';
        localStorage.kalciferLang = 'ua';   
        location.reload()
    };    

// function for open and close blok settings
    let openSetting = () => {
        var openGASet = SE.$("set");
        var openGASetting = SE.$("setting");
        var openGAMess = SE.$("messenger");
        openGASet.className === "set" ? openGASet.className = "set_close" : openGASet.className = "set";
        openGASetting.className === "setting" ? openGASetting.className = "setting_close" : openGASetting.className = "setting"; 
        if ((SE.$("messenger")) || (SE.$("messenger_close"))){
            if (openGASet.className === "set") {
                openGAMess.classList.contains("messenger_top_150") ? openGAMess.classList.remove("messenger_top_150") : null;
                openGAMess.classList.add("messenger_top_400");
            } else if (openGASet.className === "set_close"){
                openGAMess.classList.contains("messenger_top_400") ? openGAMess.classList.remove("messenger_top_400") : null;
                openGAMess.classList.add("messenger_top_150"); 
            }
        }
    };

// function for open and close blok messenger
    let ticUpdate, ticUpdatekilk;
    let openMessenger = () => {
        if ((SE.$("messenger")) || (SE.$("messenger_close"))){
            var openGAMess = SE.$("messenger");
            var openGASet = SE.$("set");
            if (openGAMess.classList.contains("messenger")){
                openGAMess.classList.remove("messenger");  
                openGAMess.classList.add("messenger_close"); 
                clearInterval(ticUpdate);
            } else if (openGAMess.classList.contains("messenger_close")){ 
                openGAMess.classList.remove("messenger_close");
                openGAMess.classList.add("messenger");
                SE.$("messenger").addEventListener("click", MESSAGER.messangerList);
                ticUpdate = setInterval(MESSAGER.messangerList, 20000);
            };
            for (let i = 1; i <= 5; i++){
                var openGASettingMess = SE.$(`messenger_set${i}`);
                openGASettingMess.className = openGASettingMess.className === `messenger_set${i}` ? `messenger_set_close${i}` : `messenger_set${i}`;
            }
            if (openGASet.className === "set") {
                openGAMess.classList.contains("messenger_top_150") ? openGAMess.classList.remove("messenger_top_150") : null; 
                openGAMess.classList.add("messenger_top_400");
            } else if (openGASet.className === "set_close"){
                openGAMess.classList.contains("messenger_top_400") ? openGAMess.classList.remove("messenger_top_400") : null;
                openGAMess.classList.add("messenger_top_150"); 
            };
        };
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
    };

//clear search input
    let clearSearch = () => {
        SE.$("search").value = '';
        SE.$("search_clear").style.display = 'none'
        SE.$('userlist').style.display = 'none';
    };

//show password
    let showPassword = () => {
        if (( SE.$("reg-password").type === 'password') || ( SE.$("reg-password").type === "password")){
            SE.$("reg-password").type = 'text';
            SE.$("reg-password-two").type = 'text'
            if(SE.$("reg-oldpassword")){SE.$("reg-oldpassword").type = 'text'}
        } else {
            SE.$("reg-password").type = 'password';
            SE.$("reg-password-two").type = 'password'
            if(SE.$("reg-oldpassword")){SE.$("reg-oldpassword").type = 'password'}
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
    }; 

//change main style
    let changeRadius = (tla, tra, bla, bra) => {
        let tl, tr, bl, br;
        if ((tla === '') ||  (tra === '') ||  (bla === '') ||  (bra === '') || 
            (tla === undefined) ||  (tra === undefined) ||  (bla === undefined) ||  (bra === undefined)){
            tl = 9; tr = 9; bl = 9; br = 9;
        } else { 
            tl = tla; tr = tra; bl = bla; br = bra;
        }  
        localStorage.kalcifertopleft = tl;
        localStorage.kalcifertopright = tr;
        localStorage.kalciferbottomleft = bl;
        localStorage.kalciferbottomright = br;
        document.documentElement.style.setProperty('--border-radius-main', `${tl}px ${tr}px ${br}px ${bl}px `);
    }; 

//change font
    let changeFont = (fonta) => {
        let font;
        if ((fonta === '') || (fonta === undefined)){
            localStorage.kalciferfont = "ptsans";
            document.documentElement.style.setProperty('--main-font', `'PT Sans', sans-serif`);
        } else {
            if (fonta === 'ptsans') {
                font = `'PT Sans', sans-serif`;
            } else if (fonta === 'caveat') {
                font = `'Caveat', cursive`;
            } else if (fonta === 'marckscript') {
                font = `'Marck Script', cursive`;
            } else if (fonta === 'lobster') {
                font = `'Lobster', cursive`;
            } else if (fonta === 'neucha') {
                font = `'Neucha', cursive`;
            } else {
                font = `'PT Sans', sans-serif`;
                fonta = 'ptsans';
            }
            localStorage.kalciferfont = fonta;
            document.documentElement.style.setProperty('--main-font', `${font}`);
        } 
    }; 

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
    let showUsersList = (res) => {
        let parseObj = JSON.parse(res);
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
                if ((/^http:/i.test(parseObj[i].ava)) || (/^https:/i.test(parseObj[i].ava))){
                    avafoto = `${parseObj[i].ava}`;
                } else {
                    avafoto = ((parseObj[i].ava === null) || (parseObj[i].ava === '') || (parseObj[i].ava === undefined)) ? `./img/ava_empty.jpg` : `./uploads/${parseObj[i].ava}`;
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
    };

//get and render page    
    let renderPage = (el) => {
        SE.redirect(el.id);        
    }

//save settings to DB   
    let saveSett = (res) => {
        SE.$('save-settings-mess').innerHTML = 'save...';
        setTimeout(() => {
            SE.$('save-settings-mess').innerHTML = '';
        },1000);    
    };

//for tabs
    let clickTabs = (el) => {
        let classs = document.getElementsByClassName('tabs-form-head-tab');
        for (let i = 1; i <= classs.length; i++){
            if (SE.$(`tab-${i}`).classList.contains("tab-active")){
                SE.$(`tab-${i}`).classList.remove("tab-active");
            }
            SE.$(`tabs-body-${i}`).style.display = 'none';
        }
        el.classList.add('tab-active'); 
        SE.$(`tabs-body-${el.id.slice(-1)}`).style.display = 'table';
    };

// function for add user to DB
    let registerUserToDB = function(res){
        let parseObj = JSON.parse(res);
        if (parseObj.error === 'bad_data'){
            SE.$("main-form-message").innerHTML = 'Bad data';
        } else if (parseObj.error === 'server_error'){
            SE.$("main-form-message").innerHTML = 'Server error';
            setTimeout(() => {
                SE.redirect('/');
            },1000);
        } else if (parseObj.error == 'duplicate_entry_login'){
            SE.$("main-form-message").innerHTML = MESS.errorFormMessage().dupllogin;
            SE.$('reg-login').addEventListener('change', SE.showErrorMainMess);
        } else if (parseObj.error == 'duplicate_entry_email'){
            SE.$("main-form-message").innerHTML = MESS.errorFormMessage().duplemail;  
            SE.$('reg-email').addEventListener('change', SE.showErrorMainMess);
        } else if ((parseObj.affectedRows === 1) && (parseObj.protocol41 === true)){
            SE.addAvaToDB();
        } else {
            console.log(res);
        }      
    };

//-----------------------------------------------------------------------------------------------------
//--------------------------------function for work with update----------------------------------------
//-----------------------------------------------------------------------------------------------------   

//clear icon on update page
    let claerIconUpdPage = (val) => {
        for (let i = 0; i < val.length; i++) {
            if (SE.$(`reg-${val[i]}-mess`)){
                if (SE.$(`reg-${val[i]}-mess`).classList.contains('reg-message-true')){SE.$(`reg-${val[i]}-mess`).classList.remove('reg-message-true')}};
        }
    };

//update security date in user date
    let updateSecurity = (res) => {
        let parseObj = JSON.parse(res);
        if (parseObj.res === 'BAD_PASS') {
            SE.iconON("reg-oldpassword", "false", MESS.errorFormMessage().checkPass);
        } else if (parseObj.res === 'ER_DUP_ENTRY') {
            SE.$('main-form-messageone').innerHTML = MESS.errorFormMessage().dupllogin;            
        } else if (parseObj.res === 0){
            SE.$('main-form-messageone').innerHTML = MESS.errorFormMessage().nochange; 
            VW.claerIconUpdPage(['login-up', 'oldpassword', 'password']);
        } else if (parseObj.res === 1){
            SE.$('main-form-messageone').innerHTML = `${MESS.errorFormMessage().save}`;            
            setTimeout(() => {SE.$('main-form-messageone').innerHTML = `<b style="color:green;">${MESS.errorFormMessage().saved}</b>`;},1000);
            setTimeout(() => {
                SE.$('main-form-messageone').innerHTML = '';
                SE.$('reg-login-up').value = '';
                SE.$('reg-oldpassword').value = '';
                SE.$('reg-password').value = '';
                SE.$('reg-password-two').value = '';
                VW.claerIconUpdPage(['login-up', 'oldpassword', 'password']);
            },2000);
        }
    };    

//update main date in user date
    let updateMain = (res) => {
        let parseObj = JSON.parse(res);
        if (parseObj.res === 'ER_DUP_ENTRY') {
            SE.$('main-form-messagetwo').innerHTML = MESS.errorFormMessage().duplemail;            
        } else if (parseObj.res === 0){
            SE.$('main-form-messagetwo').innerHTML = MESS.errorFormMessage().nochange; 
            VW.claerIconUpdPage(['name', 'surname', 'email', 'age', 'tel', 'message']);
        } else if (parseObj.res === 1){
            SE.$('main-form-messagetwo').innerHTML = `${MESS.errorFormMessage().save}`;            
            setTimeout(() => {SE.$('main-form-messagetwo').innerHTML = `<b style="color:green;">${MESS.errorFormMessage().saved}</b>`;},1000);
            setTimeout(() => {
                SE.$('main-form-messagetwo').innerHTML = '';
                VW.claerIconUpdPage(['name', 'surname', 'email', 'age', 'tel', 'message']);
            },2000);
        }
    };  

//update other date in user date
    let updateOther = (res) => {
        let parseObj = JSON.parse(res);
        if (parseObj.res === 0){
            SE.$('main-form-messagethree').innerHTML = MESS.errorFormMessage().nochange; 
            VW.claerIconUpdPage(['country', 'town', 'profession', 'education']);
        } else if (parseObj.res === 1){
            SE.$('main-form-messagethree').innerHTML = `${MESS.errorFormMessage().save}`;            
            setTimeout(() => {SE.$('main-form-messagethree').innerHTML = `<b style="color:green;">${MESS.errorFormMessage().saved}</b>`;},1000);
            setTimeout(() => {
                SE.$('main-form-messagethree').innerHTML = '';
                VW.claerIconUpdPage(['country', 'town', 'profession', 'education']);
            },2000);
        }
    }; 
    
//-----------------------------------------------------------------------------------------------------
//--------------------------------function for work with widgets---------------------------------------
//-----------------------------------------------------------------------------------------------------   

//save settings widgets
    let saveWidgets = (val, val2) => {
        setTimeout(() => {
            let obj, blogme, blogall;
            if (SE.$(val).checked){obj = {"el":SE.$(val).id, "value":"on", "el2":SE.$(val2).id, "value2":"off"}}  
            if (SE.$(val2).checked){obj = {"el":SE.$(val).id, "value":"off", "el2":SE.$(val2).id, "value2":"on"}}  
            if ((val === 'vblogall') || (val === 'vblogme') || (val === 'vblogall') || (val === 'vblogme')){
                SE.$(val).checked ? blogme = 'on' : blogme = 'off';
                SE.$(val2).checked ? blogall = 'on' : blogall = 'off';
                obj = {"el":"vblogme", "value":blogme, "el2":"vblogall", "value2":blogall};  
            }
            if ((val === 'vfriendme') || (val === 'vfriendall') || (val2 === 'vfriendme') || (val2 === 'vfriendall')){
                SE.$(val).checked ? friendme = 'on' : friendme = 'off';
                SE.$(val2).checked ? friendall = 'on' : friendall = 'off';
                obj = {"el":"vfriendme", "value":friendme, "el2":"vfriendall", "value2":friendall};  
            }
            SE.send(obj, '/widgetsett', VW.saveWidgetsMess);     
        }, 200);
    };  
    
    let saveWidgetsMess = (res) => {
        let parseObj = JSON.parse(res);
        if (parseObj.res.changedRows === 0){
            SE.$('main-form-messagefour').innerHTML = `${MESS.errorFormMessage().nedautoriz}`;            
        } else {
            SE.$('main-form-messagefour').innerHTML = `${MESS.errorFormMessage().save}`;            
            setTimeout(() => {SE.$('main-form-messagefour').innerHTML = `<b style="color:green;">${MESS.errorFormMessage().saved}</b>`;},500);
            setTimeout(() => {SE.$('main-form-messagefour').innerHTML = '';},1000);
        }
    };  

//add color to list widgets
    let adColorToLists = (el) => {
        if (SE.$(`side-sub-${el}`) === null) {
            for (let i = 1; i <= 10; i++){
                if (SE.$(`${el}-box${i}`)){SE.$(`${el}-box${i}`).style.backgroundColor = "#ffffff";}
            }
        } else {
            for (let i = 1; i <= 10; i++){
                if (SE.$(`${el}-box${i}`)){SE.$(`${el}-box${i}`).style.backgroundColor = "#f1f1f1";}
            }
        } 
    }    
 
// animation after send email
    let animationAfterSend = (res) => {   
        let parseObj = JSON.parse(res);    
        if (parseObj.res.slice(0, 12) == '250 2.0.0 OK'){
            SE.$('email-spinet').innerHTML = ``;
            SE.$('send-email').style.width = "0px";
            setTimeout(() => {                
                SE.$('mess-after-send').style.fontSize = '18px';
                SE.$('mess-after-send').innerHTML = `${MESS.errorFormMessage().aftersendemail}`;
            }, 500);
        }
    };
    
//  animation after send email spiner
    let animationAfterSendSpiner = () => {   
        SE.$('email-spinet').innerHTML = `<i class='fas fa-spinner fa-spin' style="color: #5a5a5a; font-size: 25px;"></i>`;
    };

// redirect after verify email 
    let redirectAfterVerify = (res) => {   
        let parseObj = JSON.parse(res).res; 
        setTimeout(() => {
            SE.redirect(parseObj);
        }, 2000);
    };

// for change button after send recover email
    let afterRecoverData = (res) => {   
        let parseObj = JSON.parse(res); 
        if (parseObj.res.slice(0, 12) == '250 2.0.0 OK'){
            SE.$('recover-data').innerHTML = `<p style="color:var(--main-color);">${MESS.errorFormMessage().recoverdatamess}</p>`;
        } else if (parseObj.res  === 'err'){
            SE.$('recover-data').innerHTML = `<p style="color:red;">${MESS.errorFormMessage().recoverdataerr}</p>`;
        } else if (parseObj.res  === 'notfind'){
            SE.$('autoriz-email-send').innerHTML = `<p style="color:red;">${MESS.errorFormMessage().recovernotfind}</p>`;
        }
    };

// animation before delete user
    let animationBeforeDel = () => {
        SE.$('del-blok-wrap').innerHTML = `
            <i class='fas fa-spinner fa-spin' style="color: #5a5a5a; font-size: 80px;"></i>
            <p>${MESS.errorFormMessage().canseldel}</p>
            <div class="del-button" onclick='VW.canselDel()'>
                <p id="del-to-friend">${MESS.errorFormMessage().cansel}</p>
            </div>               
        `;
        let i = 15;
        timerdel = setInterval(() => {            
            SE.$('del-timer').innerHTML = `${i}`;
            i--;
            if (i === 0){
                clearInterval(timerdel);
                SE.$('del-timer').innerHTML = ``;
                SE.send({}, '/beforedeluser', (res) => {
                    let parseObj = JSON.parse(res); 
                    if(parseObj.err === 'Error_authorization'){
                        SE.$('del-blok-wrap').innerHTML = `<p class="del-mess"  id="login-message">${parseObj}</p>`;   
                    } else if (parseObj.res === 'user_del'){
                        SE.redirect('/');
                    }             
                });
            }
        }, 1000);
    }

// cansel delete user
    let canselDel = () => {
        clearInterval(timerdel);
        SE.$('del-timer').innerHTML = ``;
        SE.$('del-blok-wrap').innerHTML = `
        <div id="del-blok-wrap">               
            <p id="del-title">${MESS.errorFormMessage().canselmess}</p>
            <div class="del-button" onclick='VW.animationBeforeDel()'>
                <p id="del-to-friend">${MESS.errorFormMessage().friendsdel}</p>
            </div>
            <p class="del-mess"  id="login-message" style="display: none;"></p>                    
        </div>
        <p id="del-timer" class="del-timer"></p>`;
    }

//----PDF-----------------------------
    let demoFromHTML = () => {   
        var doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        })
        doc.setFontSize(12);
        doc.setFontStyle('bold');           
        doc.text('Hello world!', 50, 10);        
        doc.save('two-by-four.pdf')
    };

//----in work-----------------------------
    let inwork = () => {   
        SE.$('mess-about-add-friend').innerHTML = `В розробці (Under development)`;
        setTimeout(() => {
            SE.$('mess-about-add-friend').innerHTML = '';
        }, 2000);
    };

return {
    buttonLogin,
    buttonLoginClose,
    openSetting,
    openMessenger,
    changLang,
    showClearButton,
    clearSearch,
    showPassword,
    changeSettings,
    customMainStyle,
    setCustomSettings,
    changeRadius,
    changeFont,
    showUsersList,
    renderPage,
    saveSett,
    clickTabs,
    exit,
    autorizationSett,
    registerUserToDB,
    updateSecurity,
    updateMain,
    updateOther,
    saveWidgets,
    saveWidgetsMess,
    adColorToLists,
    animationAfterSend,
    animationAfterSendSpiner,
    redirectAfterVerify,
    afterRecoverData,
    animationBeforeDel,
    canselDel,
    claerIconUpdPage,
    demoFromHTML,
    inwork
    
};

})();