let BLOG = (() => {

    //for check langth textarea 
    let lengthText = (val) => {
        SE.$('article-length-mess').innerHTML = `${1000 - val.value.length}`;        
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
        SE.$(`article-smile-box`).innerHTML = `
            <div class="smile-gtoup-smile" id="article-smile-gtoup-smile" style="width:80%; margin-bottom: 0px; margin-top: 5px;"></div>
            <div class="smile-gtoup-box" style="width:18%; margin-bottom: 0px; margin-top: 5px; margin-right: 0px; margin-left: 5px;">
                <i class='fas fa-times' onclick="SE.$('article-smile-box').innerHTML = '';"></i>
                <i class='far fa-grin' onclick="BLOG.changeSmile(18, 'smileSM');"></i>
                <i class='far fa-hand-paper' onclick="BLOG.changeSmile(18, 'smileHN');"></i>
                <i class='far fa-lemon' onclick="BLOG.changeSmile(18, 'smileVG');"></i>
                <i class='far fa-heart' onclick="BLOG.changeSmile(18, 'smileHR');"></i>
            </div>
        `;
        BLOG.changeSmile(18, 'smileSM');
    };

    //show smiles list
    let changeSmile = (kilk, sml) => {
        let sm = sml === 'smileSM' ? smileSM : sml === 'smileHN' ? smileHN : sml === 'smileHR' ? smileHR : sml === 'smileVG' ? smileVG : null;
        SE.$(`article-smile-gtoup-smile`).innerHTML = ``;
        for(let i = 0; i < kilk; i++){
            SE.$(`article-smile-gtoup-smile`).innerHTML += `<p class="smiles-list-box" onclick="BLOG.addSmile('${sm[i]}')">${sm[i]}</p>`;
        }      
    };

    //show smiles list
    let addSmile = (smile) => {
        let originval = SE.$(`article-write`).value; 
        SE.$(`article-write`).value = `${originval}${smile}`;        
    };

    //for send post
    let sendPost = () => {
        if (SE.$("article-write").value !== ''){ 
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
            replsm[0] = SE.$("article-write").value;            
            for(let i = 0; i < 88; i++){
                replsm[i+1] = replsm[i].replace(smilepicSM[i], smilecod[i]);
            }            
            let obj = {"post":`${replsm[88]}`, "idwall":`${window.location.pathname.replace(/[/]/gi, '')}`};
            SE.send(obj, "/sendpost", (res) => {
                if (JSON.parse(res).res === 1) {
                    SE.$("article-write").value = '';
                    SE.$(`article-smile-box`).innerHTML = ``;
                    BLOG.postList(`${window.location.pathname.replace(/[/]/gi, '')}`);
                }
            });
        }        
    };

    //show post list
    let postList = (pageid) => {   
        let stepor = (SE.$(`article-blog-wrap`)) ? SE.$(`article-blog-wrap`).getAttribute('step') : null;
        let step = ((stepor !== null) && (stepor !== undefined)) ? SE.$(`article-blog-wrap`).getAttribute('step') : 0;
        SE.send({"pageid": `${pageid}`, "step": `${step}`}, "/postlist", (res) => {
            if (JSON.parse(res).res) {

                console.log("postlist", JSON.parse(res).res);

                SE.$(`article-blog-wrap`).innerHTML = ``;
                let postres = JSON.parse(res).res;
                for (let i = 0; i < postres.length; i++) {
                    let who = postres[i].who;
                    let del = (who === 'my') ? `<i class='far fa-trash-alt' onclick="BLOG.delpost('${postres[i].postid}')"></i>` : (who === 'fr') ? `` : ``;
                    let share = (who === 'my') ? `<i class='far fa-user'></i>` : (who === 'fr') ? `<i class='fas fa-share' onclick="BLOG.postShareProof('${postres[i].postid}')"></i>` : ``;
                    let mypost = (postres[i].perepostid === 'my') ? `<i class='fas fa-level-up-alt myarrow'></i>` : ``;
                    let posttitle = (postres[i].perepostid === 'my') ? `${MESS.errorFormMessage().mypost}` : `${MESS.errorFormMessage().postfrom + ': ' + postres[i].peresurname + ' ' +postres[i].perename}`;
                    let pere = (postres[i].perepostfromid === 'me') ? `` : `
                        <div class="art-post-header-per" id="art-post-header-per">
                            <div class="post-header-arrow" title="${posttitle}">${mypost}<i class='fas fa-level-down-alt'></i> </div>
                            <div class="post_header_img_per" 
                                style="background-image: url('${postres[i].pereava}'); background-position: ${postres[i].pereavasettings};"
                                onclick="SE.redirect('${postres[i].perepostfromid}')">
                            </div>
                            <div class="post_header_name_per" onclick="SE.redirect('${postres[i].perepostfromid}')" perep = "${postres[i].perepostfromid}" id = "perepid_${postres[i].postid}">
                                <p>${postres[i].peresurname}</p><p style="margin-left:3px;">${postres[i].perename}</p><p style="width:100%;">${postres[i].perepostdate}</p>
                            </div>
                        </div>`;
                    let postwho = (postres[i].perepostfromid === 'me') ? `` : `
                        <div class="post_header_who">
                            <div class="post_header_wrap_who">
                                <div class="post_header_name_who" onclick="SE.redirect('${postres[i].postwhoid}')">
                                    <p>${postres[i].postwhosurname}</p><p style="margin-left:3px;">${postres[i].postwhoname}</p>
                                </div>
                            </div>
                        </div>`;
                    let megpost = (postres[i].perepostfromid === 'me') ? `margin-top:10px; border-radius: 4px;` : ``;
                    let footer = `
                        <div class="art-post-footer">
                            <div class="art-post-footer-like-wrap">
                                <div class="art-post-footer-like">
                                    <span style="background:linear-gradient(#fdc8cf, #f4b7bf)" id="likeheart-${postres[i].postid}" onclick="BLOG.like('${postres[i].postid}', 'heart')">
                                        <i class='fas fa-heart'></i>
                                    </span>
                                    <p id="likeheartlength-${postres[i].postid}"></p>
                                </div>
                                <div class="art-post-footer-like">
                                    <span style="background: linear-gradient(#38a7fc, #195df1);">
                                        <i class='fas fa-thumbs-up'></i>
                                    </span>
                                    <p>1000</p>
                                </div>
                                <div class="art-post-footer-like">
                                    <span style="background: linear-gradient(#fdf6bc, #ffe600); color: #887a00; font-size: 18px;">
                                        <i class='far fa-smile'></i>
                                    </span>
                                    <p>1000</p>
                                </div>
                            </div>
                            <div class="art-post-footer-com-wrap">
                                <div class="art-post-footer-com">
                                    <p>1000</p>
                                    <span><i class='far fa-comment-dots'></i></span>
                                </div>       
                                <div class="art-post-footer-com">
                                    <p>1000</p>
                                    ${share}
                                </div>                   
                            </div>
                        </div>`;
                    let post = (postres[i].post === "nopost") ? `<p class="postwasdell">${MESS.errorFormMessage().postwasdell}</p>` : `${postwho}<div class="art-post-body" style="${megpost}"><p>${postres[i].post}</p></div>${footer}`; 
                    SE.$(`article-blog-wrap`).innerHTML += `     
                    <div class="art-post-wrap">
                        <div class="art-post-header">
                            <div class="post_header_img"
                                style="background-image: url('${postres[i].ava}'); background-position: ${postres[i].avasettings};"
                                onclick="SE.redirect('${postres[i].userid}')">
                            </div>
                            <div class="post_header_name" onclick="SE.redirect('${postres[i].userid}')">
                                <p>${postres[i].surname}</p><p style="margin-left:3px;">${postres[i].name}</p><p style="width:100%;">${postres[i].postdate}</p>
                            </div>                            
                            <div class="post_header_icon">${del}</div>
                        </div>    
                        ${pere} 
                        ${post}                      
                        <div class="art-post-message" id="post-message-${postres[i].postid}"></div>
                    </div>`;
                    BLOG.likechange(postres[i].postid, 'heart');
                };
            };            
        });    
    };

    //show share proof
    let postShareProof = (idpost) => {
        SE.$(`post-message-${idpost}`).innerHTML = `
            <div class="post-message-prof-wrap">
                <p>${MESS.errorFormMessage().postsharemess}</p>
                <p onclick="BLOG.postShare('${idpost}')">${MESS.errorFormMessage().prooffriends}</p>  
                <p onclick="BLOG.closeProfShare('${idpost}')"><i class='fas fa-times'></i></p>         
            </div>
        `;
    };

    //close share proof
    let closeProfShare = (idpost) => { SE.$(`post-message-${idpost}`).innerHTML = ''};

    //share post
    let postShare = (idpost) => {

        console.log("postid", idpost);

        let wallid = ((SE.$(`perepid_${idpost}`)) && (SE.$(`perepid_${idpost}`).getAttribute('perep') !== undefined)) 
        ? SE.$(`perepid_${idpost}`).getAttribute('perep') 
        : `${window.location.pathname.replace(/[/]/gi, '')}`;    

        console.log("wallid", wallid);
         
        let obj = {"postid":`${idpost}`, "wallid":`${wallid}`};
        SE.send(obj, "/postshare", (res) => {
            if ((JSON.parse(res).res) && (JSON.parse(res).res === 1)) {
                SE.$(`post-message-${idpost}`).innerHTML = `<p class="repost-mess">${MESS.errorFormMessage().postshared}</p>`;
                setTimeout(() => {SE.$(`post-message-${idpost}`).innerHTML = ``;}, 3000);
            } else if ((JSON.parse(res).noshared.code === "ER_DUP_ENTRY")) {
                SE.$(`post-message-${idpost}`).innerHTML = `<p class="repost-mess" style="color: #eaa5a5; text-shadow: 0px 0px 2px #ff0000;">${MESS.errorFormMessage().postisonmypage}</p>`; 
                setTimeout(() => {SE.$(`post-message-${idpost}`).innerHTML = ``;}, 3000); 
            }; 
        });        
    };

    //scroll
    let scroll = () => {
        let info = (SE.$('sideinfo')) ? SE.$('sideinfo').scrollHeight + 20 : 0;        
        let friend = (SE.$('side-sub-friends')) ? SE.$('side-sub-friends').scrollHeight + 20 : 0;       
        let skill = (SE.$('side-sub-skills')) ? SE.$('side-sub-skills').scrollHeight + 20 : 0;       
        let project = (SE.$('side-sub-projects')) ? SE.$('side-sub-projects').scrollHeight + 20 : 0;       
        let footer = (SE.$('footer-side')) ? SE.$('footer-side').scrollHeight + 10 : 0;       
        let sumside = info + friend + skill + project + footer;
        if (window.innerWidth < 844) {
            SE.$('totop').style.display = (document.documentElement.scrollTop > sumside + 800) ? "flex" : "none";
        } else {
            SE.$('totop').style.display = (document.documentElement.scrollTop > sumside) ? "flex" : "none";
        }        
    };

    //delete post
    let delpost = (postid) => {
        console.log("delpostpostid", postid);
      
    };

    //like post
    let like = (postid, type) => {
        console.log("delpostpostid", postid);

        let wallid = ((SE.$(`perepid_${postid}`)) && (SE.$(`perepid_${postid}`).getAttribute('perep') !== undefined)) 
        ? SE.$(`perepid_${postid}`).getAttribute('perep') 
        : `${window.location.pathname.replace(/[/]/gi, '')}`; 


        let obj = {"postid":`${postid}`, "wallid":`${wallid}`, "type":`${type}`};
        SE.send(obj, "/postlike", (res) => {
            if ((JSON.parse(res).res) && (JSON.parse(res).res === 1)) {
                console.log("res", JSON.parse(res).res);
                BLOG.likechange(postid, type);
            }; 
        });      
    };

    //likechange post
    let likechange = (postid, type) => {
        console.log("likechange", postid);

        let wallid = ((SE.$(`perepid_${postid}`)) && (SE.$(`perepid_${postid}`).getAttribute('perep') !== undefined)) 
        ? SE.$(`perepid_${postid}`).getAttribute('perep') 
        : `${window.location.pathname.replace(/[/]/gi, '')}`; 

        let obj = {"postid":`${postid}`, "wallid":`${wallid}`, "type":`${type}`};
        SE.send(obj, "/postlikechange", (res) => {
            if (JSON.parse(res).res) {
                let reslike = JSON.parse(res).res;  
                console.log("res", JSON.parse(res).res);
                if (reslike.likeis === 'yes'){
                    SE.$(`like${type}-${postid}`).style.background = `linear-gradient(#fb5c71, #e94055)`;
                }
                SE.$(`like${type}length-${postid}`).innerHTML = `${reslike.likelength}`;
            };
        });  
    };

    
    return {
        lengthText,
        smilesList,
        changeSmile,
        addSmile,
        sendPost,
        postList,
        postShareProof,
        closeProfShare,
        postShare,
        scroll,
        delpost,
        like,
        likechange
    }
})();