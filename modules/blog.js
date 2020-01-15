let con = require('../db/connectToDB').con;
let {$_log, readyFullDate, token, checkProof, readyAva, sqlquery} = require('./service');

    let sendpost = (req, res) => {
        checkProof(req, res, (req, res, userid) => {       
            let messready = req.body.post.replace(/[^0-9a-zA-Zа-яА-Я-іІїЇєЄ'\"',.;:_\$-\+\/\\\?\#\&\!\=\%\*() \n]/gi, '');
            let myid = userid;
            let datesend = readyFullDate('', 'r'); 
            let idwall = req.body.idwall;
            let postid = token(20);
            console.log("post", messready);
            console.log("userid", myid);
            console.log("idwall", idwall);
            console.log("datesend", datesend);
            let sql = `INSERT INTO blog_${idwall} (userid, postfromid, post, postid, postdate, perepostfromid, perepostdate) 
                       VALUES ('${idwall}', '${myid}', '${messready}', '${postid}', '${datesend}', 'me', 'me')`;
            sqlquery(req, res, sql, 'err-send-post', 'no-add-post', (req, res, result) => {
                $_log('post-add', result.affectedRows, 'res', res);
            });    
        });
    };

    let postlist = (req, res) => {
        checkProof(req, res, (req, res, userid) => { 
            let myid = userid;
            let idwall = req.body.pageid;
            let who = (myid === idwall) ? 'my' : 'fr';
            let sql = `SELECT id, userid, postfromid, postid, perepostfromid, perepostdate, perepostid FROM blog_${idwall} ORDER BY id DESC LIMIT ${req.body.step}, 10;`;
            let mass = [];
            sqlquery(req, res, sql, 'err-find-post', 'no-post', (req, res, result) => {
                let reslength = result.length;
                for(let i = 0; i < reslength; i++){
                    let itermain = i;
                    let postid = result[i].postid;
                    let postfromid = result[i].postfromid;
                    let prepostdate = result[i].perepostdate;
                    let perepostfromid = result[i].perepostfromid;
                    let perepostid = result[i].perepostid;
                    let table = (perepostfromid === 'me') ? idwall : result[i].perepostfromid;       
                    let sql = `SELECT U.userid, U.name, U.surname, U.ava, U.avasettings, P.id, P.postfromid, P.postdate, P.post, P.postid, P.perepostfromid, P.perepostdate
                               FROM users U LEFT JOIN blog_${table} P on U.userid=P.userid WHERE P.postid = '${result[i].postid}'`;    
                    sqlquery(req, res, sql, 'err-find-post', 'no-post', (req, res, result) => {                        
                        let fullwho, fullpost, fullpostdate;
                        if (result != ''){
                            fullwho = result[0].postfromid;
                            fullpost = result[0].post;
                            fullpostdate = result[0].postdate;
                        } else {                            
                            fullwho = 'nopost';                            
                            fullpost = 'nopost';
                            fullpostdate = '--:--:----';
                        }
                        let sql = `SELECT userid, name, surname, ava, avasettings FROM users WHERE userid = '${postfromid}'`;
                        sqlquery(req, res, sql, 'err-find-post', 'no-post', (req, res, result) => {
                            let postfrom = result;
                            let sql = `SELECT userid, name, surname, ava, avasettings FROM users WHERE userid = '${perepostfromid}'`;
                            sqlquery(req, res, sql, 'err-find-post', 'no-post', (req, res, result) => {  
                                let perepostfrom = result; 
                                let sql = `SELECT userid, name, surname, ava, avasettings FROM users WHERE userid = '${fullwho}'`;
                                sqlquery(req, res, sql, 'err-find-post', 'no-post', (req, res, result) => {              
                                    let whopostid, whopostname, whopostsurname;
                                    if (result != ''){
                                        whopostid = result[0].userid;
                                        whopostname = result[0].name;
                                        whopostsurname = result[0].surname;
                                    } else {
                                        whopostid = '';
                                        whopostname = '';
                                        whopostsurname = '';     
                                    }
                                    let likemass = ['heart', 'finger', 'smile', 'com', 'share']
                                    let likeis = ['no', 'no', 'no', 'no', 'no'];
                                    let kilk = [0, 0, 0, 0, 0];
                                    for (let i = 0; i < 5; i++) {
                                        let iter = i;                             
                                        let sql = `SELECT likeuserid FROM like_${table} WHERE likepostid = '${postid}' AND liketype = '${likemass[i]}'`;
                                        sqlquery(req, res, sql, `err-find-like-${likemass[i]}`, `no-like-${likemass[i]}`, (req, res, result) => { 
                                            if (result != ''){                                                
                                                for (let i = 0; i < result.length; i++) { 
                                                    if (result[i].likeuserid === userid) { likeis[iter] = 'yes' };
                                                };
                                                kilk[iter] = result.length;                                                
                                            }
                                            if (iter === 4){
                                                if (perepostfrom != ''){ 
                                                    mass.push({"userid": `${postfrom[0].userid}`, 
                                                    "name": `${postfrom[0].name}`, 
                                                    "surname": `${postfrom[0].surname}`,
                                                    "ava": `${readyAva(postfrom[0].ava)}`,
                                                    "avasettings": `${postfrom[0].avasettings}`,
                                                    "post": `${fullpost}`,
                                                    "postid": `${postid}`,
                                                    "postdate": `${prepostdate}`,
                                                    "perepostfromid": `${perepostfromid}`,
                                                    "perename": `${perepostfrom[0].name}`,
                                                    "peresurname": `${perepostfrom[0].surname}`,
                                                    "pereava": `${readyAva(perepostfrom[0].ava)}`,
                                                    "pereavasettings": `${perepostfrom[0].avasettings}`,                       
                                                    "perepostdate": `${fullpostdate}`,                       
                                                    "perepostid": `${perepostid}`,                       
                                                    "postwhoid": `${whopostid}`,                       
                                                    "postwhoname": `${whopostname}`,                       
                                                    "postwhosurname": `${whopostsurname}`,                  
                                                    "who": `${who}`,
                                                    "heart": `${likeis[0]}`,                       
                                                    "heartlength": `${kilk[0]}`,                       
                                                    "finger": `${likeis[1]}`,                       
                                                    "fingerlength": `${kilk[1]}`,                       
                                                    "smile": `${likeis[2]}`,                       
                                                    "smilelength": `${kilk[2]}`,                       
                                                    "com": `${kilk[3]}`,                       
                                                    "share": `${kilk[4]}`,                       
                                                    });
                                                } else {  
                                                    mass.push({"userid": `${postfrom[0].userid}`, 
                                                    "name": `${postfrom[0].name}`, 
                                                    "surname": `${postfrom[0].surname}`,
                                                    "ava": `${readyAva(postfrom[0].ava)}`,
                                                    "avasettings": `${postfrom[0].avasettings}`,
                                                    "post": `${fullpost}`,
                                                    "postid": `${postid}`,
                                                    "postdate": `${fullpostdate}`,
                                                    "perepostfromid": `${perepostfromid}`,
                                                    "who": `${who}`, 
                                                    "heart": `${likeis[0]}`,                       
                                                    "heartlength": `${kilk[0]}`,                       
                                                    "finger": `${likeis[1]}`,                       
                                                    "fingerlength": `${kilk[1]}`,                       
                                                    "smile": `${likeis[2]}`,                       
                                                    "smilelength": `${kilk[2]}`,                       
                                                    "com": `${kilk[3]}`,                       
                                                    "share": `${kilk[4]}`,                     
                                                    });
                                                }; 
                                                if(itermain == reslength-1){
                                                    res.send({"res": mass});
                                                };                                       
                                            }
                                        }, 'noerr');
                                    };
                                }, 'noerr');
                            }, 'noerr');                         
                        }, 'noerr');
                    }, 'noerr');
                };                
            });    
        });
    };

    let postshare = (req, res) => {
        checkProof(req, res, (req, res, userid) => { 
            if (userid === req.body.wallid) {
                res.send({"noshared": 'You can not repost from your page to yours!'});
            } else if (userid !== req.body.wallid){
                let sql = `SELECT postfromid FROM blog_${req.body.wallid} WHERE postid = '${req.body.postid}'`;
                sqlquery(req, res, sql, 'err-find-post', 'noshared', (req, res, result) => {
                    let perepostid = result[0].postfromid;
                    perepostid = (perepostid === userid) ? `my` : `nomy`;                    
                    let sql = `INSERT INTO blog_${userid} (userid, postfromid, postid, perepostfromid, perepostdate, perepostid) 
                               VALUES ('${userid}', '${userid}', '${req.body.postid}', '${req.body.wallid}', '${readyFullDate('', 'r')}', '${perepostid}')`;
                    sqlquery(req, res, sql, 'err-share', 'noshared', (req, res, result) => {
                        let sql = `INSERT INTO like_${req.body.wallid} (likeuserid, likepostid, liketype) VALUES ('${userid}', '${req.body.postid}', 'share')`;
                        sqlquery(req, res, sql, 'err-share', 'noshared', (req, res, result) => {}, 'noerr');
                        $_log('post-add', result.affectedRows, 'res', res);
                    });
                });
            };       
        });
    };

    let postlike = (req, res) => {
        checkProof(req, res, (req, res, userid) => { 
            let sql = `SELECT likeuserid FROM like_${req.body.wallid} WHERE likepostid = '${req.body.postid}' AND likeuserid = '${userid}' AND liketype = '${req.body.type}'`;
            sqlquery(req, res, sql, `err-find-like-${req.body.type}`, `no-${req.body.type}`, (req, res, result) => {
                if (result != '') {
                    $_log(`like-is-${req.body.type}`, '0', 'res', res);
                } else {
                    let sql = `INSERT INTO like_${req.body.wallid} (likeuserid, likepostid, liketype) VALUE ('${userid}', '${req.body.postid}', '${req.body.type}')`;
                    sqlquery(req, res, sql, `err-add-like-${req.body.type}`, `noadd${req.body.type}`, (req, res, result) => {
                        let sql = `SELECT likeuserid FROM like_${req.body.wallid} WHERE likepostid = '${req.body.postid}' AND liketype = '${req.body.type}'`;
                        sqlquery(req, res, sql, `err-find-like-${req.body.type}`, `no-${req.body.type}`, (req, res, result) => { 
                            if (result != ''){
                                let likeis = 'no';
                                for (let i = 0; i < result.length; i++) { if (result[i].likeuserid === userid) { likeis = 'yes' }};
                                $_log(`like-is-${req.body.type}`, {"res":'1', "likeis":`${likeis}`, "likelength":`${result.length}`}, 'res', res);
                            } 
                        }, 'noerr');
                    }, 'noerr');   
                };
            }, 'noerr');
        });
    };

    let postdel = (req, res) => {
        checkProof(req, res, (req, res, userid) => { 
            if (req.body.wallid === userid) {
                let sql = `SELECT perepostfromid FROM blog_${req.body.wallid} WHERE postid = '${req.body.postid}'`;
                sqlquery(req, res, sql, `err-find-post`, `nodelpost`, (req, res, result) => {
                    let likeidfrom = result[0].perepostfromid;
                    if (result[0].perepostfromid === 'me'){
                        let sql = `DELETE FROM blog_${userid} WHERE postid = '${req.body.postid}'`;
                        sqlquery(req, res, sql, `err-find-post`, `nodelpost`, (req, res, result) => {
                            let sql = `DELETE FROM like_${req.body.wallid} WHERE likepostid = '${req.body.postid}'`;
                            sqlquery(req, res, sql, `err-find-post`, `no-post`, (req, res, result) => {}, 'noerr');
                            $_log(`post-deleted`, result.affectedRows, 'res', res); 
                        });
                    } else {
                        let sql = `DELETE FROM blog_${userid} WHERE postid = '${req.body.postid}'`;
                        sqlquery(req, res, sql, `err-find-post`, `nodelpost`, (req, res, result) => {
                            let sql = `DELETE FROM like_${likeidfrom} WHERE likepostid = '${req.body.postid}' AND likeuserid = '${userid}' AND liketype = 'share'`;
                            sqlquery(req, res, sql, `err-find-post`, `no-post`, (req, res, result) => {}, 'noerr');
                            $_log(`post-deleted`, result.affectedRows, 'res', res);  
                        });
                    };    
                });
            } else {
                $_log(`post-not-find`, '0', 'res', res);
            }
        });
    };

    let postlikelist = (req, res) => {
        checkProof(req, res, (req, res, userid) => { 
            mass = [];
            let sql = `SELECT id, likeuserid FROM like_${req.body.wallid} WHERE likepostid = '${req.body.postid}' AND liketype = '${req.body.type}' ORDER BY id DESC LIMIT ${req.body.step}`;
            sqlquery(req, res, sql, `err-find-post`, `nolikes`, (req, res, result) => {
                let reslength = result.length;
                for(let i = 0; i < reslength; i++){
                    let sql = `SELECT userid, name, surname, ava, avasettings FROM users WHERE userid = '${result[i].likeuserid}'`; 
                    sqlquery(req, res, sql, `err-find-post`, `nolikes`, (req, res, result) => {          
                        if (result != ''){    
                            mass.push({"userid": `${result[0].userid}`, 
                                "name": `${result[0].name}`, 
                                "surname": `${result[0].surname}`,
                                "ava": `${readyAva(result[0].ava)}`,
                                "avasettings": `${result[0].avasettings}`,                                          
                            });
                            if(i == reslength-1){ res.send({"res": mass}) };  
                        };   
                    }, 'noerr');               
                };
            });
        });
    };

    let postshowcom = (req, res) => {
        checkProof(req, res, (req, res, userid) => { 
            let postid = req.body.postid;
            let wallid = req.body.wallid;
            let uuserid = userid;
            console.log("postid", postid);
            console.log("wallid", wallid);
            console.log("userid", uuserid);

            let mass = [];
            let sql = `SELECT U.userid, U.name, U.surname, U.ava, U.avasettings, F.friendid, F.friendstatus 
            FROM users U LEFT JOIN friends_${userid} F on U.userid=F.userid WHERE F.userid = '${userid}' AND F.friendid = '${req.body.wallid}'`;  
            sqlquery(req, res, sql, `err-find-com`, `nocoms`, (req, res, result) => {
                let resuser = result;
                console.log("resuser", resuser);

                console.log("comfrom", req.body.wallid);

                let sql = `SELECT likeuserid, comment, datecomment FROM like_${req.body.wallid} WHERE likepostid = '${req.body.postid}' AND liketype = 'com'`;  
                sqlquery(req, res, sql, `err-find-com`, `nocoms`, (req, res, result) => {
                    let rescom = result;

                    console.log("rescom", rescom);

                    if ((rescom.length === 0) && ((req.body.wallid === userid) || (resuser[0].friendstatus === 'friend'))) {
                        let sql = `SELECT userid, name, surname, ava, avasettings FROM users WHERE userid = '${userid}'`;  
                        sqlquery(req, res, sql, `err-find-com`, `nocoms`, (req, res, result) => {
                            res.send({"res": {
                                "userid": `${result[0].userid}`, 
                                "name": `${result[0].name}`, 
                                "surname": `${result[0].surname}`,
                                "ava": `${readyAva(result[0].ava)}`,
                                "avasettings": `${result[0].avasettings}`
                            }});
                        });
                    } else if (rescom.length !== 0) {
                        let masspost = [];
                        for (let i = 0; i < rescom.length; i++) {
                            
                            let sql = `SELECT userid, name, surname, ava, avasettings FROM users WHERE userid = '${rescom[i].likeuserid}'`;  
                            sqlquery(req, res, sql, `err-find-com`, `nocoms`, (req, res, result) => {

                                masspost.push({"userid": `${result[0].userid}`, 
                                    "name": `${result[0].name}`, 
                                    "surname": `${result[0].surname}`,
                                    "ava": `${readyAva(result[0].ava)}`,
                                    "avasettings": `${result[0].avasettings}`,                                          
                                    "com": `${rescom[i].comment}`,                                          
                                    "comdate": `${rescom[i].datecomment}`,                                          
                                });
                                
                                if(i === rescom.length-1) { 

                                    if (resuser != ''){ 

                                        res.send({"res": {
                                        "userid": `${resuser[0].userid}`, 
                                        "name": `${resuser[0].name}`, 
                                        "surname": `${resuser[0].surname}`,
                                        "ava": `${readyAva(resuser[0].ava)}`,
                                        "avasettings": `${resuser[0].avasettings}`,                                          
                                        "masspost": masspost}}); 
                        

                                    } else if (req.body.wallid === userid) {


                                        let sql = `SELECT userid, name, surname, ava, avasettings FROM users WHERE userid = '${userid}'`;  
                                        sqlquery(req, res, sql, `err-find-com`, `nocoms`, (req, res, result) => {
                
                                            res.send({"res": {
                                                "userid": `${result[0].userid}`, 
                                                "name": `${result[0].name}`, 
                                                "surname": `${result[0].surname}`,
                                                "ava": `${readyAva(result[0].ava)}`,
                                                "avasettings": `${result[0].avasettings}`,
                                                "masspost": masspost}}); 
                                        });


                                    } else {
                                        res.send({"res": {"masspost": masspost}}); 

                                    };  

                                };  


                            }, 'noerr');
                        };
                    };

                }, 'noerr');
                
            }, 'noerr');
        });
    };

    let postsendcom = (req, res) => {
        checkProof(req, res, (req, res, userid) => {

            console.log("postoriginal", req.body.com);
            
            let messready = req.body.com.replace(/[^0-9a-zA-Zа-яА-Я-іІїЇєЄ'\"',.;:_\$-\+\/\\\?\#\&\!\=\%\*() \n]/gi, '');
            let myid = userid;
            let datesend = readyFullDate('', 'r'); 
            let wallid = req.body.wallid;
            let postid = req.body.postid;
            console.log("post", messready);
            console.log("userid", myid);
            console.log("idwall", wallid);
            console.log("datesend", datesend);

            if (req.body.wallid === userid) {


                console.log("resuser", "dfdfdf");
                    
                let sql = `INSERT INTO like_${req.body.wallid} (likeuserid, likepostid, liketype, comment, datecomment)
                           VALUES ('${userid}', '${req.body.postid}', 'com', '${messready}', '${readyFullDate('', 'r')}')`;
                sqlquery(req, res, sql, 'err-add-com', 'noaddcom', (req, res, result) => {
                    $_log('post-add', result.affectedRows, 'res', res);
                }); 


            } else {

                let sql = `SELECT U.userid, F.friendstatus FROM users U LEFT JOIN friends_${userid} F on U.userid=F.userid WHERE F.userid = '${userid}' AND F.friendid = '${req.body.wallid}'`;  
                sqlquery(req, res, sql, `err-find-com`, `nocoms`, (req, res, result) => {
                    let resuser = result;
                    console.log("resuser", resuser);
    
    
                    let sql = `INSERT INTO like_${req.body.wallid} (likeuserid, likepostid, liketype, comment, datecomment)
                               VALUES ('${userid}', '${req.body.postid}', 'com', '${messready}', '${readyFullDate('', 'r')}')`;
                    sqlquery(req, res, sql, 'err-add-com', 'noaddcom', (req, res, result) => {
                        $_log('post-add', result.affectedRows, 'res', res);
                    });    
    
    
                }, 'noerr');

            };
        });
    };


module.exports = {
    sendpost,
    postlist,
    postshare,
    postlike,
    postdel,
    postlikelist,
    postshowcom,
    postsendcom    
}