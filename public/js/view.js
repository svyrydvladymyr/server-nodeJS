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
                SE.$('login-message').innerHTML = SE.errorFormMessage().autorisNotEmpty;
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

//view after autorization
    let autorizationSett = (res) => {
        let parseObj = JSON.parse(res);
        if (parseObj.err === 'false'){
            SE.$('login-message').style.display = 'table';
            SE.$('login-message').innerHTML = SE.errorFormMessage().autorisNotAvtoris;
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
            SE.$("reg-oldpassword").type = 'text'
        } else {
            SE.$("reg-password").type = 'password';
            SE.$("reg-password-two").type = 'password'
            SE.$("reg-oldpassword").type = 'password'
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
    }; 

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
    };

//get and render page    
    let renderPage = (el) => {
        console.log(el.id);
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
        if (parseObj.error === 'duplicate_entry_login'){
            SE.$("main-form-message").innerHTML = SE.errorFormMessage().dupllogin;
            SE.$('reg-login').addEventListener('change', showErrorMainMess);
        } else if (parseObj.error === 'duplicate_entry_email'){
            SE.$("main-form-message").innerHTML = SE.errorFormMessage().duplemail;  
            SE.$('reg-email').addEventListener('change', showErrorMainMess);
        } else if ((parseObj.affectedRows === 1) && (parseObj.protocol41 === true)){
            SE.addAvaToDB();
        } else {
            console.log(res);
        }      
    };

//update security date in user date
    let updateSecurity = (res) => {
        let parseObj = JSON.parse(res);
        if (parseObj.res === 'BAD_PASS') {
            SE.iconON("reg-oldpassword", "false", SE.errorFormMessage().checkPass);
        } else if (parseObj.res === 'ER_DUP_ENTRY') {
            SE.$('main-form-messageone').innerHTML = SE.errorFormMessage().dupllogin;            
        } else if (parseObj.res === 0){
            SE.$('main-form-messageone').innerHTML = SE.errorFormMessage().notCorectVar; 
        } else if (parseObj.res === 1){
            SE.$('main-form-messageone').innerHTML = `${SE.errorFormMessage().save}`;            
            setTimeout(() => {SE.$('main-form-messageone').innerHTML = `<b style="color:green;">${SE.errorFormMessage().saved}</b>`;},1000);
            setTimeout(() => {SE.$('main-form-messageone').innerHTML = '';},3000);
            SE.$('reg-login-up').value = '';
            SE.$('reg-oldpassword').value = '';
            SE.$('reg-password').value = '';
            SE.$('reg-password-two').value = '';
            if (SE.$('reg-login-up-mess').classList.contains('reg-message-true')){
                SE.$('reg-login-up-mess').classList.remove('reg-message-true');}
            if (SE.$('reg-oldpassword-mess').classList.contains('reg-message-true')){
                SE.$('reg-oldpassword-mess').classList.remove('reg-message-true');}
            if (SE.$('reg-password-mess').classList.contains('reg-message-true')){
                SE.$('reg-password-mess').classList.remove('reg-message-true');}
        }
    };    

//update main date in user date
    let updateMain = (res) => {
        let parseObj = JSON.parse(res);
        if (parseObj.res === 'ER_DUP_ENTRY') {
            SE.$('main-form-messagetwo').innerHTML = SE.errorFormMessage().duplemail;            
        } else if (parseObj.res === 0){
            SE.$('main-form-messagetwo').innerHTML = SE.errorFormMessage().notCorectVar; 
        } else if (parseObj.res === 1){
            SE.$('main-form-messagetwo').innerHTML = `${SE.errorFormMessage().save}`;            
            setTimeout(() => {SE.$('main-form-messagetwo').innerHTML = `<b style="color:green;">${SE.errorFormMessage().saved}</b>`;},1000);
            setTimeout(() => {SE.$('main-form-messagetwo').innerHTML = '';},3000);
            if (SE.$('reg-name-mess').classList.contains('reg-message-true')){
                SE.$('reg-name-mess').classList.remove('reg-message-true');}
            if (SE.$('reg-surname-mess').classList.contains('reg-message-true')){
                SE.$('reg-surname-mess').classList.remove('reg-message-true');}
            if (SE.$('reg-email-mess').classList.contains('reg-message-true')){
                SE.$('reg-email-mess').classList.remove('reg-message-true');}
            if (SE.$('reg-age-mess').classList.contains('reg-message-true')){
                SE.$('reg-age-mess').classList.remove('reg-message-true');}
            if (SE.$('reg-tel-mess').classList.contains('reg-message-true')){
                SE.$('reg-tel-mess').classList.remove('reg-message-true');}
            if (SE.$('reg-message-mess').classList.contains('reg-message-true')){
                SE.$('reg-message-mess').classList.remove('reg-message-true');}
        }
    };  

//update other date in user date
    let updateOther = (res) => {
        let parseObj = JSON.parse(res);
        if (parseObj.res === 0){
            SE.$('main-form-messagethree').innerHTML = SE.errorFormMessage().notCorectVar; 
        } else if (parseObj.res === 1){
            SE.$('main-form-messagethree').innerHTML = `${SE.errorFormMessage().save}`;            
            setTimeout(() => {SE.$('main-form-messagethree').innerHTML = `<b style="color:green;">${SE.errorFormMessage().saved}</b>`;},1000);
            setTimeout(() => {SE.$('main-form-messagethree').innerHTML = '';},3000);
            if (SE.$('reg-country-mess').classList.contains('reg-message-true')){
                SE.$('reg-country-mess').classList.remove('reg-message-true');}
            if (SE.$('reg-town-mess').classList.contains('reg-message-true')){
                SE.$('reg-town-mess').classList.remove('reg-message-true');}
            if (SE.$('reg-profession-mess').classList.contains('reg-message-true')){
                SE.$('reg-profession-mess').classList.remove('reg-message-true');}
        }
    };  
    
    
//update ava date in user date
    let updateAva = () => {
        if (SE.$('reg-file').files.length === 1){
            if (SE.$('reg-file').files[0].size > 1024000) {
                SE.$('ava-mess-main').innerHTML = SE.errorFormMessage().toLBigFile;  
                setTimeout(() => {SE.$('ava-mess-main').innerHTML = ''}, 3000);
            } else {
                //show preview
                SE.$('ava-preview-wrap-main').style.display = 'flex';
                SE.readURLPreview();                             
            }
        }
    };  

//-----------------------------------------------------------------------------------------------------
//--------------------------------function work with widgets-------------------------------------------
//-----------------------------------------------------------------------------------------------------   

//save settings widgets
    let saveWidgets = (val) => {
        let obj;
        SE.$(val).checked ? obj = {"el":SE.$(val).id, "value":"on"} : obj = {"el":SE.$(val).id, "value":"off"};
        SE.send(obj, '/widgetsett', VW.saveWidgetsMess);        
    };  
    
    let saveWidgetsMess = (res) => {
        let parseObj = JSON.parse(res);
        if (parseObj.res.changedRows === 0){
            SE.$('main-form-messagefour').innerHTML = `${SE.errorFormMessage().nedautoriz}`;            
        } else {
            SE.$('main-form-messagefour').innerHTML = `${SE.errorFormMessage().save}`;            
            setTimeout(() => {SE.$('main-form-messagefour').innerHTML = `<b style="color:green;">${SE.errorFormMessage().saved}</b>`;},500);
            setTimeout(() => {SE.$('main-form-messagefour').innerHTML = '';},1000);
        }

    };

//for show widget skills
    let showSkillsList = (res) => {
        let parseObj = JSON.parse(res);
        SE.$('skills-add-form').innerHTML = ``;
        SE.$('save-skills-btnclose').innerHTML = ``;
        SE.$('save-skills-btn').innerHTML = ``;
        SE.$('skills-conteiner').innerHTML = ``;
        for (let i = 0; i < parseObj.length; i++){
            let trimobj = parseObj[i].slice(1, -1);
            let readyskill = trimobj.split(", ");
            if (readyskill[1] === 'on'){
                SE.$('skills-conteiner').innerHTML += `
                <div class="skills-wrap">   
                    <div class="skills-boks">
                        <div class="skills-text">
                            <p class="skills-name" id="skills-name">${readyskill[2]}</p>
                        </div>
                        <div class="skills-range-wrap">
                            <div class="skills-range" id="skills-range" style="width: ${readyskill[3]}%;"></div>
                        </div>
                    </div> 
                </div>   
                `;
            }
        }        
    };

//for show widget skills for all
    let showSkillsListForAll = (res) => {
        let parseObj = JSON.parse(res);
        SE.$('skills-conteiner').innerHTML = ``;
        for (let i = 0; i < parseObj.length; i++){
            let trimobj = parseObj[i].slice(1, -1);
            let readyskill = trimobj.split(", ");
            if (readyskill[1] === 'on'){
                SE.$('skills-conteiner').innerHTML += `
                <div class="skills-wrap">   
                    <div class="skills-boks">
                        <div class="skills-text">
                            <p class="skills-name" id="skills-name">${readyskill[2]}</p>
                        </div>
                        <div class="skills-range-wrap">
                            <div class="skills-range" id="skills-range" style="width: ${readyskill[3]}%;"></div>
                        </div>
                    </div> 
                </div>`;
            }
        }        
    };

//for show edit in widget skills
    let showEditSkillsList = (res) => {
        let parseObj = JSON.parse(res);
        SE.$('skills-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="VW.showAddSkillsform()" id="skills-show-regform"></i>`;
        SE.$('save-skills-btn').innerHTML = `<i class='far fa-save' id="save-skills" onclick="VW.saveSkillsfromList()"></i>`;
        SE.$('save-skills-btnclose').innerHTML = `<i class='fas fa-times' id="close-skills-edit" onclick="SE.send({}, '/showskills', VW.showSkillsList);"></i>`;
        SE.$('skills-conteiner').innerHTML = ``;
        for (let i = 0; i < parseObj.length; i++){
            let trimobj = parseObj[i].slice(1, -1);
            let readyskill = trimobj.split(", ");
            let chackedskill = readyskill[1] === 'on' ? 'checked' : '';
            SE.$('skills-conteiner').innerHTML += `
            <div class="skills-wrap" id="skills-box${i+1}">   
                <div class="skills-boks">
                    <div class="skills-text">
                        <input type="checkbox" name="skills-show" class="skills-show" id="skills-show${i+1}" ${chackedskill} onchange="VW.showORhidden(this)">
                        <p class="skills-name" id="skills-name${i+1}">${readyskill[2]}</p>
                    </div>
                    <div class="skills-range-wrap">
                        <div class="skills-range" id="skills-range${i+1}" style="width: ${readyskill[3]}%;"></div>
                    </div>
                </div> 
                <div class="skills-edit">
                    <i class='far fa-edit' id="skills-edit${i+1}" onclick="VW.showEditForm(this)"></i>
                    <i class='far fa-trash-alt' id="skills-del${i+1}" onclick="VW.showButtonConfirm(this)"></i>
                </div>   
            </div>`;
        } 
        let kilkskills = document.getElementsByClassName('skills-name').length; 
        if (kilkskills >= 10){
            SE.$('skills-add-form').innerHTML = ``;
        }        
    };

//for show add form to skills list
    let showAddSkillsform = () => {
        let getidconteiner = SE.$('skills-add-form');
        let skillslevel = SE.errorFormMessage().skillslevel;
        let skillsname = SE.errorFormMessage().skillsname;
        let skillchack = SE.errorFormMessage().skillschack;
        let kilkskills = document.getElementsByClassName('skills-name').length; 
        if (kilkskills <= 10){
            getidconteiner.innerHTML = `
            <div class="skills-wrap" id="">   
                <div class="skills-boks">
                    <div class="skills-text">
                    <p>${skillchack}</p>
                    <input type="checkbox" name="skillchack" id="skillchack">
                    <p style="width:100%;">${skillsname}</p>
                    <input type="text" name="skillsname" id="skillsname" class="skills-input" maxlength="70">
                    <p>${skillslevel}</p>
                    <div class="skills-line"><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p></div>
                    <input type="range" step="10" min="0" max="100" id="skillsregname" style="width:100%;">
                    <div class="skills-button">
                        <i class='fas fa-times' id="close-skills" onclick="VW.closeSkillsAddForm()"></i>
                        <i class='far fa-save' id="save-skills" onclick="VW.addSkillstoList()"></i>          
                    </div>
                    <p id="mess-addskills" style="width:100%; text-align:center; color:#b80000;"></p>
                    </div>
                </div> 
            </div>`;
        }
    };

    
//for add skill tom list
    let addSkillstoList = () => {
        let kilkskills = document.getElementsByClassName('skills-name').length; 
        if (kilkskills <= 10){
            let name, chack, level, kilk, obj;
            kilk = kilkskills + 1;
            name = SE.$('skillsname').value;
            chack = SE.$('skillchack').checked ? 'on' : 'off';            
            level = SE.$('skillsregname').value;
            if (name === ''){
                SE.$('mess-addskills').innerHTML = SE.errorFormMessage().skillsemptyname;
                SE.$("skillsname").addEventListener("input", () => {SE.$('mess-addskills').innerHTML = '';}); 
            } else {
                SE.$("skillsname").removeEventListener("input", () => {SE.$('mess-addskills').innerHTML = '';}); 
                SE.$('mess-addskills').innerHTML = '';
                obj = {
                    "number":kilk,
                    "name":name,
                    "chacked":chack,
                    "level":level
                }
                SE.send(obj, '/addskills', () => {SE.send({}, '/showskills', VW.showEditSkillsList);});
            }
        } else {
            SE.$('skills-add-form').innerHTML = ``;
        } 
    };


//for show or hidden skill in al user list
    let showORhidden = (el) => {
        let obj;
        let numberskill = el.id.slice(11);
        el.checked ? obj = {"number":numberskill, "chack":"on"} : obj = {"number":numberskill, "chack":"off"};
        SE.send(obj, '/showorhiddenskills', () => {SE.send(obj, '/showskillsingle', VW.showEditSkillSingle);});        
    };

//for show edit form for single skill
    let showEditForm = (el) => {
        let nameskill, numberskill, levelskill;
        numberskill = el.id.slice(11);
        nameskill = SE.$(`skills-name${numberskill}`).textContent;
        levelskill = SE.$(`skills-range${numberskill}`).style.width.slice(0, SE.$(`skills-range${numberskill}`).style.width.length-1);
        SE.$('skills-add-form').innerHTML = ``;
        SE.$(`skills-box${numberskill}`).innerHTML = `
        <div class="edit-skill-form" id="edit-skill-form${numberskill}">
            <div class="edit-skill-body">
                <input type="text" name="edit-skill-name" class="edit-skill-name" id="edit-skill-name${numberskill}" value="${nameskill}"  maxlength="70">
                <div class="skills-line edit-skill-level2"><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p></div>
                <input type="range" name="edit-skill-level" class="edit-skill-level" id="edit-skill-level${numberskill}" min="0" max="100" step="10" value="${levelskill}">
            </div>
            <div class="edit-skill-edit">
                <i class='far fa-save' onclick="VW.editSkill(${numberskill})"></i>
                <i class='fas fa-times' onclick="VW.showEditSkillSingleObj(${numberskill})"></i>
            </div>
        </div>
        `;
    };

//for show single skill
    let showEditSkillSingleObj = (val) => {
        obj = {"number":val};
        SE.send(obj, '/showskillsingle', VW.showEditSkillSingle);
    };
//for show single skill
    let showEditSkillSingle = (res) => {
        let name, chack, level, number, chackedskill, openeditform, kilkskills;
        let parseObj = JSON.parse(res);
        nameval = `skill${parseObj.number}`;
        name = parseObj.res[0][nameval];
        chackval = `skillchack${parseObj.number}`;
        chack = parseObj.res[0][chackval].toString();
        chackedskill = chack === 'on' ? 'checked' : '';
        levelval = `skilllevel${parseObj.number}`;
        level = parseObj.res[0][levelval];
        numberval = `skillnumber${parseObj.number}`;
        number = parseObj.res[0][numberval];        
        SE.$(`skills-box${number}`).innerHTML = `
        <div class="skills-boks">
            <div class="skills-text">
                <input type="checkbox" name="skills-show" class="skills-show" id="skills-show${parseObj.number}" ${chackedskill} onchange="VW.showORhidden(this)">
                <p class="skills-name" id="skills-name${parseObj.number}">${name}</p>
            </div>
            <div class="skills-range-wrap">
                <div class="skills-range" id="skills-range${parseObj.number}" style="width: ${level}%;"></div>
            </div>
        </div> 
        <div class="skills-edit">
            <i class='far fa-edit' id="skills-edit${parseObj.number}" onclick="VW.showEditForm(this)"></i>
            <i class='far fa-trash-alt' id="skills-del${parseObj.number}" onclick="VW.showButtonConfirm(this)"></i>
        </div>
        `;
        openeditform = document.getElementsByClassName('edit-skill-form').length;
        kilkskills = document.getElementsByClassName('skills-wrap').length;
        if ((openeditform === 0) && (kilkskills < 10)){
            SE.$('skills-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="VW.showAddSkillsform()" id="skills-show-regform"></i>`;
        }
    };

//for edit single skill 
    let editSkill = (val) => {
        let name, level, obj;
        name = SE.$(`edit-skill-name${val}`).value;
        level = SE.$(`edit-skill-level${val}`).value;
        obj = {
            "number":val,
            "name":name,
            "level":level,
        };
        SE.send(obj, '/editskill', VW.showEditSkillSingle);
    };

//for show button for confirm delete
    let showButtonConfirm = (el) => {
        console.log(el);
        numberskill = el.id.slice(10);
        console.log(numberskill);
        SE.$(`skills-box${numberskill}`).innerHTML = `
        <div class="skills-confirm-box">
        </div>
        `;
    }

//for delete skill from list
    let delSkillsfromList = (el) => {
        console.log(el);
        let numberskill, allnames, allchack, alllevel, masnames = [], maschacks = [], maslevels = [];
        numberskill = el.id.slice(10);
        console.log(numberskill);

        SE.$(`skills-box${numberskill}`).innerHTML = ``;
        SE.$(`skills-box${numberskill}`).style.display = 'none';

        allnames = document.getElementsByClassName('skills-name');
        allchack = document.getElementsByClassName('skills-show');
        alllevel = document.getElementsByClassName('skills-range');
        console.log(allnames.length);
        console.log(allchack.length);
        console.log(alllevel.length);

        for (let i = 1; i <= allnames.length; i++){
            masnames.push(allnames[i-1].textContent);
        }
        for (let i = 1; i <= 10; i++){
            if (SE.$(`skills-show${i}`)){
                if (SE.$(`skills-show${i}`).checked){
                    maschacks.push('on');
                } else {
                    maschacks.push('off');
                } 
            }
        }
        for (let i = 1; i <= 10; i++){
            if (SE.$(`skills-range${i}`)){  
                let level = SE.$(`skills-range${i}`).style.width.slice(0, SE.$(`skills-range${i}`).style.width.length-1);      
                console.log(level);
                
                maslevels.push(level);
            }
        }
        for (let i = 1; i <= 10; i++){
            if (masnames.length !== 10 ){masnames.push(null);}           
            if (maschacks.length !== 10 ){maschacks.push(null);}           
            if (maslevels.length !== 10 ){maslevels.push(null);}           
        }
        console.log(masnames);
        console.log(maschacks);
        console.log(maslevels);
        
    };

//for save all skills list
    let saveSkillsfromList = () => {
        console.log('save');
        
    };

//for delete skill from list
    let closeSkillsAddForm = () => {
        SE.$('skills-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="VW.showAddSkillsform()" id="skills-show-regform"></i>`;
    };


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
    renderPage,
    saveSett,
    clickTabs,
    exit,
    autorizationSett,
    registerUserToDB,
    updateSecurity,
    updateMain,
    updateOther,
    updateAva,
    saveWidgets,
    saveWidgetsMess,
    showEditSkillsList,
    delSkillsfromList,
    showAddSkillsform,
    closeSkillsAddForm,
    addSkillstoList,
    showSkillsList,
    saveSkillsfromList,
    showSkillsListForAll,
    showORhidden,
    showEditForm,
    showEditSkillSingleObj,
    showEditSkillSingle,
    editSkill,
    showButtonConfirm 
};

})();