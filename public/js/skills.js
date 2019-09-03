let WSKILLS = (() => {    
    //for show widget skills
        let showSkillsList = (res) => {
            let parseObj = JSON.parse(res);
            SE.$('skills-add-form').innerHTML = ``;
            SE.$('save-skills-btnclose').innerHTML = ``;
            SE.$('save-skills-btn').innerHTML = ``;
            SE.$('skills-conteiner').innerHTML = ``;   
            SE.$('save-skills-savelist').innerHTML = ``;
            for (let i = 0; i < parseObj.length; i++){
                let trimobj = parseObj[i].slice(1, -1);
                let readyskill = trimobj.split(", ");
                if (readyskill[1] === 'on'){
                    SE.$('skills-conteiner').innerHTML += `
                    <div class="skills-wrap" id="skills-box${i+1}">   
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
            VW.adColorToLists('skills');          
            WSKILLS.sortEnable();     
            WSKILLS.sortDisable();     
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
                    <div class="skills-wrap" id="skills-box${i+1}">   
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
            VW.adColorToLists('skills');          
        };
    
    //for show edit in widget skills
        let showEditSkillsList = (res) => {
            let parseObj = JSON.parse(res);
            SE.$('skills-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="WSKILLS.showAddSkillsform()" id="skills-show-regform"></i>`;
            SE.$('save-skills-savelist').innerHTML = `<i class='far fa-save' id="close-skills-edit" onclick='WSKILLS.saveAfterMove()'></i>`;
            SE.$('save-skills-btnclose').innerHTML = `<i class='fas fa-times' id="close-skills-edit" onclick='SE.send({"userid":window.location.href}, "/showskills", WSKILLS.showSkillsList);'></i>`;
            SE.$('skills-conteiner').innerHTML = ``;
            for (let i = 0; i < parseObj.length; i++){
                let trimobj = parseObj[i].slice(1, -1);
                let readyskill = trimobj.split(", ");
                let chackedskill = readyskill[1] === 'on' ? 'checked' : '';
                SE.$('skills-conteiner').innerHTML += `            
                <div class="skills-wrap" id="skills-box${i+1}">   
                    <div class="skills-boks">
                        <div class="skills-text">
                            <input type="checkbox" name="skills-show" class="skills-show" id="skills-show${i+1}" ${chackedskill} onchange="WSKILLS.showORhidden(this)">
                            <p class="skills-name" id="skills-name${i+1}" style="width: 90%;">${readyskill[2]}</p>
                        </div>
                        <div class="skills-range-wrap">
                            <div class="skills-range" id="skills-range${i+1}" style="width: ${readyskill[3]}%;"></div>
                        </div>
                    </div> 
                    <div class="skills-edit">
                        <i class='far fa-edit' id="skills-edit${i+1}" onclick="WSKILLS.showEditForm(this)"></i>
                        <i class='far fa-trash-alt' id="skills-del${i+1}" onclick="WSKILLS.showButtonConfirm(this)"></i>
                    </div>   
                </div>`;
            } 
            VW.adColorToLists('skills');          
            WSKILLS.sortDisable();
            WSKILLS.sortEnable();
            let kilkskills = document.getElementsByClassName('skills-name').length; 
            if (kilkskills >= 10){
                SE.$('skills-add-form').innerHTML = ``;
            }        
        };
    
    //for show add form to skills list
        let showAddSkillsform = () => {
            let getidconteiner = SE.$('skills-add-form');
            SE.$('save-skills-savelist').innerHTML = ``;
            let skillslevel = MESS.errorFormMessage().skillslevel;
            let skillsname = MESS.errorFormMessage().skillsname;
            let skillchack = MESS.errorFormMessage().skillschack;
            let kilkskills = document.getElementsByClassName('skills-name').length; 
            WSKILLS.sortEnable();
            WSKILLS.sortDisable();
            if (kilkskills <= 10){
                getidconteiner.innerHTML = `
                <div class="skills-wrap-form" id="">   
                    <div class="skills-boks">
                        <div class="skills-text">
                        <p>${skillchack}</p>
                        <input type="checkbox" name="skillchack" id="skillchack">
                        <p style="width:100%;">${skillsname}</p>
                        <input type="text" name="skillsname" id="skillsname" class="skills-input" maxlength="70" oninput="CHECK.checkWidgetsVal(this)">
                        <p>${skillslevel}</p>
                        <div class="skills-line"><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p></div>
                        <input type="range" step="10" min="0" max="100" id="skillsregname" style="width:100%;">
                        <div class="skills-button">
                            <i class='fas fa-times' id="close-skills" onclick="WSKILLS.closeSkillsAddForm()"></i>
                            <i class='far fa-save' id="save-skills" onclick="WSKILLS.addSkillstoList()"></i>          
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
                    SE.$('mess-addskills').innerHTML = MESS.errorFormMessage().skillsemptyname;
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
                    SE.send(obj, '/addskills', () => {SE.send({"userid":window.location.href}, '/showskills', WSKILLS.showEditSkillsList);});
                    SE.$('save-skills-savelist').innerHTML = `<i class='far fa-save' id="close-skills-edit" onclick='WSKILLS.saveAfterMove()'></i>`;
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
            SE.send(obj, '/showorhiddenskills', () => {SE.send(obj, '/showskillsingle', WSKILLS.showEditSkillSingle);});
        };
    
    //for show edit form for single skill
        let showEditForm = (el) => {
            let nameskill, numberskill, levelskill;
            numberskill = el.id.slice(11);
            nameskill = SE.$(`skills-name${numberskill}`).textContent;
            levelskill = SE.$(`skills-range${numberskill}`).style.width.slice(0, SE.$(`skills-range${numberskill}`).style.width.length-1);
            SE.$('skills-add-form').innerHTML = ``;
            SE.$('save-skills-savelist').innerHTML = ``;
            SE.$(`skills-box${numberskill}`).innerHTML = `
            <div class="edit-skill-form" id="edit-skill-form${numberskill}">
                <div class="edit-skill-body">
                    <input type="text" name="edit-skill-name" class="edit-skill-name" id="edit-skill-name${numberskill}" value="${nameskill}"  maxlength="70" oninput="CHECK.checkWidgetsVal(this)">
                    <div class="skills-line edit-skill-level2"><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p></div>
                    <input type="range" name="edit-skill-level" class="edit-skill-level" id="edit-skill-level${numberskill}" min="0" max="100" step="10" value="${levelskill}">
                </div>
                <div class="edit-skill-edit">
                    <i class='far fa-save' onclick="WSKILLS.editSkill(${numberskill})"></i>
                    <i class='fas fa-times' onclick="WSKILLS.showEditSkillSingleObj(${numberskill})"></i>
                </div>
            </div>
            `;
            WSKILLS.sortDisable();
        };
    
    //for show single skill
        let showEditSkillSingleObj = (val) => {
            obj = {"number":val};
            SE.send(obj, '/showskillsingle', WSKILLS.showEditSkillSingle);
        };

    //for show single skill
        let showEditSkillSingle = (res) => {
            let name, chack, level, number, chackedskill, openeditform, opendelform, kilkskills;
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
                    <input type="checkbox" name="skills-show" class="skills-show" id="skills-show${parseObj.number}" ${chackedskill} onchange="WSKILLS.showORhidden(this)">
                    <p class="skills-name" id="skills-name${parseObj.number}">${name}</p>
                </div>
                <div class="skills-range-wrap">
                    <div class="skills-range" id="skills-range${parseObj.number}" style="width: ${level}%;"></div>
                </div>
            </div> 
            <div class="skills-edit">
                <i class='far fa-edit' id="skills-edit${parseObj.number}" onclick="WSKILLS.showEditForm(this)"></i>
                <i class='far fa-trash-alt' id="skills-del${parseObj.number}" onclick="WSKILLS.showButtonConfirm(this)"></i>
            </div>
            `;      
            opendelform = document.getElementsByClassName('skills-confirm-box').length;
            openeditform = document.getElementsByClassName('edit-skill-form').length;
            kilkskills = document.getElementsByClassName('skills-wrap').length;
            if ((openeditform === 0) && (opendelform === 0) && (kilkskills < 10)){
                SE.$('skills-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="WSKILLS.showAddSkillsform()" id="skills-show-regform"></i>`;
            }
            if ((openeditform === 0) && (opendelform === 0)){
                WSKILLS.sortEnable();
                SE.$('save-skills-savelist').innerHTML = `<i class='far fa-save' id="close-skills-edit" onclick='WSKILLS.saveAfterMove()'></i>`;
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
            SE.send(obj, '/editskill', WSKILLS.showEditSkillSingle);
        };
    
    //for show button for confirm delete
        let showButtonConfirm = (el) => {
            let opendelform, openeditform;
            SE.$('save-skills-savelist').innerHTML = ``;
            opendelform = document.getElementsByClassName('skills-confirm-box').length;
            openeditform = document.getElementsByClassName('edit-skill-form').length;
            if ((openeditform === 0) && (opendelform === 0)){
                numberskill = el.id.slice(10);
                SE.$('skills-add-form').innerHTML = ``;
                SE.$(`skills-box${numberskill}`).innerHTML = `
                <div class="skills-confirm-box">
                    <div class="skills-confirm-icon">
                        <i class='fas fa-trash-alt' onclick="WSKILLS.delSkillsfromList(${numberskill})"></i>
                        <i class='fas fa-reply-all' style="transform: rotateY(180deg);" onclick="WSKILLS.showEditSkillSingleObj(${numberskill})"></i>
                    </div>
                </div>
                `;
                WSKILLS.sortDisable();
            }
        }
    
    //for delete skill from list
        let delSkillsfromList = (el) => {
            let allnames, allchack, alllevel, opendelform, openeditform, kilkskills, obj, masnames = [], maschacks = [], maslevels = [];
            if (el < 11){
                SE.$(`skills-box${el}`).innerHTML = ``;
                SE.$(`skills-box${el}`).style.display = 'none';
            }
            allnames = document.getElementsByClassName('skills-name');
            allchack = document.getElementsByClassName('skills-show');
            alllevel = document.getElementsByClassName('skills-range');
            for (let i = 1; i <= allnames.length; i++){
                masnames.push(allnames[i-1].textContent);
                allchack[i-1].checked ? maschacks.push('on') : maschacks.push('off'); 
                let level = alllevel[i-1].style.width.slice(0, alllevel[i-1].style.width.length-1);      
                maslevels.push(level);
            }
            for (let i = 1; i <= 10; i++){
                if (masnames.length !== 10 ){masnames.push(null);}           
                if (maschacks.length !== 10 ){maschacks.push(null);}           
                if (maslevels.length !== 10 ){maslevels.push(null);}           
            }
            obj = {
                "name":masnames,
                "chack":maschacks,
                "level":maslevels
            }
            SE.send(obj, '/updateallskill', () => {SE.send({"userid":window.location.href}, '/showskills', WSKILLS.showEditSkillsList);});
            opendelform = document.getElementsByClassName('skills-confirm-box').length;
            openeditform = document.getElementsByClassName('edit-skill-form').length;
            kilkskills = document.getElementsByClassName('skills-wrap').length;
            if ((openeditform === 0) && (opendelform === 0) && (kilkskills < 10)){
                SE.$('skills-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="WSKILLS.showAddSkillsform()" id="skills-show-regform"></i>`;
            }
        };
    
    //for delete skill from list
        let closeSkillsAddForm = () => {
            WSKILLS.sortEnable();
            SE.$('skills-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="WSKILLS.showAddSkillsform()" id="skills-show-regform"></i>`;
            SE.$('save-skills-savelist').innerHTML = `<i class='far fa-save' id="close-skills-edit" onclick='WSKILLS.saveAfterMove()'></i>`;
        };
    
    //for save list after drag list
        let saveAfterMove = () => {
            let allnames;
            allnames = document.getElementsByClassName('skills-wrap');
            SE.$('save-sortlist').innerHTML = MESS.errorFormMessage().saved;         
            setTimeout(() => {
                for (let i = 0; i < allnames.length; i++){
                    let boxid = allnames[i].id.slice(10)-1;
                    if (i !== boxid){WSKILLS.delSkillsfromList(82);
                        break;
                    }
                }
                SE.$('save-sortlist').innerHTML = '';       
            }, 500);
        };
    
    //for enable sort list
        let sortEnable = () => {
            $( "#skills-conteiner" ).sortable();
            $( "#skills-conteiner" ).sortable( "option", "disabled", false );
            $( "#skills-conteiner" ).disableSelection();
            return false;
        }    
    //for disable sort list
        let sortDisable = () => {
            $( "#skills-conteiner" ).sortable("disable");
            return false;
        }    
     
    
    return {
        showEditSkillsList,
        delSkillsfromList,
        showAddSkillsform,
        closeSkillsAddForm,
        addSkillstoList,
        showSkillsList,
        showSkillsListForAll,
        showORhidden,
        showEditForm,
        showEditSkillSingleObj,
        showEditSkillSingle,
        editSkill,
        showButtonConfirm,
        saveAfterMove,
        sortEnable,
        sortDisable 
    };
    
    })();