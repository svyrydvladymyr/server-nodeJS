let WFRIENDS = (() => {    

//for show all friends
    let showFriends = (res) => {
        let parseObj = JSON.parse(res).res;
        console.log(parseObj);          

        SE.$('friends-conteiner').innerHTML = ``;
        for (let i = 0; i < parseObj.length; i++){
            let avafoto;
            if ((parseObj[i].ava === null) || (parseObj[i].ava === '') || (parseObj[i].ava === undefined)){
                avafoto = `./img/ava_empty.jpg`;
            } else {
                avafoto = `./uploads/${parseObj[i].ava}`;
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
    let showAllFriends  = () => {   
        let x = /\//g;
        let clearurl = window.location.pathname.replace(x, '');
        let friendsurl = `/friends?friends=${clearurl}`;
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
        parseObj = JSON.parse(res).res;
        console.log("dfgsdgdsfgsdfgdfg");

        console.log(parseObj);
        console.log(parseObj.length);
        for (let i = 0; i < parseObj.length; i++){
            SE.$('show-all-user-friends').innerHTML += `
            <div class="friend-full-wrap">
            
            
            
            </div>
            
            
            `;

        }
    };
    
return {
    showFriends,
    showAllFriends,
    showFriendsAdd,
    showFriendsProof,
    showAllFriendsListFull
};

})();