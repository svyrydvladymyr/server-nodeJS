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
                let readyurl; 
                let trimobj = parseObj[i].slice(1, -1);
                let readyproject = trimobj.split(", ");
                let reg = /^https?:\/\//;
                let regexpnew = new RegExp(reg, 'gi');
                if (readyproject[4] === ''){
                    readyurl = ``;
                } else {
                    if (regexpnew.test(readyproject[4])){
                        readyurl = `<i class='fas fa-share' id="projects-edit${i+1}" onclick="SE.redirect('${readyproject[4]}')"></i>`;
                    } else {
                        readyurl = `<i class='fas fa-share' id="projects-edit${i+1}" onclick="SE.redirect('http://${readyproject[4]}')"></i>`;
                    }
                }
                if (readyproject[1] === 'on'){
                    SE.$('projects-conteiner').innerHTML += `
                    <div class="projects-wrap projects-boks" id="projects-box${i+1}">   
                        <div class="skills-boks">
                            <p class="projects-name project-header" id="projects-name">${readyproject[2]}</p>
                            <div class="projects-name project-body" id="projects-description">${readyproject[3]}</div>
                        </div> 
                        <div class="skills-edit">
                            ${readyurl}
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
                if (readyproject[4] === ''){
                    readyurl = ``;
                } else {
                    if (regexpnew.test(readyproject[4])){
                        readyurl = `<i class='fas fa-share' id="projects-edit${i+1}" onclick="SE.redirect('${readyproject[4]}')"></i>`;
                    } else {
                        readyurl = `<i class='fas fa-share' id="projects-edit${i+1}" onclick="SE.redirect('http://${readyproject[4]}')"></i>`;
                    }
                }
                if (readyproject[1] === 'on'){
                    SE.$('projects-conteiner').innerHTML += `
                    <div class="projects-wrap projects-boks" id="progects-boks${i+1}">   
                        <div class="skills-boks">
                            <p class="projects-name project-header" id="projects-name">${readyproject[2]}</p>
                            <div class="projects-name project-body" id="projects-description">${readyproject[3]}</div>
                        </div> 
                        <div class="skills-edit">
                            ${readyurl}
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
            SE.$('save-projects-savelist').innerHTML = `<i class='far fa-save' onclick="WPROJ.saveAfterMove()" id="projects-save-list"></i>`;
            SE.$('save-projects-btnclose').innerHTML = `<i class='fas fa-times' id="close-skills-edit" onclick='SE.send({"userid":window.location.href}, "/showprojects", WPROJ.showProjectsList);'></i>`;
            SE.$('projects-conteiner').innerHTML = ``;
            for (let i = 0; i < parseObj.length; i++){
                let trimobj = parseObj[i].slice(1, -1);
                let readyskill = trimobj.split(", ");
                let chackedskill = readyskill[1] === 'on' ? 'checked' : '';
                SE.$('projects-conteiner').innerHTML += `            
                <div class="projects-wrap" id="projects-box${i+1}" style="width:100%;">   
                    <div class="skills-boks">
                        <div class="skills-text" style="padding:4px 0px;">
                            <input type="checkbox" name="projects-show" class="projects-show" id="projects-show${i+1}" ${chackedskill} onchange="WPROJ.showORhidden(this)">
                            <p class="projects-name" id="projects-name${i+1}" style="width: 90%;">${readyskill[2]}</p>
                        </div>
                        <div class="skills-text">
                            <div class="projects-description" style="font-weight:normal;" id="projects-description${i+1}">${readyskill[3]}</div>
                        </div>
                        <p id="project-url${i+1}" class="project-url" urlproj="${readyskill[4]}" style="margin:0px;"></p>
                    </div> 
                    <div class="skills-edit">
                        <i class='far fa-edit' id="projects-edit${i+1}" onclick="WPROJ.showEditForm(this)"></i>
                        <i class='far fa-trash-alt' id="projects-del${i+1}" onclick="WPROJ.showButtonConfirm(this)"></i>
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
    
    //for show add form to projects list
        let showAddProjectsform = () => {
            let getidconteiner = SE.$('projects-add-form');
            let projectdescription = MESS.errorFormMessage().projectdescription;
            let projectname = MESS.errorFormMessage().projectname;
            let projecturl = MESS.errorFormMessage().projecturl;
            let projectchack = MESS.errorFormMessage().skillschack;
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
                        <input type="text" name="projectname" id="projectname" class="skills-input" maxlength="80" oninput="CHECK.checkWidgetsVal(this)">
                        <p style="width:100%;">${projecturl}</p>
                        <input type="text" name="projecturl" id="projecturl" class="skills-input" maxlength="100" oninput="CHECK.checkWidgetsVal(this)">
                        <p>${projectdescription}</p>
                        <textarea rows="4" cols="50" name="projectdescription" id="projectdescription" class="skills-input" maxlength="200" style="resize: none;" oninput="CHECK.checkWidgetsVal(this)"></textarea>
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
    
        
    //for add project to list
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
                    SE.$('mess-addproj').innerHTML = MESS.errorFormMessage().projectname;
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
    
    
    //for show or hidden project in projects list
        let showORhidden = (el) => {
            let obj;
            let numberskill = el.id.slice(13);
            el.checked ? obj = {"number":numberskill, "chack":"on"} : obj = {"number":numberskill, "chack":"off"};
            SE.send(obj, '/showorhiddenproj', () => {SE.send(obj, '/showprojsingle', WPROJ.showEditProjSingle);});
        };
    
    //for show edit form for single project
        let showEditForm = (el) => {
            let nameproj, numberproj, descriptproj, projurl;
            numberproj = el.id.slice(13);
            nameproj = SE.$(`projects-name${numberproj}`).textContent;
            descriptproj = SE.$(`projects-description${numberproj}`).textContent;
            projurl = SE.$(`project-url${numberproj}`).getAttribute("urlproj");
            SE.$('projects-add-form').innerHTML = ``;
            SE.$('save-projects-savelist').innerHTML = ``;
            SE.$(`projects-box${numberproj}`).innerHTML = `
            <div class="edit-proj-form" id="edit-proj-form${numberproj}">
                <div class="edit-proj-body">
                    <input type="text" name="edit-proj-name" class="edit-proj-name" id="edit-proj-name${numberproj}" value="${nameproj}"  maxlength="80" oninput="CHECK.checkWidgetsVal(this)">
                    <input type="text" name="edit-proj-url" class="edit-proj-name" id="edit-proj-url${numberproj}" value="${projurl}"  maxlength="100" oninput="CHECK.checkWidgetsVal(this)">
                    <textarea name="edit-projdescript" class="edit-proj-name" id="edit-proj-descript${numberproj}" style="resize: none; min-height: 120px;" maxlength="200" oninput="CHECK.checkWidgetsVal(this)">${descriptproj}</textarea>
                </div>
                <div class="edit-skill-edit" style="width:20px;">
                    <i class='far fa-save' onclick="WPROJ.editProjects(${numberproj})"></i>
                    <i class='fas fa-times' onclick="WPROJ.showEditProjSingleObj(${numberproj})"></i>
                </div>
            </div>
            `;
            WPROJ.sortDisable();
        };
    
    //for show single project
        let showEditProjSingleObj = (val) => {
            obj = {"number":val};
            SE.send(obj, '/showprojsingle', WPROJ.showEditProjSingle);
        };

    //for show single project
        let showEditProjSingle = (res) => {
            let name, nameval, chack, chackval, descript, descriptval, number, numberval, urlval, urlproj, chackedproj, openeditform, opendelform, kilkskills;
            let parseObj = JSON.parse(res);
            nameval = `projname${parseObj.number}`;
            name = parseObj.res[0][nameval];
            numberval = `projnumber${parseObj.number}`;
            number = parseObj.res[0][numberval];            
            descriptval = `projdescript${parseObj.number}`;
            descript = parseObj.res[0][descriptval]; 
            chackval = `projchack${parseObj.number}`;
            chack = parseObj.res[0][chackval].toString();
            chackedproj = chack === 'on' ? 'checked' : '';
            urlval = `projurl${parseObj.number}`;
            urlproj = parseObj.res[0][urlval];
            SE.$(`projects-box${number}`).innerHTML = ` 
            <div class="skills-boks">
                <div class="skills-text" style="padding:4px 0px;">
                    <input type="checkbox" name="projects-show" class="projects-show" id="projects-show${number}" ${chackedproj} onchange="WPROJ.showORhidden(this)">
                    <p class="projects-name" id="projects-name${number}" style="width: 90%;">${name}</p>
                </div>
                <div class="skills-text">
                    <div class="projects-description" style="font-weight:normal;" id="projects-description${number}">${descript}</div>
                </div>
                <p id="project-url${number}" class="project-url" urlproj="${urlproj}" style="margin:0px;"></p>
            </div> 
            <div class="skills-edit">
                <i class='far fa-edit' id="projects-edit${number}" onclick="WPROJ.showEditForm(this)"></i>
                <i class='far fa-trash-alt' id="projects-del${number}" onclick="WPROJ.showButtonConfirm(this)"></i>
            </div>`;   
            opendelform = document.getElementsByClassName('projects-confirm-box').length;
            openeditform = document.getElementsByClassName('edit-proj-form').length;
            kilkskills = document.getElementsByClassName('projects-wrap').length;
            if ((openeditform === 0) && (opendelform === 0) && (kilkskills < 10)){
                SE.$('projects-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="WPROJ.showAddProjectsform()" id="skills-show-regform"></i>`;
            }
            if ((openeditform === 0) && (opendelform === 0)){
                WPROJ.sortEnable();
                SE.$('save-projects-savelist').innerHTML = `<i class='far fa-save' id="close-skills-edit" onclick='WPROJ.saveAfterMove()'></i>`;
            }
        };
    
    //for edit single project 
        let editProjects = (val) => {
            let name, descript, urlproj, obj;
            name = SE.$(`edit-proj-name${val}`).value;
            descript = SE.$(`edit-proj-descript${val}`).value;
            urlproj = SE.$(`edit-proj-url${val}`).value;
            obj = {
                "number":val,
                "name":name,
                "descript":descript,
                "urlproj":urlproj
            };
            SE.send(obj, '/editproject', WPROJ.showEditProjSingle);
        };
    
    //for show button for confirm delete
        let showButtonConfirm = (el) => {
            let opendelform, openeditform;            
            opendelform = document.getElementsByClassName('projects-confirm-box').length;
            openeditform = document.getElementsByClassName('edit-proj-form').length;
            if ((openeditform === 0) && (opendelform === 0)){
                numberskill = el.id.slice(12);
                SE.$('save-projects-savelist').innerHTML = ``;
                SE.$('projects-add-form').innerHTML = ``;
                SE.$(`projects-box${numberskill}`).innerHTML = `
                <div class="projects-confirm-box">
                    <div class="proj-confirm-icon">
                        <i class='fas fa-trash-alt' onclick="WPROJ.delProjfromList(${numberskill})"></i>
                        <i class='fas fa-reply-all' style="transform: rotateY(180deg);" onclick="WPROJ.showEditProjSingleObj(${numberskill})"></i>
                    </div>
                </div>
                `;
                WPROJ.sortDisable();
            }
        } 

    //for delete projects from list
        let delProjfromList = (el) => {
            let allnames, allchack, alldescript, allurl, opendelform, openeditform, kilkskills, obj, masnames = [], masdescripts = [], maschacks = [], masurls = [];
            if (el < 11){
                SE.$(`projects-box${el}`).innerHTML = ``;
                SE.$(`projects-box${el}`).style.display = 'none';
            }
            allnames = document.getElementsByClassName('projects-name');
            allchack = document.getElementsByClassName('projects-show');
            alldescript = document.getElementsByClassName('projects-description');
            allurl = document.getElementsByClassName('project-url');
            for (let i = 1; i <= allnames.length; i++){
                masnames.push(allnames[i-1].textContent);
                allchack[i-1].checked ? maschacks.push('on') : maschacks.push('off'); 
                masdescripts.push(alldescript[i-1].textContent);
                masurls.push(allurl[i-1].getAttribute('urlproj'))
            }
            for (let i = 1; i <= 10; i++){
                if (masnames.length !== 10 ){masnames.push(null);}           
                if (maschacks.length !== 10 ){maschacks.push(null);}           
                if (masdescripts.length !== 10 ){masdescripts.push(null);}           
                if (masurls.length !== 10 ){masurls.push(null);}           
            }
            obj = {
                "name":masnames,
                "chack":maschacks,
                "descript":masdescripts,
                "urlproj":masurls
            }
            SE.send(obj, '/updateallprojects', () => {SE.send({"userid":window.location.href}, '/showprojects', WPROJ.showEditProjectsList);});
            opendelform = document.getElementsByClassName('projects-confirm-box').length;
            openeditform = document.getElementsByClassName('edit-proj-form').length;
            kilkskills = document.getElementsByClassName('projects-wrap').length;
            if ((openeditform === 0) && (opendelform === 0) && (kilkskills < 10)){
                SE.$('projects-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="WPROJ.showAddProjectsform()" id="skills-show-regform"></i>`;
            }
        };  

    //for close add project form
    let closeProjectsAddForm = () => {
        WPROJ.sortEnable();
        SE.$('projects-add-form').innerHTML = `<i class='fas fa-plus skills-add' onclick="WPROJ.showAddProjectsform()" id="skills-show-regform"></i>`;
        SE.$('save-projects-savelist').innerHTML = `<i class='far fa-save' id="close-skills-edit" onclick='WPROJ.saveAfterMove()'></i>`;
    };
    
    //for save list after drag list
        let saveAfterMove = () => {
            let allnames;
            allnames = document.getElementsByClassName('projects-wrap');
            SE.$('save-sortlist-proj').innerHTML = MESS.errorFormMessage().saved;         
            setTimeout(() => {
                for (let i = 0; i < allnames.length; i++){
                    let boxid = allnames[i].id.slice(12)-1;
                    if (i !== boxid){WPROJ.delProjfromList(92);
                        break;
                    }
                }
                SE.$('save-sortlist-proj').innerHTML = ''; 
            }, 500);
        };
    
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
        showProjectsList,
        showProjectsListAll,
        showEditProjectsList,
        showAddProjectsform,
        closeProjectsAddForm,
        addProjectstoList,
        showORhidden,
        showEditForm,
        editProjects,
        showEditProjSingleObj,
        showEditProjSingle,
        showButtonConfirm,
        delProjfromList,
        saveAfterMove,
        sortEnable,
        sortDisable 
    };
    
    })();