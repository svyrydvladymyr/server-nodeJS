let MESSAGER = (() => {   
    var masShovs = [];
    var iter = 0;

    //for hidden messanger write box
    let hiddenWriteBox = () => {
        clearInterval(ticUpdateMess);
        SE.$('messenger_write_send_body').innerHTML = ``;
        SE.$('messenger_write_delblok_wrap').innerHTML = '';
        SE.$('messenger_write_header_icon').innerHTML = `<div class="messenger-notreaded-mess" id="messenger-notreaded-mess"></div>
                                                         <i class='fas fa-times' onclick="SE.$('messenger_write').innerHTML = ''"></i>`;
    };

    //for close messanger write box
    let closeWriteBox = () => {
        SE.$('messenger_write').innerHTML = ''; 
        localStorage.kalciferMess = ''; 
        clearInterval(ticUpdateMess);
    };

    //for check langth textarea 
    let lengthText = (val) => {
        SE.$('messenger_write_langth').innerHTML = `${900 - val.value.length}`;        
    };

    //for send message
    let sendMessage = () => {
        if (SE.$("messenger_write_input").value !== ''){ 
            let smilecod = ['&#128515;', '&#128516;', '&#128518;', '&#128519;', '&#128520;', 
                            '&#128523;', '&#128525;', '&#128526;', '&#128536;', '&#128539;', 
                            '&#128549;', '&#128561;', '&#129315;', '&#128545;', '&#129314;', 
                            '&#129313;', '&#127877;', '&#128568;',
                            '&#128076;', '&#128405;', '&#128077;', '&#128078;', '&#128400;',
                            '&#129304;', '&#128074;', '&#128079;', '&#128070;', '&#128071;',
                            '&#128072;', '&#128073;', '&#128170;', '&#128406;', '&#128591;',
                            '&#129305;', '&#129310;', '&#129309;',
                            '&#129505;', '&#x1F5A4;', '&#128147;', '&#128148;', '&#128149;',
                            '&#128150;', '&#128151;', '&#128152;', '&#128153;', '&#128154;',
                            '&#128155;', '&#128156;', '&#128157;', '&#128158;', '&#128159;',
                            '&#128143;', '&#128139;', '&#127880;',
                            '&#127805;', '&#127812;', '&#127813;', '&#127814;', '&#127815;',
                            '&#127817;', '&#127818;', '&#127819;', '&#127820;', '&#127822;',
                            '&#127823;', '&#127826;', '&#127827;', '&#129361;', '&#129362;',
                            '&#129365;', '&#129373;', '&#129381;'];
            let smilepicSM = [/😃/gi, /😄/gi, /😆/gi, /😇/gi, /😈/gi, 
                              /😋/gi, /😍/gi, /😎/gi, /😘/gi, /😛/gi, 
                              /😥/gi, /😱/gi, /🤣/gi, /😡/gi, /🤢/gi, 
                              /🤡/gi, /🎅/gi, /😸/gi,
                              /👌/gi, /🖕/gi, /👍/gi, /👎/gi, /🖐/gi,
                              /🤘/gi, /👊/gi, /👏/gi, /👆/gi, /👇/gi,
                              /👈/gi, /👉/gi, /💪/gi, /🖖/gi, /🙏/gi,
                              /🤙/gi, /🤞/gi, /🤝/gi,
                              /🧡/gi, /🖤/gi, /💓/gi, /💔/gi, /💕/gi,
                              /💖/gi, /💗/gi, /💘/gi, /💙/gi, /💚/gi,
                              /💛/gi, /💜/gi, /💝/gi, /💞/gi, /💟/gi,
                              /💏/gi, /💋/gi, /🎈/gi,
                              /🌽/gi, /🍄/gi, /🍅/gi, /🍆/gi, /🍇/gi,
                              /🍉/gi, /🍊/gi, /🍋/gi, /🍌/gi, /🍎/gi,
                              /🍏/gi, /🍒/gi, /🍓/gi, /🥑/gi, /🥒/gi,
                              /🥕/gi, /🥝/gi, /🥥/gi];
            let replsm = [];
            replsm[0] = SE.$("messenger_write_input").value;            
            for(let i = 0; i < 88; i++){
                replsm[i+1] = replsm[i].replace(smilepicSM[i], smilecod[i]);
            }
            let obj = {"mess":`${replsm[88]}`, "tofriend":`${SE.$("messenger_write_header_name").getAttribute('friend')}`};
            SE.send(obj, "/sendmessage", (res) => {
                if (JSON.parse(res).res === 1) {
                    SE.$("messenger_write_input").value = '';
                    MESSAGER.messangerList();
                    SE.$("messenger_write_write").innerHTML = '';  
                    SE.$('messenger_write_write').setAttribute('step', 0);  
                    masShovs = [0];
                    iter = 0;   
                    MESSAGER.showMess(SE.$("messenger_write_header_name").getAttribute('friend'), 10, 0, 'send');
                }
            });
        }        
    };

    //show messanger list
    let messangerList = (val) => {
        SE.$("messenger").removeEventListener("click", MESSAGER.messangerList);
        if (SE.$("messenger").classList.contains("messenger")){
            SE.send({}, "/messangerlist", (res) => {   
                if ((JSON.parse(res).noreaded) || (JSON.parse(res).readed)) {
                    let splno = JSON.parse(res).noreaded.split("|");
                    let spl = JSON.parse(res).readed.split("|");      
                    SE.$("messenger-wrap").innerHTML = '';
                    for (let i = 1; i < splno.length; i++) {                  
                        let x = splno[i].split(",");                
                        SE.$("messenger-wrap").innerHTML += `
                            <div class="mesenger_list_wrap" onclick="MESSAGER.showMessage('${x[0]}')">
                            <div class="mesenger_list_img" style="background-image: url('${x[3]}'); background-position: ${x[4]};"></div>
                            <div class="mesenger_list_name"><p>${x[1]}</p><p>${x[2]}</p></div>
                            <div class="mesenger_list_readed"><p></p></div>
                            </div>`;
                    };
                    for (let i = 1; i < spl.length; i++) {
                        let x = spl[i].split(",");              
                        SE.$("messenger-wrap").innerHTML += `
                            <div class="mesenger_list_wrap" onclick="MESSAGER.showMessage('${x[0]}')">
                            <div class="mesenger_list_img" style="background-image: url('${x[3]}'); background-position: ${x[4]};"></div>
                            <div class="mesenger_list_name"><p>${x[1]}</p><p>${x[2]}</p></div>
                            <div class="mesenger_list_readed"></div>
                            </div>`;
                    };
                };
            }); 
        } 
    };

    //open message box 
    let showMessage = (id, param) => {
        SE.send({"user": `${id}`}, "/showmessage", (res) => {
            let parsres = JSON.parse(res);
            if ((JSON.parse(res).userid !== '') && (JSON.parse(res).userid !== undefined)){
                MESSAGER.messangerList();
                localStorage.kalciferMess = parsres.userid;         
                if (param === 'loadpage') {
                    SE.$("messenger_write").innerHTML = `           
                    <div class="messenger_write_body">
                        <div class="messenger_write_header">
                            <div class="messenger_write_header_img" 
                                 style="background-image: url('${parsres.ava}'); background-position: ${parsres.avasettings};"
                                 onclick="MESSAGER.showMessage('${localStorage.kalciferMess}')">
                            </div>
                            <div class="messenger_write_header_name" id="messenger_write_header_name" friend="${localStorage.kalciferMess}" onclick="MESSAGER.showMessage('${localStorage.kalciferMess}')">
                                <p>${parsres.surname}</p><p>${parsres.name}</p>
                            </div>
                            <div class="messenger_write_header_icon" id="messenger_write_header_icon">
                                <div class="messenger-notreaded-mess" id="messenger-notreaded-mess"></div>
                                <i class='fas fa-times' onclick="MESSAGER.closeWriteBox()"></i>
                            </div>
                        </div>
                        <div class="messenger_write_send_body" id="messenger_write_send_body"></div> 
                        <div class="messenger_write_main_mess"></div>
                    </div>`; 
                } else {
                    SE.$("messenger_write").innerHTML = `           
                    <div class="messenger_write_body">
                        <div class="messenger_write_header">
                            <div class="messenger_write_header_img" 
                                 style="background-image: url('${parsres.ava}'); background-position: ${parsres.avasettings};"
                                 onclick="MESSAGER.showMessage('${localStorage.kalciferMess}')">
                            </div>
                            <div class="messenger_write_header_name" id="messenger_write_header_name" friend="${localStorage.kalciferMess}" onclick="MESSAGER.showMessage('${localStorage.kalciferMess}')">
                                <p>${parsres.surname}</p><p> </p><p>${parsres.name}</p>
                            </div>
                            <div class="messenger_write_header_icon" id="messenger_write_header_icon">
                                <i class='far fa-grin' onclick="MESSAGER.smilesList()"></i>
                                <i class='far fa-trash-alt' onclick="MESSAGER.proofMess('${localStorage.kalciferMess}')"></i>
                                <i class='fas fa-minus' onclick="MESSAGER.hiddenWriteBox()"></i>
                                <i class='fas fa-times' onclick="MESSAGER.closeWriteBox()"></i>
                            </div>
                        </div>
                        <div class="messenger_write_delblok_wrap" id="messenger_write_delblok_wrap"></div>
                        <div class="messenger_write_send_body" id="messenger_write_send_body">
                            <div class="messenger_write_write" id="messenger_write_write" step="0" onscroll="
                                if (SE.$('messenger_write_write').scrollTop === 0) {
                                    let oldstep = +SE.$('messenger_write_write').getAttribute('step') + 10;
                                    SE.$('messenger_write_write').setAttribute('step', +oldstep);
                                    let step = SE.$('messenger_write_write').getAttribute('step');
                                    let id = SE.$('messenger_write_header_name').getAttribute('friend');
                                    MESSAGER.showMess(id, 10, step);
                                }">
                            </div>
                            <div class="messenger_write_send_wrap">
                                <div class="messenger_write_send_input">
                                    <textarea name="messenger_write_input" id="messenger_write_input" maxlength="900" oninput="MESSAGER.lengthText(this), CHECK.checkSendMess('messenger_write_input')"></textarea>
                                </div>
                                <div class="messenger_write_send_icon">
                                    <p id="messenger_write_langth">900</p>
                                    <i class='fas fa-paper-plane' id="messenger_send_mess"></i>
                                </div>   
                            </div>  
                        </div> 
                        <div class="messenger_write_main_mess"></div>
                    </div>`;   
                    SE.$("messenger_send_mess").addEventListener("click", MESSAGER.sendMessage);           
                    SE.$("messenger_write_input").addEventListener("keydown", (event) => {if (event.key === 'Enter'){
                        if (SE.$("messenger_write_input").value !== ''){ MESSAGER.sendMessage() }
                    }});       
                    masShovs = [0];
                    iter = 0;                  
                    MESSAGER.showMess(id, 10, 0); 
                }   
            }
        });        
    };

    //show smiles list
    let smileSM = ['&#128515;', '&#128516;', '&#128518;', '&#128519;', '&#128520;', 
                 '&#128523;', '&#128525;', '&#128526;', '&#128536;', '&#128539;',
                 '&#128549;', '&#128561;', '&#129315;', '&#128545;', '&#129314;', 
                 '&#129313;', '&#127877;', '&#128568;'];
    let smileHN = ['&#128076;', '&#128405;', '&#128077;', '&#128078;', '&#128400;',
                 '&#129304;', '&#128074;', '&#128079;', '&#128070;', '&#128071;',
                 '&#128072;', '&#128073;', '&#128170;', '&#128406;', '&#128591;',
                 '&#129305;', '&#129310;', '&#129309;'];
    let smileHR =  ['&#129505;', '&#x1F5A4;', '&#128147;', '&#128148;', '&#128149;',
                 '&#128150;', '&#128151;', '&#128152;', '&#128153;', '&#128154;',
                 '&#128155;', '&#128156;', '&#128157;', '&#128158;', '&#128159;',
                 '&#128143;', '&#128139;', '&#127880;'];
    let smileVG = ['&#127805;', '&#127812;', '&#127813;', '&#127814;', '&#127815;',
                 '&#127817;', '&#127818;', '&#127819;', '&#127820;', '&#127822;',
                 '&#127823;', '&#127826;', '&#127827;', '&#129361;', '&#129362;',
                 '&#129365;', '&#129373;', '&#129381;'];
    let smilesList = () => {
        SE.$(`messenger_write_delblok_wrap`).innerHTML = `
        <div class="smile-gtoup-box">
            <i class='fas fa-times' onclick="SE.$('messenger_write_delblok_wrap').innerHTML = '';"></i>
            <i class='far fa-grin' onclick="MESSAGER.changeSmile(18, 'smileSM');"></i>
            <i class='far fa-hand-paper' onclick="MESSAGER.changeSmile(18, 'smileHN');"></i>
            <i class='far fa-lemon' onclick="MESSAGER.changeSmile(18, 'smileVG');"></i>
            <i class='far fa-heart' onclick="MESSAGER.changeSmile(18, 'smileHR');"></i>
        </div>
        <div class="smile-gtoup-smile" id="smile-gtoup-smile"></div>
        `;
        MESSAGER.changeSmile(18, 'smileSM');
    };

    //show smiles list
    let changeSmile = (kilk, sml) => {
        let sm = sml === 'smileSM' ? smileSM : sml === 'smileHN' ? smileHN : sml === 'smileHR' ? smileHR : sml === 'smileVG' ? smileVG : null;
        SE.$(`smile-gtoup-smile`).innerHTML = ``;
        for(let i = 0; i < kilk; i++){
            SE.$(`smile-gtoup-smile`).innerHTML += `<p class="smiles-list-box" onclick="MESSAGER.addSmile('${sm[i]}')">${sm[i]}</p>`;
        }      
    };

    //show smiles list
    let addSmile = (smile) => {
        let originval = SE.$(`messenger_write_input`).value; 
        SE.$(`messenger_write_input`).value = `${originval}${smile}`;        
    };

    //show proof message before delete
    let proofMess = (id) => {
        SE.$(`messenger_write_delblok_wrap`).innerHTML = `
            <b><i class='fas fa-times' onclick="SE.$('messenger_write_delblok_wrap').innerHTML = '';"></i></b>
            <p>${MESS.errorFormMessage().messdeletedall}</p>                        
            <span onclick="MESSAGER.delAllMess('${id}')">${MESS.errorFormMessage().friendsdel}</span>`;
    };

    //delete all message
    let delAllMess = (id) => {
        SE.send({"messid": `${id}`}, "/delallmess", (res) => {
            if (JSON.parse(res).res === true) {
                MESSAGER.showMessage(id);
                if (SE.$("messenger").classList.contains("messenger")){ MESSAGER.messangerList(); }
            };
        });
    };
    
    //event for delete message
    let messDel = (id, who) => {
        SE.send({"messid": `${id}`, "who": `${who}`}, "/delmess", (res) => {
            if ((JSON.parse(res).result) && (JSON.parse(res).result === 1)) {
                SE.$(`del-wrap-${id}`).innerHTML = `<p class="message-deleted-mess">${MESS.errorFormMessage().messdeleted}</p>`;
            }
        });
    };

    //event for show delete choice
    let messDelChoice = (id, messfrom, styledelfr) => {
        if(!SE.$(`messenger-del-choice-${id}`)){
            if (messfrom === 'to') {
                SE.$(`messenger-del-choice-wrap-${id}`).innerHTML += `<div class="messenger_write_mess_del_choice" id="messenger-del-choice-${id}">
                    <p onclick="MESSAGER.messDel('${id}', 'me')">${MESS.errorFormMessage().forme}<span>${MESS.errorFormMessage().messforme}</span></p>
                    <p onclick="MESSAGER.messDel('${id}', 'both')">${MESS.errorFormMessage().forboth}<span>${MESS.errorFormMessage().messforboth}</span></p>                
                </div>`;  
            } else if (messfrom === 'from') {
                SE.$(`messenger-del-choice-wrap-${id}`).innerHTML += `<div class="messenger_write_mess_del_choice" style="${styledelfr}" id="messenger-del-choice-${id}">
                    <p  onclick="MESSAGER.messDel('${id}', 'me')">${MESS.errorFormMessage().forme}<span>${MESS.errorFormMessage().messforme}</span></p>                
                </div>`;
            }
        }
    };

    //event if mouse over message
    let messDelOver = (id, messfrom, styledelfr) => {    
        if (SE.$(`del_${id}`)) {
            SE.$(`del_${id}`).innerHTML = `<i class='far fa-trash-alt' onmouseup="MESSAGER.messDelChoice('${id}', '${messfrom}', '${styledelfr}');"></i>`;
        }    
    };

    //event if mouse leave message
    let messDelLeave = (id) => {
        if (SE.$(`del_${id}`)) { SE.$(`del_${id}`).innerHTML = ``; }  
        if(SE.$(`messenger-del-choice-${id}`)){ SE.$(`messenger-del-choice-${id}`).remove(); };
    };

    //show message 
    let ticUpdateMess;
    let showMess = (id, limit, step, send) => {
        SE.send({"user": `${id}`, "limit": `${limit}`, "step": `${step}`}, "/showmess", (res) => {
            if ((JSON.parse(res).result) && (JSON.parse(res).result !== null) && (JSON.parse(res).result !== undefined)) {
                let parsres = JSON.parse(res).result;     
                for (let i = 0; i < parsres.length; i++) {    
                    let newItem = document.createElement("div"), readed = '', delboxto = '', delboxfrom = '', styledel = '', styledelfr = '', delmess = '';
                    newItem.setAttribute("id", `del-wrap-${parsres[i].id}`);
                    if ((i === 0) && (parsres[0].readed === 'yes') && (parsres[0].messagefrom === 'to')) {
                        readed = `${MESS.errorFormMessage().prochitano}`;
                    } else if ((i === 0) && (parsres[0].readed === 'no') && (parsres[0].messagefrom === 'to')) {
                        readed = `${MESS.errorFormMessage().neprochitano}`;
                    }
                    if (parsres[i].messagefrom === 'to') {
                        delboxto = `<div class="messenger_write_mess_del_wrap" id="del_${parsres[i].id}"></div>`;
                    } else if (parsres[i].messagefrom === 'from') {
                        delboxfrom = `<div class="messenger_write_mess_del_wrap" id="del_${parsres[i].id}"></div>`;
                    }
                    if (parsres[i].deleted === 'del') {
                        styledelfr = `border-radius: 7px; min-height: 30px;`;
                        styledel = `background: #f5f5f5; margin: 0px; font-size: 11px; width: 100%; min-height: 22px;
                                    border-radius: 7px; text-align: center; color: #a5a5a5; border: 1px solid #bfbfbf;`;
                        delmess = `${MESS.errorFormMessage().messdeleted} ${parsres[i].datedel}`;
                    } else {
                        styledelfr = ``;
                        styledel = ``;
                        delmess = ``
                    }
                    newItem.innerHTML = `                 
                        <div class="messenger_write_mess_body" userid = "${parsres[i].id}" 
                            onmouseover="MESSAGER.messDelOver('${parsres[i].id}', '${parsres[i].messagefrom}', '${styledelfr}')" 
                            onmouseleave="MESSAGER.messDelLeave('${parsres[i].id}')">
                            <div class="messenger_write_mess_date">
                                <p>${parsres[i].datesend}</p>
                            </div>
                            <div class="messenger_write_mess_wrap messenger_write_box_${parsres[i].messagefrom}" >
                                <div class="messenger_write_mess_del">${delboxto}</div>
                                <div class="messenger_write_mess_blok messenger_write_${parsres[i].messagefrom}" style="${styledel}" id="messenger-del-choice-wrap-${parsres[i].id}">                                    
                                    <p>${parsres[i].message} ${delmess}</p>
                                </div>
                                <div class="messenger_write_mess_del">${delboxfrom}</div>
                            </div>
                            <p class="messenger_write_mess_readed">${readed}</p>
                        </div>`;
                    SE.$("messenger_write_write").insertBefore(newItem, SE.$("messenger_write_write").childNodes[0]);
                };
                MESSAGER.messangerNewKilk();
                if (send === 'send') {
                    SE.$("messenger_write_write").scrollTo(0, SE.$("messenger_write_write").scrollHeight - 0);
                } else {
                    SE.$("messenger_write_write").scrollTo(0, SE.$("messenger_write_write").scrollHeight - masShovs[iter]);
                    masShovs.push(SE.$("messenger_write_write").scrollHeight);    
                    iter++;
                } 
            } 
            if (SE.$("messenger").classList.contains("messenger")){ MESSAGER.messangerList(); }
            clearInterval(ticUpdateMess);
            if (SE.$("messenger_write_write").classList.contains("messenger_write_write")){ 
                ticUpdateMess = setInterval(MESSAGER.updateMessNew, 20000);
            }            
        });        
    };
    
    let updateMessNew = () => {
        let id = SE.$('messenger_write_header_name').getAttribute('friend');
        let masnods = document.getElementsByClassName('messenger_write_mess_body'), masid = [];
        for (let i = 0; i < masnods.length; i++) {
            masid.push(masnods[i].getAttribute('userid'))
        }
        let maxid = Math.max.apply(null, masid);
        SE.send({"messid": `${id}`, "maxid": `${maxid}`}, "/updatemessnew", (res) => {
            if (JSON.parse(res).result) {
                let parsres = JSON.parse(res).result;
                for (let i = 0; i < parsres.length; i++) { 
                    let readed = '', delboxto = '', delboxfrom = '', styledel = '', styledelfr = '', delmess = '';
                    if ((i === 0) && (parsres[0].readed === 'yes') && (parsres[0].messagefrom === 'to')) {
                        readed = `${MESS.errorFormMessage().prochitano}`;
                    } else if ((i === 0) && (parsres[0].readed === 'no') && (parsres[0].messagefrom === 'to')) {
                        readed = `${MESS.errorFormMessage().neprochitano}`;
                    }
                    if (parsres[i].messagefrom === 'to') {
                        delboxto = `<div class="messenger_write_mess_del_wrap" id="del_${parsres[i].id}"></div>`;
                    } else if (parsres[i].messagefrom === 'from') {
                        delboxfrom = `<div class="messenger_write_mess_del_wrap" id="del_${parsres[i].id}"></div>`;
                    }
                    if (parsres[i].deleted === 'del') {
                        styledelfr = `border-radius: 7px; min-height: 30px;`;
                        styledel = `background: #f5f5f5; margin: 0px; font-size: 11px; width: 100%; min-height: 22px;
                                    border-radius: 7px; text-align: center; color: #a5a5a5; border: 1px solid #bfbfbf;`;
                        delmess = `${MESS.errorFormMessage().messdeleted} ${parsres[i].datedel}`;
                    } else {
                        styledelfr = ``;
                        styledel = ``;
                        delmess = ``
                    }
                    SE.$("messenger_write_write").innerHTML += `
                    <div id="del-wrap-${parsres[i].id}">
                        <div class="messenger_write_mess_body" userid = "${parsres[i].id}" 
                            onmouseover="MESSAGER.messDelOver('${parsres[i].id}', '${parsres[i].messagefrom}', '${styledelfr}')" 
                            onmouseleave="MESSAGER.messDelLeave('${parsres[i].id}')">
                            <div class="messenger_write_mess_date">
                                <p>${parsres[i].datesend}</p>
                            </div>
                            <div class="messenger_write_mess_wrap messenger_write_box_${parsres[i].messagefrom}" >
                                <div class="messenger_write_mess_del">${delboxto}</div>
                                <div class="messenger_write_mess_blok messenger_write_${parsres[i].messagefrom}" style="${styledel}" id="messenger-del-choice-wrap-${parsres[i].id}">                                    
                                    <p>${parsres[i].message} ${delmess}</p>
                                </div>
                                <div class="messenger_write_mess_del">${delboxfrom}</div>
                            </div>
                            <p class="messenger_write_mess_readed">${readed}</p>
                        </div>  
                    </div>`;
                }
                let oldstep = +SE.$('messenger_write_write').getAttribute('step') + parsres.length;
                SE.$('messenger_write_write').setAttribute('step', +oldstep);
                SE.$("play-dzin").play();
            }
        });
    }

    let messangerNewKilk = () => {
        SE.send({}, "/messangernewkilk", (res) => {   
            if ((JSON.parse(res).noreadedkilk) && (JSON.parse(res).noreadedkilk !== '0')) {
                let id = SE.$('messenger_write_header_name').getAttribute('friend');
                let masid = JSON.parse(res).masid.split(",");                
                for (let i = 0; i < masid.length; i++){                   
                    if (masid[i] == id) { if (SE.$("messenger-notreaded-mess")) { SE.$("messenger-notreaded-mess").innerHTML = `<p>💬</p>` }}
                }
                SE.$("mesenger-kilk-new-mess").innerHTML = `${JSON.parse(res).noreadedkilk}`;
                if (JSON.parse(res).noreadeddzin !== '0'){ SE.$("play-dzin").play() }
            } else {
                if (SE.$("messenger-notreaded-mess")) { SE.$("messenger-notreaded-mess").innerHTML = `` }
                SE.$("mesenger-kilk-new-mess").innerHTML = ``;
            };
        }); 
    }

return {
    hiddenWriteBox,
    closeWriteBox,
    lengthText,
    sendMessage,
    messangerList,
    showMessage,
    showMess,
    messDelOver,
    messDelLeave,
    messDelChoice,
    messDel,
    proofMess,
    delAllMess,
    smilesList,
    addSmile,
    changeSmile,
    updateMessNew,
    messangerNewKilk
};

})();