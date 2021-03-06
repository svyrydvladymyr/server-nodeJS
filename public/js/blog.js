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

    let smilesList = (where) => {
        if (SE.$(`${where}`).innerHTML === ``) {
            SE.$(`${where}`).innerHTML = `
                <div class="smile-gtoup-smile" id="article-smile-gtoup-smile" style="width:80%; margin-bottom: 0px; margin-top: 5px;"></div>
                <div class="smile-gtoup-box-post" style="width:18%; margin-bottom: 0px; margin-top: 5px; margin-right: 0px; margin-left: 5px;">
                    <i class='far fa-grin' onclick="BLOG.changeSmile(18, 'smileSM');"></i>
                    <i class='far fa-hand-paper' onclick="BLOG.changeSmile(18, 'smileHN');"></i>
                    <i class='far fa-lemon' onclick="BLOG.changeSmile(18, 'smileVG');"></i>
                    <i class='far fa-heart' onclick="BLOG.changeSmile(18, 'smileHR');"></i>
                </div>
            `;
            BLOG.changeSmile(18, 'smileSM');
        } else {
            SE.$(`${where}`).innerHTML = ``;
        };
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

    //replace smiles in post 
    let readymess = (id) => {
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
        replsm[0] = SE.$(`${id}`).value;            
        for(let i = 0; i < 88; i++){ replsm[i+1] = replsm[i].replace(smilepicSM[i], smilecod[i]) };   
        return replsm[88];
    };

    //for send post
    let sendPost = () => {      
        if ((SE.$("article-write").value !== '') && (SE.$("article-write").value !== '\n')){ 
            let readymes = readymess(`article-write`);
            let obj = {"post":`${readymes}`, "idwall":`${window.location.pathname.replace(/[/]/gi, '')}`};
            SE.send(obj, "/sendpost", (res) => {
                if (JSON.parse(res).res === 1) {
                    SE.$("article-write").value = '';
                    SE.$("article-write").style.height = '56px';
                    SE.$(`article-length-mess`).innerHTML = `1000`;
                    SE.$(`article-smile-box`).innerHTML = ``;
                    SE.$(`article-blog-wrap`).innerHTML = ``;
                    BLOG.postList(`${window.location.pathname.replace(/[/]/gi, '')}`);
                };
            });
        };        
    };

    //show post list
    let postList = (pageid) => {   
        let step = document.getElementsByClassName('art-post-wrap').length;
        SE.send({"pageid": `${pageid}`, "step": `${step}`}, "/postlist", (res) => {
            if (JSON.parse(res).res) {
                let postres = JSON.parse(res).res;
                for (let i = 0; i < postres.length; i++) {
                    let who = postres[i].who;
                    let del = (who === 'my') ? `<i class='far fa-trash-alt' onclick="BLOG.postDelProof('${postres[i].postid}')"></i>` : (who === 'fr') ? `` : ``;
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
                                    <span style="background:linear-gradient(#fdc8cf, #f4b7bf)" 
                                          id="likeheart-${postres[i].postid}" 
                                          onclick="BLOG.like('${postres[i].postid}', 'heart')">
                                        <i class='fas fa-heart'></i>
                                    </span>
                                    <div id="likeheartlength-${postres[i].postid}" 
                                         onmouseover="BLOG.postLikeOver('${postres[i].postid}', 'heart', '15', 'shortlist')"
                                         onmouseleave="BLOG.postLikeLeave('${postres[i].postid}', 'heart')">
                                         ${postres[i].heartlength}
                                    </div>
                                </div>
                                <div class="art-post-footer-like"> 
                                    <span style="background: linear-gradient(#afdafb, #92aade);" 
                                          id="likefinger-${postres[i].postid}" 
                                          onclick="BLOG.like('${postres[i].postid}', 'finger')">
                                        <i class='fas fa-thumbs-up'></i>
                                    </span>
                                    <div id="likefingerlength-${postres[i].postid}"
                                         onmouseover="BLOG.postLikeOver('${postres[i].postid}', 'finger', '15', 'shortlist')"
                                         onmouseleave="BLOG.postLikeLeave('${postres[i].postid}', 'finger')">
                                         ${postres[i].fingerlength}
                                    </div>
                                </div>
                                <div class="art-post-footer-like">
                                    <span style="background: linear-gradient(#f7f1c1, #ffffff); color: #dcc500; font-size: 18px;" 
                                          id="likesmile-${postres[i].postid}" 
                                          onclick="BLOG.like('${postres[i].postid}', 'smile')">
                                        <i class='far fa-smile'></i>
                                    </span>
                                    <div id="likesmilelength-${postres[i].postid}"
                                         onmouseover="BLOG.postLikeOver('${postres[i].postid}', 'smile', '15', 'shortlist')"
                                         onmouseleave="BLOG.postLikeLeave('${postres[i].postid}', 'smile')">
                                         ${postres[i].smilelength}
                                    </div>
                                </div>
                            </div>
                            <div class="art-post-footer-com-wrap">
                                <div class="art-post-footer-com">
                                    <p id="likecomlength-${postres[i].postid}">${postres[i].com}</p>
                                    <span onclick="BLOG.postComShowWrap('${postres[i].postid}')"><i class='far fa-comment-dots'></i></span>
                                </div>       
                                <div class="art-post-footer-like">
                                    <div id="likesharelength-${postres[i].postid}"
                                         onmouseover="BLOG.postLikeOver('${postres[i].postid}', 'share', '15', 'shortlist')"
                                         onmouseleave="BLOG.postLikeLeave('${postres[i].postid}', 'share')">
                                         ${postres[i].share}
                                    </div>
                                    ${share}
                                </div>                   
                            </div>
                        </div>`;  
                    let post = (postres[i].post === "nopost") 
                        ? `<p class="postwasdell">${MESS.errorFormMessage().postwasdell}</p>` 
                        : `${postwho}<div class="art-post-body" style="${megpost}"><p>${postres[i].post}</p></div>${footer}`; 
                    SE.$(`article-blog-wrap`).innerHTML += `     
                    <div class="art-post-wrap" id="post-wrap-${postres[i].postid}">
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
                    if((postres[i].heart === 'yes') && (SE.$(`likeheart-${postres[i].postid}`))){
                        SE.$(`likeheart-${postres[i].postid}`).style.background = `linear-gradient(#fb5c71, #e94055)`;
                    };
                    if((postres[i].finger === 'yes') && (SE.$(`likefinger-${postres[i].postid}`))){
                        SE.$(`likefinger-${postres[i].postid}`).style.background = `linear-gradient(#38a7fc, #195df1)`;
                    };
                    if((postres[i].smile === 'yes') && (SE.$(`likesmile-${postres[i].postid}`))){
                        SE.$(`likesmile-${postres[i].postid}`).style.background = `linear-gradient(#fdf6bc, #ffe600)`;
                    };  
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
        </div>`;
    };

    //close share proof
    let closeProfShare = (idpost) => { SE.$(`post-message-${idpost}`).innerHTML = ''};

    //share post
    let postShare = (idpost) => {
        let wallid = ((SE.$(`perepid_${idpost}`)) && (SE.$(`perepid_${idpost}`).getAttribute('perep') !== undefined)) 
            ? SE.$(`perepid_${idpost}`).getAttribute('perep') 
            : `${window.location.pathname.replace(/[/]/gi, '')}`;  
        let obj = {"postid":`${idpost}`, "wallid":`${wallid}`};
        SE.send(obj, "/postshare", (res) => {
            if ((JSON.parse(res).res) && (JSON.parse(res).res === 1)) {
                SE.$(`post-message-${idpost}`).innerHTML = `<p class="repost-mess">${MESS.errorFormMessage().postshared}</p>`;
                let shownomshare = +SE.$(`likesharelength-${idpost}`).innerHTML;
                SE.$(`likesharelength-${idpost}`).innerHTML = `${shownomshare + 1}`;                
                setTimeout(() => {SE.$(`post-message-${idpost}`).innerHTML = ``;}, 3000);
            } else if ((JSON.parse(res).noshared.code === "ER_DUP_ENTRY")) {
                SE.$(`post-message-${idpost}`).innerHTML = `<p class="repost-mess" style="color: #eaa5a5; text-shadow: 0px 0px 2px #ff0000;">${MESS.errorFormMessage().postisonmypage}</p>`; 
                setTimeout(() => {SE.$(`post-message-${idpost}`).innerHTML = ``;}, 3000); 
            } else if ((JSON.parse(res).noshared === "You can not repost from your page to yours!")) {
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
        let addpost = document.body.clientHeight - window.innerHeight -1;
        if (document.documentElement.scrollTop > addpost){
            BLOG.postList(`${window.location.pathname.replace(/[/]/gi, '')}`);
        };             
    };

    //show del proof
    let postDelProof = (postid) => {
        SE.$(`post-message-${postid}`).innerHTML = `
        <div class="post-message-prof-wrap">
            <p>${MESS.errorFormMessage().postdelproof}</p>
            <p onclick="BLOG.delpost('${postid}')">${MESS.errorFormMessage().prooffriends}</p>  
            <p onclick="BLOG.closeProfShare('${postid}')"><i class='fas fa-times'></i></p>         
        </div>`;
    };

    //delete post
    let delpost = (postid) => {
        let obj = {"postid":`${postid}`, "wallid":`${window.location.pathname.replace(/[/]/gi, '')}`};
        SE.send(obj, "/postdel", (res) => {            
            if ((JSON.parse(res).res) && (JSON.parse(res).res === 1)) {
                if(SE.$(`post-wrap-${postid}`)){ SE.$(`post-wrap-${postid}`).remove(); };
            } else {
                SE.$(`post-message-${postid}`).innerHTML = '';
            }; 
        });    
    };

    //like post
    let like = (postid, type) => {
        let wallid = ((SE.$(`perepid_${postid}`)) && (SE.$(`perepid_${postid}`).getAttribute('perep') !== undefined)) 
            ? SE.$(`perepid_${postid}`).getAttribute('perep') 
            : `${window.location.pathname.replace(/[/]/gi, '')}`;
        let bgcolor;
        let obj = {"postid":`${postid}`, "wallid":`${wallid}`, "type":`${type}`};
        SE.send(obj, "/postlike", (res) => {
            if ((JSON.parse(res).res) && (JSON.parse(res).res.res === '1')) {
                if (type === 'heart'){ bgcolor = `linear-gradient(#fb5c71, #e94055)`};
                if (type === 'finger'){ bgcolor = `linear-gradient(#38a7fc, #195df1)`};
                if (type === 'smile'){ bgcolor = `linear-gradient(#fdf6bc, #ffe600)`};
                if (JSON.parse(res).res.likeis === 'yes'){
                    SE.$(`like${type}-${postid}`).style.background = bgcolor;
                    if (type === 'smile'){SE.$(`like${type}-${postid}`).style.color = '#887a00'};
                } 
                SE.$(`like${type}length-${postid}`).innerHTML = `${JSON.parse(res).res.likelength}`;
            } else if ((JSON.parse(res).res) && (JSON.parse(res).res.res === '0')) {
                if (type === 'heart'){ bgcolor = `linear-gradient(#fdc8cf, #f4b7bf)`};
                if (type === 'finger'){ bgcolor = `linear-gradient(#afdafb, #92aade)`};
                if (type === 'smile'){ bgcolor = `linear-gradient(#f7f1c1, #ffffff)`};
                if (JSON.parse(res).res.likeis === 'no'){
                    SE.$(`like${type}-${postid}`).style.background = bgcolor;
                    if (type === 'smile'){SE.$(`like${type}-${postid}`).style.color = '#dcc500'};
                } 
                SE.$(`like${type}length-${postid}`).innerHTML = `${JSON.parse(res).res.likelength}`;
            }; 
        });      
    };

    //event if mouse over post
    let postLikeOver = (postid, type, step, typeres) => {
        let wallid = ((SE.$(`perepid_${postid}`)) && (SE.$(`perepid_${postid}`).getAttribute('perep') !== undefined)) 
            ? SE.$(`perepid_${postid}`).getAttribute('perep') 
            : `${window.location.pathname.replace(/[/]/gi, '')}`;
        let likelistshare = (type === 'share') ? 'likelist-share' : '';   
        let obj = {"postid":`${postid}`, "wallid":`${wallid}`, "type":`${type}`, "step":`${step}`};
        if (typeres === 'shortlist') {
            if (+SE.$(`like${type}length-${postid}`).innerHTML.trim() !== 0) {
                if ((SE.$(`like${type}length-${postid}`)) && (!SE.$(`likeall${type}-${postid}`))) {
                    SE.send(obj, "/postlikelist", (res) => {
                        if (JSON.parse(res).res) {
                            let masslikes = JSON.parse(res).res;
                            let lengthlikes = +SE.$(`like${type}length-${postid}`).innerHTML.trim();
                            SE.$(`like${type}length-${postid}`).innerHTML += `<div class="${likelistshare}" id="likeall${type}-${postid}"></div>`;
                            for (let i = 0; i < masslikes.length; i++) {
                                SE.$(`likeall${type}-${postid}`).innerHTML += `<p onclick="SE.redirect('${masslikes[i].userid}')">${masslikes[i].surname} ${masslikes[i].name}</p>`;
                            }
                            SE.$(`likeall${type}-${postid}`).innerHTML += `<p onclick="BLOG.postLikeOver('${postid}', '${type}', '1000', 'fulllist')">${MESS.errorFormMessage().showall} ${lengthlikes} ...</p>`;
                        }; 
                    });
                };  
            };
        } else if (typeres === 'fulllist') {
            SE.send(obj, "/postlikelist", (res) => {
                SE.$(`post-message-${postid}`).innerHTML = ``;
                if (JSON.parse(res).res) {
                    let masslikes = JSON.parse(res).res;
                    if(SE.$(`likeall${type}-${postid}`)){ SE.$(`likeall${type}-${postid}`).remove(); };
                    SE.$(`post-message-${postid}`).innerHTML = `<p class="like-all-close"><i class='far fa-times-circle' style="cursor: pointer;" onclick="BLOG.closeProfShare('${postid}')"></i></p>`;
                    SE.$(`post-message-${postid}`).innerHTML += `<div class="like-all-wrap" id="like-all-wrap-${postid}"></div>`;
                    for (let i = 0; i < masslikes.length; i++) {
                        SE.$(`like-all-wrap-${postid}`).innerHTML += `<div class="like-all-wrap-body" onclick="SE.redirect('${masslikes[i].userid}')">
                            <span style="background-image: url('${masslikes[i].ava}'); background-position:${masslikes[i].avasettings};"></span>
                            <p>${masslikes[i].surname} ${masslikes[i].name}</p>
                        </div>`;
                    };
                }; 
            });
        };
    };

    //event if mouse leave post
    let postLikeLeave = (postid, type) => {
        if (SE.$(`likeall${type}-${postid}`)) { SE.$(`likeall${type}-${postid}`).innerHTML = ``; }  
        if(SE.$(`likeall${type}-${postid}`)){ SE.$(`likeall${type}-${postid}`).remove(); };
    };

    //event if mouse leave post
    let postComShowWrap = (postid) => {
        if (!SE.$(`post-com-wrap-${postid}`)) {
            BLOG.postComShow(postid, 'first');
        } else {
            SE.$(`post-message-${postid}`).innerHTML = '';
        };
    };

    //show post comments
    let postComShow = (postid, typeenter) => {
        let wallid = ((SE.$(`perepid_${postid}`)) && (SE.$(`perepid_${postid}`).getAttribute('perep') !== undefined)) 
            ? SE.$(`perepid_${postid}`).getAttribute('perep') 
            : `${window.location.pathname.replace(/[/]/gi, '')}`;
        let step = (typeenter === 'add') ? 0 : document.getElementsByClassName(`post-com-list-${postid}`).length;
        let obj = {"postid":`${postid}`, "wallid":`${wallid}`, "step":`${step}`};
        SE.send(obj, "/postshowcom", (res) => {
            if (JSON.parse(res).res) {
                let comsender = JSON.parse(res).res;                
                let ifisfriend = (JSON.parse(res).res.userid) ? `
                    <div class="post-com-write">
                        <div class="post-com-write-foto" 
                            style="background-image: url('${comsender.ava}'); background-position: ${comsender.avasettings};"
                            onclick="SE.redirect('${comsender.userid}')"
                            title="${comsender.surname + ' ' + comsender.name}">
                        </div>
                        <div class="post-com-write-com">                                    
                            <textarea class="article-blog-post-com" name="article-blog-post" maxlength="400" 
                                id="article-blog-post-${postid}" 
                                oninput="BLOG.kilkRows('article-blog-post-${postid}'), CHECK.checkSendMess('article-blog-post-${postid}')"
                                onkeypress="BLOG.postSendCom('${postid}', event)"
                            ></textarea>
                        </div>
                        <div class="post-com-write-smile">
                            <i class='far fa-grin' onclick="BLOG.smilesListCom('post-com-smile-${postid}', '${postid}')"></i>
                        </div>
                    </div>` : ``;                
                if (typeenter === 'first') {
                    SE.$(`post-message-${postid}`).innerHTML = `
                        <div class="post-com-wrap" id="post-com-wrap-${postid}">
                            <div class="post-com-com" id="post-com-com-${postid}"></div>
                            <div class="post-com-shomore" id="post-com-shomore-${postid}"></div>
                            ${ifisfriend}
                            <div class="post-com-smile" id="post-com-smile-${postid}"></div>
                        </div>
                    `;
                    SE.$(`post-com-com-${postid}`).innerHTML = ``;
                }
                if (JSON.parse(res).res.masspost) {
                    let commass = JSON.parse(res).res.masspost;
                    if (typeenter === 'add') {
                        let fordel = (commass[0].options === 'del') ? `<p class="post-com-list-post-p" onclick="BLOG.showOptions('${postid}', '${commass[0].comid}')"><i class='far fa-trash-alt'></i></p>` : '';
                        let newItem = document.createElement("div");
                        newItem.setAttribute("class", `post-com-list-wrap post-com-list-${postid}`);
                        newItem.setAttribute("id", `${commass[0].comid}`);
                        newItem.innerHTML = `
                            <div class="com-mess" id="com-mess-${commass[0].comid}"></div>
                            <div class="post-com-list-blok">
                                <div class="post-com-list-img"                                 
                                    style="background-image: url('${commass[0].ava}'); background-position: ${commass[0].avasettings};"
                                    onclick="SE.redirect('${commass[0].userid}')"></div>
                                <div class="post-com-list-post"><span onclick="SE.redirect('${commass[0].userid}')">${commass[0].surname + ' ' + commass[0].name}</span>${commass[0].com}${fordel}</div>
                            </div>
                            <p class="post-com-list-date">${commass[0].comdate}</p>`;
                        SE.$(`post-com-com-${postid}`).insertBefore(newItem, SE.$(`post-com-com-${postid}`).childNodes[0]);
                    } else {
                        for (let i = 0; i < commass.length; i++) {
                            let fordel = (commass[i].options === 'del') ? `<p class="post-com-list-post-p" onclick="BLOG.showOptions('${postid}', '${commass[i].comid}')"><i class='far fa-trash-alt'></i></p>` : '';
                            SE.$(`post-com-com-${postid}`).innerHTML += `                            
                                <div class="post-com-list-wrap post-com-list-${postid}" id="${commass[i].comid}">
                                    <div class="com-mess" id="com-mess-${commass[i].comid}"></div>
                                    <div class="post-com-list-blok">
                                        <div class="post-com-list-img"                                 
                                            style="background-image: url('${commass[i].ava}'); background-position: ${commass[i].avasettings};"
                                            onclick="SE.redirect('${commass[i].userid}')"></div>
                                        <div class="post-com-list-post"><span onclick="SE.redirect('${commass[i].userid}')">${commass[i].surname + ' ' + commass[i].name}</span>${commass[i].com}${fordel}</div>
                                    </div>
                                    <p class="post-com-list-date">${commass[i].comdate}</p>
                                </div>
                            `;
                        };
                    };
                }; 
                let stepafter = document.getElementsByClassName(`post-com-list-${postid}`).length;
                SE.$(`post-com-shomore-${postid}`).innerHTML = (stepafter < comsender.pastlength) ? `<p onclick="BLOG.postComShow('${postid}', '')">show more</p>` : ``;
                if(SE.$(`article-blog-post-${postid}`)) {SE.$(`article-blog-post-${postid}`).placeholder = `${MESS.errorFormMessage().writepost}`};     
            }; 
        }); 

    };

    //send com
    let postSendCom = (postid, event) => {
        let wallid = ((SE.$(`perepid_${postid}`)) && (SE.$(`perepid_${postid}`).getAttribute('perep') !== undefined)) 
        ? SE.$(`perepid_${postid}`).getAttribute('perep') 
        : `${window.location.pathname.replace(/[/]/gi, '')}`;
        if (event.key === 'Enter'){
            if (SE.$(`article-blog-post-${postid}`).value !== ''){ 
                let readymes = BLOG.readymess(`article-blog-post-${postid}`);
                let obj = {"postid":`${postid}`, "wallid":`${wallid}`, "com":`${readymes}`};
                SE.send(obj, "/postsendcom", (res) => {
                    if ((JSON.parse(res).res) && (JSON.parse(res).res.res === '1')) {
                        SE.$(`article-blog-post-${postid}`).value = ``;
                        SE.$(`article-blog-post-${postid}`).style.height = `30px`;
                        SE.$(`likecomlength-${postid}`).innerHTML = `${JSON.parse(res).res.likelength}`;
                        if (SE.$(`com-smile-${postid}`)) {SE.$(`com-smile-${postid}`).innerHTML = ``};
                        BLOG.postComShow(postid, 'add');
                    };
                }); 
            };
        };
    };

    //for add height to textarea
    let kilkRows = (postid) => {
        SE.$(`${postid}`).style.height = (SE.$(`${postid}`).scrollHeight)+"px";        
        SE.$(`${postid}`).style.overflow = ((parseInt(SE.$(`${postid}`).style.height) > 140) && (postid === 'article-write')) ? `auto` : `hidden`;
    };

    //for show smiles for com
    let smilesListCom = (where, postid) => {
        if (!SE.$(`com-smile-${postid}`)) {
            SE.$(`${where}`).innerHTML = `<div class="smile-gtoup-com" id="com-smile-${postid}"></div>`;
            for(let i = 0; i < 18; i++){SE.$(`com-smile-${postid}`).innerHTML += `<p class="smiles-list-com" onclick="BLOG.addSmileCom('${smileSM[i]}', '${postid}')">${smileSM[i]}</p>`;}  
            for(let i = 0; i < 18; i++){SE.$(`com-smile-${postid}`).innerHTML += `<p class="smiles-list-com" onclick="BLOG.addSmileCom('${smileHN[i]}', '${postid}')">${smileHN[i]}</p>`;}  
            for(let i = 0; i < 18; i++){SE.$(`com-smile-${postid}`).innerHTML += `<p class="smiles-list-com" onclick="BLOG.addSmileCom('${smileHR[i]}', '${postid}')">${smileHR[i]}</p>`;}  
            for(let i = 0; i < 18; i++){SE.$(`com-smile-${postid}`).innerHTML += `<p class="smiles-list-com" onclick="BLOG.addSmileCom('${smileVG[i]}', '${postid}')">${smileVG[i]}</p>`;}  
        } else {
            SE.$(`post-com-smile-${postid}`).innerHTML = ``;
        }
    };

    //for add smile to com write area
    let addSmileCom = (smile, postid) => {
        let originval = SE.$(`article-blog-post-${postid}`).value; 
        SE.$(`article-blog-post-${postid}`).value = `${originval}${smile}`;        
    };

    window.addEventListener("resize", function(event) {
        let masstextarea = document.getElementsByClassName('article-blog-post-com');
        for (let i = 0; i < masstextarea.length; i++) {
            let postid = masstextarea[i].getAttribute('id').replace('article-blog-post-', '');
            SE.$(`article-blog-post-${postid}`).style.height = (SE.$(`article-blog-post-${postid}`).scrollHeight)+"px";
        };        
    });

    //show options for comments
    let showOptions = (postid, comid) => {       
        let wallid = ((SE.$(`perepid_${postid}`)) && (SE.$(`perepid_${postid}`).getAttribute('perep') !== undefined)) 
        ? SE.$(`perepid_${postid}`).getAttribute('perep') 
        : `${window.location.pathname.replace(/[/]/gi, '')}`;
        SE.$(`com-mess-${comid}`).innerHTML = `
        <div class="post-message-prof-com">
            <p>${MESS.errorFormMessage().postdelproof}</p>
            <p onclick="BLOG.delCom('${postid}', '${wallid}', '${comid}')">${MESS.errorFormMessage().prooffriends}</p>  
            <p onclick="if (SE.$('com-mess-${comid}')) {SE.$('com-mess-${comid}').innerHTML = ''}"><i class='fas fa-times'></i></p>         
        </div>`;
    };

    //close options for comments
    let delCom = (postid, wallid, comid) => {
        let obj = {"postid":`${postid}`, "wallid":`${wallid}`, "comid":`${comid}`};
        SE.send(obj, "/delcom", (res) => {
            if ((JSON.parse(res).res) && (JSON.parse(res).res.res === '1')) {
                if (SE.$(`${comid}`)) {SE.$(`${comid}`).remove()}
                SE.$(`likecomlength-${postid}`).innerHTML = `${JSON.parse(res).res.likelength}`;
            } else {
                if (SE.$(`com-mess-${comid}`)) {SE.$(`com-mess-${comid}`).innerHTML = ''}
            }
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
        postDelProof,
        postLikeOver,
        postLikeLeave,
        postComShow,
        kilkRows,
        smilesListCom,
        addSmileCom,
        readymess,
        postComShowWrap,
        postSendCom,
        showOptions,
        delCom        
    }
})();