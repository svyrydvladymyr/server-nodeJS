let WPROJ = (() => {    
    //for show widget skills
        let showProjectsList = (res) => {
            let parseObj = JSON.parse(res);            
            SE.$('projects-add-form').innerHTML = ``;
            SE.$('save-projects-btnclose').innerHTML = ``;
            SE.$('save-projects-btn').innerHTML = ``;
            SE.$('projects-conteiner').innerHTML = ``;   
            SE.$('save-projects-savelist').innerHTML = ``;
            for (let i = 0; i < parseObj.length; i++){
                let resdyurl; 
                let trimobj = parseObj[i].slice(1, -1);
                let readyproject = trimobj.split(", ");
                let reg = /^https?:\/\//;
                let regexpnew = new RegExp(reg, 'gi');
                if (regexpnew.test(readyproject[4])){
                    resdyurl = readyproject[4];
                } else {
                    resdyurl = `http://${readyproject[4]}`;
                }
                if (readyproject[1] === 'on'){
                    SE.$('projects-conteiner').innerHTML += `
                    <div class="projects-wrap projects-boks" id="progects-boks${i+1}">   
                        <div class="skills-boks">
                            <p class="projects-name project-header" id="projects-name">${readyproject[2]}</p>
                            <p class="projects-name project-body" id="projects-description">${readyproject[3]}</p>
                        </div> 
                        <div class="skills-edit">
                            <i class='fas fa-share' id="projects-edit${i+1}" onclick="SE.redirect('${resdyurl}')"></i>
                        </div>  
                    </div>   
                    `;
                }
            }   
            VW.adColorToLists('projects');      
            WPROJ.sortEnable();     
            WPROJ.sortDisable();     
        };

    //for show widget projects for all
        let showProjectsListAll = (res) => {
            let parseObj = JSON.parse(res);
            for (let i = 0; i < parseObj.length; i++){
                let resdyurl; 
                let trimobj = parseObj[i].slice(1, -1);
                let readyproject = trimobj.split(", ");
                let reg = /^https?:\/\//;
                let regexpnew = new RegExp(reg, 'gi');
                regexpnew.test(readyproject[4]) ? resdyurl = readyproject[4] : resdyurl = `http://${readyproject[4]}`;
                if (readyproject[1] === 'on'){
                    SE.$('projects-conteiner').innerHTML += `
                    <div class="projects-wrap projects-boks" id="progects-boks${i+1}">   
                        <div class="skills-boks">
                            <p class="projects-name project-header" id="projects-name">${readyproject[2]}</p>
                            <p class="projects-name project-body" id="projects-description">${readyproject[3]}</p>
                        </div> 
                        <div class="skills-edit">
                            <i class='fas fa-share' id="projects-edit${i+1}" onclick="SE.redirect('${resdyurl}')"></i>
                        </div>  
                    </div>   
                    `;
                }
                VW.adColorToLists('projects');    
            }   
        };  

    //for show edit in widget projects
        let showEditProjectsList = (res) => {
            let parseObj = JSON.parse(res);
            SE.$('projects-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="WPROJ.showAddProjectsform()" id="projects-show-regform"></i>`;
            SE.$('save-projects-savelist').innerHTML = `<i class='far fa-save' onclick="WSKILLS.showAddSkillsform()" id="projects-save-list"></i>`;
            SE.$('save-projects-btnclose').innerHTML = `<i class='fas fa-times' id="close-skills-edit" onclick='SE.send({"userid":window.location.href}, "/showprojects", WPROJ.showProjectsList);'></i>`;
            SE.$('projects-conteiner').innerHTML = ``;
            for (let i = 0; i < parseObj.length; i++){
                let trimobj = parseObj[i].slice(1, -1);
                let readyskill = trimobj.split(", ");
                let chackedskill = readyskill[1] === 'on' ? 'checked' : '';
                SE.$('projects-conteiner').innerHTML += `            
                <div class="skills-wrap" id="projects-box${i+1}" style="width:100%;">   
                    <div class="skills-boks">
                        <div class="skills-text" style="padding:4px 0px;">
                            <input type="checkbox" name="projects-show" class="skills-show" id="projects-show${i+1}" ${chackedskill} onchange="WPROJ.showORhidden(this)">
                            <p class="projects-name" id="projects-name${i+1}" style="width: 90%;">${readyskill[2]}</p>
                        </div>
                        <div class="skills-text">
                            <p class="project-description" style="font-weight:normal;" id="projects-description${i+1}">${readyskill[3]}</p>
                        </div>
                    </div> 
                    <div class="skills-edit">
                        <i class='far fa-edit' id="projects-edit${i+1}" onclick="WSKILLS.showEditForm(this)"></i>
                        <i class='far fa-trash-alt' id="projects-del${i+1}" onclick="WSKILLS.showButtonConfirm(this)"></i>
                    </div>   
                </div>`;
            } 
            VW.adColorToLists('projects');
            WPROJ.sortEnable();
            let kilkskills = document.getElementsByClassName('projects-name').length; 
            if (kilkskills >= 10){
                SE.$('projects-add-form').innerHTML = ``;
            }        
        };
    
    //for show add form to skills list
        let showAddProjectsform = () => {
            let getidconteiner = SE.$('projects-add-form');
            let projectdescription = SE.errorFormMessage().projectdescription;
            let projectname = SE.errorFormMessage().projectname;
            let projecturl = SE.errorFormMessage().projecturl;
            let projectchack = SE.errorFormMessage().skillschack;
            let kilkprojects = document.getElementsByClassName('projects-name').length; 
            SE.$('save-projects-savelist').innerHTML = ``;
            WPROJ.sortEnable();
            WPROJ.sortDisable();
            if (kilkprojects <= 10){
                getidconteiner.innerHTML = `
                <div class="skills-wrap-form" style="max-width:100%; width:100%; background:#ffffff; padding: 10px 0px; border: 2px solid #9e9e9e;">   
                    <div class="skills-boks">
                        <div class="skills-text">
                        <p>${projectchack}</p>
                        <input type="checkbox" name="projectchack" id="projectchack">
                        <p style="width:100%;">${projectname}</p>
                        <input type="text" name="projectname" id="projectname" class="skills-input" maxlength="80">
                        <p style="width:100%;">${projecturl}</p>
                        <input type="text" name="projecturl" id="projecturl" class="skills-input" maxlength="100">
                        <p>${projectdescription}</p>
                        <textarea rows="4" cols="50" name="projectdescription" id="projectdescription" class="skills-input" maxlength="200" style="resize: none;"></textarea>
                        <div class="skills-button">
                            <i class='fas fa-times' id="close-skills" onclick="WPROJ.closeProjectsAddForm()"></i>
                            <i class='far fa-save' id="save-skills" onclick="WPROJ.addProjectstoList()"></i>          
                        </div>
                        <p id="mess-addproj" style="width:100%; text-align:center; color:#b80000;"></p>
                        </div>
                    </div> 
                </div>`;
            }
        };
    
        
    //for add skill to list
        let addProjectstoList = () => {
            let kilkskills = document.getElementsByClassName('projects-name').length; 
            if (kilkskills <= 10){
                let name, chack, descript, kilk, projurl, obj;
                kilk = kilkskills + 1;
                name = SE.$('projectname').value;
                projurl = SE.$('projecturl').value;
                chack = SE.$('projectchack').checked ? 'on' : 'off';            
                descript = SE.$('projectdescription').value;
                if (name === ''){
                    SE.$('mess-addproj').innerHTML = SE.errorFormMessage().projectname;
                    SE.$("projectname").addEventListener("input", () => {SE.$('mess-addproj').innerHTML = '';}); 
                } else {
                    SE.$("projectname").removeEventListener("input", () => {SE.$('mess-addproj').innerHTML = '';}); 
                    SE.$('mess-addproj').innerHTML = '';
                    obj = {
                        "number":kilk,
                        "name":name,
                        "chacked":chack,
                        "descript":descript,
                        "projurl":projurl
                    }
                    SE.send(obj, '/addprojects', () => {SE.send({"userid":window.location.href}, '/showprojects', WPROJ.showEditProjectsList);});
                }
            } else {
                SE.$('projects-add-form').innerHTML = ``;
            } 
        };
    
    
    //for show or hidden skill in al user list
        let showORhidden = (el) => {
            let obj;
            let numberskill = el.id.slice(13);
            el.checked ? obj = {"number":numberskill, "chack":"on"} : obj = {"number":numberskill, "chack":"off"};
            SE.send(obj, '/showorhiddenproj', () => {SE.send(obj, '/showprojsingle', WPROJ.showEditProjSingle);});
        };
    
    // //for show edit form for single skill
    //     let showEditForm = (el) => {
    //         let nameskill, numberskill, levelskill;
    //         numberskill = el.id.slice(11);
    //         nameskill = SE.$(`skills-name${numberskill}`).textContent;
    //         levelskill = SE.$(`skills-range${numberskill}`).style.width.slice(0, SE.$(`skills-range${numberskill}`).style.width.length-1);
    //         SE.$('skills-add-form').innerHTML = ``;
    //         SE.$(`skills-box${numberskill}`).innerHTML = `
    //         <div class="edit-skill-form" id="edit-skill-form${numberskill}">
    //             <div class="edit-skill-body">
    //                 <input type="text" name="edit-skill-name" class="edit-skill-name" id="edit-skill-name${numberskill}" value="${nameskill}"  maxlength="70">
    //                 <div class="skills-line edit-skill-level2"><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p></div>
    //                 <input type="range" name="edit-skill-level" class="edit-skill-level" id="edit-skill-level${numberskill}" min="0" max="100" step="10" value="${levelskill}">
    //             </div>
    //             <div class="edit-skill-edit">
    //                 <i class='far fa-save' onclick="WSKILLS.editSkill(${numberskill})"></i>
    //                 <i class='fas fa-times' onclick="WSKILLS.showEditSkillSingleObj(${numberskill})"></i>
    //             </div>
    //         </div>
    //         `;
    //         WSKILLS.sortDisable();
    //     };
    
    // //for show single skill
    //     let showEditSkillSingleObj = (val) => {
    //         obj = {"number":val};
    //         SE.send(obj, '/showskillsingle', WSKILLS.showEditSkillSingle);
    //     };
    // //for show single skill
    //     let showEditSkillSingle = (res) => {
    //         let name, chack, level, number, chackedskill, openeditform, opendelform, kilkskills;
    //         let parseObj = JSON.parse(res);
    //         nameval = `skill${parseObj.number}`;
    //         name = parseObj.res[0][nameval];
    //         chackval = `skillchack${parseObj.number}`;
    //         chack = parseObj.res[0][chackval].toString();
    //         chackedskill = chack === 'on' ? 'checked' : '';
    //         levelval = `skilllevel${parseObj.number}`;
    //         level = parseObj.res[0][levelval];
    //         numberval = `skillnumber${parseObj.number}`;
    //         number = parseObj.res[0][numberval];        
    //         SE.$(`skills-box${number}`).innerHTML = `
    //         <div class="skills-boks">
    //             <div class="skills-text">
    //                 <input type="checkbox" name="skills-show" class="skills-show" id="skills-show${parseObj.number}" ${chackedskill} onchange="WSKILLS.showORhidden(this)">
    //                 <p class="skills-name" id="skills-name${parseObj.number}">${name}</p>
    //             </div>
    //             <div class="skills-range-wrap">
    //                 <div class="skills-range" id="skills-range${parseObj.number}" style="width: ${level}%;"></div>
    //             </div>
    //         </div> 
    //         <div class="skills-edit">
    //             <i class='far fa-edit' id="skills-edit${parseObj.number}" onclick="WSKILLS.showEditForm(this)"></i>
    //             <i class='far fa-trash-alt' id="skills-del${parseObj.number}" onclick="WSKILLS.showButtonConfirm(this)"></i>
    //         </div>
    //         `;      
    //         opendelform = document.getElementsByClassName('skills-confirm-box').length;
    //         openeditform = document.getElementsByClassName('edit-skill-form').length;
    //         kilkskills = document.getElementsByClassName('skills-wrap').length;
    //         if ((openeditform === 0) && (opendelform === 0) && (kilkskills < 10)){
    //             SE.$('skills-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="WSKILLS.showAddSkillsform()" id="skills-show-regform"></i>`;
    //         }
    //         if ((openeditform === 0) && (opendelform === 0)){
    //             WSKILLS.sortEnable();
    //         }
    //     };
    
    // //for edit single skill 
    //     let editSkill = (val) => {
    //         let name, level, obj;
    //         name = SE.$(`edit-skill-name${val}`).value;
    //         level = SE.$(`edit-skill-level${val}`).value;
    //         obj = {
    //             "number":val,
    //             "name":name,
    //             "level":level,
    //         };
    //         SE.send(obj, '/editskill', WSKILLS.showEditSkillSingle);
    //     };
    
    // //for show button for confirm delete
    //     let showButtonConfirm = (el) => {
    //         let opendelform, openeditform;
    //         opendelform = document.getElementsByClassName('skills-confirm-box').length;
    //         openeditform = document.getElementsByClassName('edit-skill-form').length;
    //         if ((openeditform === 0) && (opendelform === 0)){
    //             numberskill = el.id.slice(10);
    //             SE.$('skills-add-form').innerHTML = ``;
    //             SE.$(`skills-box${numberskill}`).innerHTML = `
    //             <div class="skills-confirm-box">
    //                 <div class="skills-confirm-icon">
    //                     <i class='fas fa-trash-alt' onclick="WSKILLS.delSkillsfromList(${numberskill})"></i>
    //                     <i class='fas fa-reply-all' style="transform: rotateY(180deg);" onclick="WSKILLS.showEditSkillSingleObj(${numberskill})"></i>
    //                 </div>
    //             </div>
    //             `;
    //             WSKILLS.sortDisable();
    //         }
    //     }
    
    // //for delete skill from list
    //     let delSkillsfromList = (el) => {
    //         let allnames, allchack, alllevel, opendelform, openeditform, kilkskills, obj, masnames = [], maschacks = [], maslevels = [];
    //         if (el < 11){
    //             SE.$(`skills-box${el}`).innerHTML = ``;
    //             SE.$(`skills-box${el}`).style.display = 'none';
    //         }
    //         allnames = document.getElementsByClassName('skills-name');
    //         allchack = document.getElementsByClassName('skills-show');
    //         alllevel = document.getElementsByClassName('skills-range');
    //         for (let i = 1; i <= allnames.length; i++){
    //             masnames.push(allnames[i-1].textContent);
    //             allchack[i-1].checked ? maschacks.push('on') : maschacks.push('off'); 
    //             let level = alllevel[i-1].style.width.slice(0, alllevel[i-1].style.width.length-1);      
    //             maslevels.push(level);
    //         }
    //         for (let i = 1; i <= 10; i++){
    //             if (masnames.length !== 10 ){masnames.push(null);}           
    //             if (maschacks.length !== 10 ){maschacks.push(null);}           
    //             if (maslevels.length !== 10 ){maslevels.push(null);}           
    //         }
    //         obj = {
    //             "name":masnames,
    //             "chack":maschacks,
    //             "level":maslevels
    //         }
    //         SE.send(obj, '/updateallskill', () => {SE.send({"userid":window.location.href}, '/showskills', WSKILLS.showEditSkillsList);});
    //         opendelform = document.getElementsByClassName('skills-confirm-box').length;
    //         openeditform = document.getElementsByClassName('edit-skill-form').length;
    //         kilkskills = document.getElementsByClassName('skills-wrap').length;
    //         if ((openeditform === 0) && (opendelform === 0) && (kilkskills < 10)){
    //             SE.$('skills-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="WSKILLS.showAddSkillsform()" id="skills-show-regform"></i>`;
    //         }
    //     };
    
    //for close add project form
    let closeProjectsAddForm = () => {
        WPROJ.sortEnable();
        SE.$('projects-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="WPROJ.showAddProjectsform()" id="skills-show-regform"></i>`;
        SE.$('save-projects-savelist').innerHTML = `<i class='far fa-save' id="close-skills-edit" onclick='WPROJ.saveAfterMove()'></i>`;
    };
    
    // //for save list after drag list
    //     let saveAfterMove = () => {
    //         let allnames;
    //         allnames = document.getElementsByClassName('skills-wrap');
    //         setTimeout(() => {
    //             for (let i = 0; i < allnames.length; i++){
    //                 let boxid = allnames[i].id.slice(10)-1;
    //                 if (i !== boxid){WSKILLS.delSkillsfromList(12)}
    //             }
    //         }, 500);
    //     };
    
    //for enable sort list
        let sortEnable = () => {
            $( "#projects-conteiner" ).sortable();
            $( "#projects-conteiner" ).sortable( "option", "disabled", false );
            $( "#projects-conteiner" ).disableSelection();
            return false;
        }    
    //for disable sort list
        let sortDisable = () => {
            $( "#projects-conteiner" ).sortable("disable");
            return false;
        }    
     
    
    return {
        // showEditSkillsList,
        // delSkillsfromList,
        // showAddSkillsform,
        // closeSkillsAddForm,
        // addSkillstoList,
        showProjectsList,
        showProjectsListAll,
        showEditProjectsList,
        showAddProjectsform,
        closeProjectsAddForm,
        addProjectstoList,
        showORhidden,
        // showEditForm,
        // showEditSkillSingleObj,
        // showEditSkillSingle,
        // editSkill,
        // showButtonConfirm,
        // saveAfterMove,
        sortEnable,
        sortDisable 
    };
    
    })();