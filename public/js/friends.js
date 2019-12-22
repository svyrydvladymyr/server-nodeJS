let WFRIENDS = (() => {    

//change button after add to friends
    let addToFriends = (res) => {   
        let parseObj = JSON.parse(res); 
        if (parseObj.error === 'ER_DUP_ENTRY'){
            SE.$('mess-about-add-friend').innerHTML = `${MESS.errorFormMessage().yourarefriends}`;
            setTimeout(() => {
                SE.$('mess-about-add-friend').innerHTML = '';
            }, 2000);
        } else if (parseObj.res === 1){
            SE.$('add-friend-wrap').innerHTML = `<div class="add-to-friends-wrap"  onclick="WFRIENDS.confirmDelFriend()" >
                <i class='far fa-minus-square'><b style="font-size: 13px; padding: 2px 5px; position: absolute;" id="del-to-friend">${MESS.errorFormMessage().friendsdel}</b></i></div>`;
        } 
    };

//show confirm button for delete
    let confirmDelFriend = () => {   
        SE.$('add-friend-wrap').innerHTML = `<div class="add-to-friends-wrap add-to-friends-wrap2">
        <i class='far fa-trash-alt' onclick="SE.send({}, '/delfromfriends', WFRIENDS.delFromFriends)"></i>
        <i class='fas fa-times' onclick="WFRIENDS.closeConfirmDelFriend()"></i>
        </div>`;
    };

//show confirm button for delete from full list
    let confirmDelFriendFull = (el) => {   
        let x = /\?friends\=/g;
        let clearurl = window.location.search.replace(x, '');
        SE.$(el).innerHTML = `<div class="friend-req-plus">
        <i class='far fa-trash-alt' style="width:40%;" onclick='SE.send({"userid":"${el}"}, "/delfromfriends", () => {
            setTimeout(() => {
                SE.send({"type":"reqto", "limit":200, "step":"", "userurl":"${clearurl}"}, "/showfriends", WFRIENDS.showAllFriendsListFull)
            },400);
        })'></i>
        <i class='fas fa-times' style="width:40%;" onclick="WFRIENDS.closeConfirmDelFriendFull('${el}')"></i>
        </div>`;
    };

//show confirm button for proof
    let confirmProof = () => {   
        SE.$('add-friend-wrap').innerHTML = `<div class="add-to-friends-wrap add-to-friends-wrap2">
        <i class='fas fa-check' onclick="SE.send({}, '/prooftofriends', WFRIENDS.proofToFriends)"></i>
        <i class='fas fa-times' onclick="SE.send({}, '/delfromfriends', WFRIENDS.delFromFriends)"></i>
        </div>`;
    };

//show confirm button for proof in full list
    let confirmProofFull = (el) => {   
        let x = /\?friends\=/g;
        let clearurl = window.location.search.replace(x, '');
        SE.$(el).innerHTML = `<div class="friend-req-plus">
        <i class='fas fa-check' style="width:40%; padding:0px 0px 0px 20px;" onclick='SE.send({"userid":"${el}"}, "/prooftofriends", () => {
            setTimeout(() => {
                SE.send({"type":"reqfrom", "limit":200, "step":"", "userurl":"${clearurl}"}, "/showfriends", WFRIENDS.showAllFriendsListFull)
            },400);
        })'></i>
        <i class='far fa-trash-alt' style="width:40%; padding:0px 0px 0px 20px;" onclick='SE.send({"userid":"${el}"}, "/delfromfriends", () => {
            setTimeout(() => {
                SE.send({"type":"reqfrom", "limit":200, "step":"", "userurl":"${clearurl}"}, "/showfriends", WFRIENDS.showAllFriendsListFull)
            },400);
        })'></i>
        </div>`;
    };

//close confirm button for delete
    let closeConfirmDelFriend = () => {   
        SE.$('add-friend-wrap').innerHTML = `<div class="add-to-friends-wrap"  onclick="WFRIENDS.confirmDelFriend()" ><i class='far fa-minus-square'><b style="font-size: 13px; padding: 2px 5px; position: absolute;" id="del-to-friend">${MESS.errorFormMessage().friendsdel}</b></i></div>`;
    };

//close confirm button for delete
    let closeConfirmDelFriendFull = (el) => {   
        SE.$(el).innerHTML = `<div class="add-to-friends-wrap friend-req-plus"  onclick="WFRIENDS.confirmDelFriendFull('${el}')" ><i class='far fa-minus-square'><b style="font-size: 10px; padding: 0px 5px; position: absolute;" id="del-to-friend">${MESS.errorFormMessage().friendsdel}</b></i></div>`;
    };

//change button after del from friends
    let delFromFriends = (res) => {   
        let parseObj = JSON.parse(res); 
        if (parseObj.res === 0){
            SE.$('mess-about-add-friend').innerHTML = `${MESS.errorFormMessage().yourarefriends}`;
            setTimeout(() => {
                SE.$('mess-about-add-friend').innerHTML = '';
            }, 2000);
        } else if (parseObj.res === 1){
            SE.$('add-friend-wrap').innerHTML = `<div class="add-to-friends-wrap" onclick="SE.send({}, '/addtofriends', WFRIENDS.addToFriends)"><i class='far fa-plus-square'><b style="font-size: 13px; padding: 2px 5px; position: absolute;" id="add-to-friend">${MESS.errorFormMessage().friendsadd}</b></i></div>`;
            if(SE.$('mess-friend-wrap')){ SE.$('mess-friend-wrap').innerHTML = ``;}
            localStorage.kalciferMess = ''; 
        } else if (parseObj.err){
            console.log(parseObj.err);            
        }
    };

//change button after proof friend  
    let proofToFriends = (res) => {   
        let parseObj = JSON.parse(res); 
        console.log(parseObj);
        if (parseObj.res === 0){
            SE.$('add-friend-wrap').innerHTML = `<div class="add-to-friends-wrap"  onclick="WFRIENDS.confirmProof()" ><i class='far fa-plus-square' style="color:#ffa4a4;"><b style="font-size: 13px; padding: 2px 5px; position: absolute; color:#ffffff;" id="add-to-req">${MESS.errorFormMessage().prooffriends}</b></i></div>`;
        } else if (parseObj.res === 1){
            SE.$('add-friend-wrap').innerHTML = `<div class="add-to-friends-wrap"  onclick="WFRIENDS.confirmDelFriend()" ><i class='far fa-minus-square'><b style="font-size: 13px; padding: 2px 5px; position: absolute;" id="del-to-friend">${MESS.errorFormMessage().friendsdel}</b></i></div>`;
            SE.$('mess-friend-wrap').innerHTML = `<div class="add-to-friends-wrap-mess" onclick="VW.inwork()"><i class='far fa-comments'><b style="font-size: 13px; padding: 2px 5px; position: absolute;" id="friend-mess">${MESS.errorFormMessage().friendsmess}</b></i></div>`;
        } else if (parseObj.err){
            console.log(parseObj.err);            
        }
    };

//for show all friends
    let showFriends = (res) => {
        let parseObj = JSON.parse(res).res;       
        SE.$('friends-conteiner').innerHTML = ``;
        for (let i = 0; i < parseObj.length; i++){
            let avafoto;
            let reg = /^http:/i;
            let reg2 = /^https:/i;
            if ((reg.test(parseObj[i].ava)) || (reg2.test(parseObj[i].ava))){
                avafoto = `${parseObj[i].ava}`;
            } else {
                avafoto = ((parseObj[i].ava === null) || (parseObj[i].ava === '') || (parseObj[i].ava === undefined)) ? `./img/ava_empty.jpg` : `./uploads/${parseObj[i].ava}`;
            }
            SE.$('friends-conteiner').innerHTML += `
            <div class="listusers-boks2" id="${parseObj[i].userid}" onclick="VW.renderPage(this)">
                <div class="listusers-img" 
                    style="background-image: url('${avafoto}'); 
                    background-position: ${parseObj[i].avasettings};">
                </div>    
                <p>${parseObj[i].name} ${parseObj[i].surname}</p>
            </div>`;
        }
    };
       
//show all friends
    let showAllFriends  = (el) => {   
        let friendsurl;
        let x = /\//g;
        let clearurl = window.location.pathname.replace(x, '');
        if(el === 'to'){
            friendsurl = `/friendsreq?friends=${clearurl}`;
        } else if (el === 'from'){
            friendsurl = `/friendsproof?friends=${clearurl}`;
        } else {
            friendsurl = `/friends?friends=${clearurl}`;
        }
        SE.redirect(friendsurl);
    };
     
//show sum friends who add too my
    let showFriendsAdd  = (res) => {   
        parseObj = JSON.parse(res).res.length;
        if ((parseObj > 0) && (parseObj !== undefined) && (parseObj !== null)){
            SE.$('friend-req-add').innerHTML = `<span style="border: var(--border); padding: 1px 5px; border-radius: 4px; margin: 3px;">${parseObj}</span>`;
        }
    };

//show sum friends for proof
    let showFriendsProof  = (res) => {   
        parseObj = JSON.parse(res).res.length;
        if ((parseObj > 0) && (parseObj !== undefined) && (parseObj !== null)){
            SE.$('friend-req-proof').innerHTML = `<span style="border: var(--border); padding: 1px 5px; border-radius: 4px; margin: 3px;">${parseObj}</span>`;
        }
    };

//show list all friends full info
    let showAllFriendsListFull  = (res) => {   
        let parseObj = JSON.parse(res).res;
        let parseMyId = JSON.parse(res).myid;
        let parseName = JSON.parse(res).name;
        let parseSurname = JSON.parse(res).surname;
        let parseKilk = JSON.parse(res).kilk;
        let parseStatus = JSON.parse(res).status;
        if (parseStatus === 'reqto'){
            SE.$('show-all-user-friends').innerHTML = ``;
        } else if (parseStatus === 'reqfrom'){
            SE.$('show-all-user-friends').innerHTML = ``;
        } else if (parseStatus === ''){
            SE.$('show-all-user-friends').innerHTML = ``;
        }
        SE.$('friends-name-title').innerHTML = `${parseSurname} ${parseName}`;
        SE.$('friends-name-title-href').setAttribute("href", `${parseMyId}`);
        for (let i = 0; i < parseObj.length; i++){
            let avafoto, status, email, town, country, phone, marginTop;
            let reg = /^http:/i;
            let reg2 = /^https:/i;
            if ((reg.test(parseObj[i].ava)) || (reg2.test(parseObj[i].ava))){
                avafoto = `${parseObj[i].ava}`;
            } else {
                avafoto = ((parseObj[i].ava === null) || (parseObj[i].ava === '') || (parseObj[i].ava === undefined)) ? `./img/ava_empty.jpg` : `./uploads/${parseObj[i].ava}`;
            }
            if (parseStatus === 'reqto'){
                status = `<div class="add-to-friends-wrap friend-req-plus"  
                    onclick="WFRIENDS.confirmDelFriendFull('${parseObj[i].userid}')" >
                    <i class='far fa-minus-square'><b style="font-size: 10px; padding: 0px 5px; position: absolute;">${MESS.errorFormMessage().friendsdel}</b></i></div>`;
                marginTop = `-157px`;
            } else if (parseStatus === 'reqfrom'){
                status = `<div class="add-to-friends-wrap friend-req-plus"  
                    onclick="WFRIENDS.confirmProofFull('${parseObj[i].userid}')">
                    <i class='far fa-plus-square'><b style="font-size: 9px; padding: 1px 5px; position: absolute;">${MESS.errorFormMessage().prooffriends}</b></i></div>`;
                marginTop = `-157px`;    
            } else {
                status = ``;
                marginTop = `-103px`;
            }
            email = ((parseObj[i].email === null) || (parseObj[i].email === undefined)) ? `` : `${parseObj[i].email}`;
            country = ((parseObj[i].country === null) || (parseObj[i].country === undefined)) ? `` : `${parseObj[i].country}`;
            town = ((parseObj[i].town === null) || (parseObj[i].town === undefined)) ? `` : `${parseObj[i].town}`;
            phone = ((parseObj[i].phone === null) || (parseObj[i].phone === undefined)) ? `` : `${parseObj[i].phone}`;
            SE.$('show-all-user-friends').innerHTML += `
            <div class="friend-full-wrap">
                <div class="friend-full-img-wrap">
                    <div style="width:90px; margin-top: 103px; margin-bottom: 5px;" id="${parseObj[i].userid}">${status}</div>
                    <div class="friend-full-img"  id="${parseObj[i].userid}" onclick="VW.renderPage(this)" 
                        style="background-image: url('${avafoto}'); 
                            background-position: ${parseObj[i].avasettings};
                            margin-top: ${marginTop};">
                    </div>                    
                </div>
                <div class="friend-full-info">
                    <p id="${parseObj[i].userid}" onclick="VW.renderPage(this)">${parseObj[i].surname} ${parseObj[i].name}</p>
                    <p id="${parseObj[i].userid}" onclick="VW.renderPage(this)" style="overflow:hidden;">${email}</p>                    
                    <p id="${parseObj[i].userid}" onclick="VW.renderPage(this)">${country} ${town}</p>
                    <p id="${parseObj[i].userid}" onclick="VW.renderPage(this)">${phone}</p>
                </div>         
            </div>     
            `;
            if(i === parseObj.length-1){
                let el = document.getElementsByClassName('friend-full-wrap').length;
                if (el !== parseKilk){
                    SE.$('friends-show-more-wrap').innerHTML = `<p class="friends-show-more-button" onclick="WFRIENDS.showMoreFriends()">${MESS.errorFormMessage().showmore}</p>`;
                } else if (el === parseKilk){
                    SE.$('friends-show-more-wrap').innerHTML = ``;
                }
            }
        }
    };

//show more friends
    let showMoreFriends  = () => {   
        let el = document.getElementsByClassName('friend-full-wrap');
        let x = /\?friends\=/g;
        let clearurl = window.location.search.replace(x, '');
        SE.send({"type":"friend", "limit":6, "step":el.length, "userurl":clearurl}, '/showfriends', WFRIENDS.showAllFriendsListFull);
    };
    
return {
    showFriends,
    showAllFriends,
    showFriendsAdd,
    showFriendsProof,
    showAllFriendsListFull,
    showMoreFriends,
    addToFriends,
    delFromFriends,
    confirmDelFriend,
    closeConfirmDelFriend,
    confirmProof,
    proofToFriends,
    confirmDelFriendFull,
    closeConfirmDelFriendFull,
    confirmProofFull
};

})();