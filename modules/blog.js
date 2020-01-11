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
            let sql = `SELECT id, userid, postfromid, postid, perepostfromid, perepostdate, perepostid FROM blog_${idwall} ORDER BY id DESC LIMIT ${req.body.step}, 30;`;
            let mass = [];
            sqlquery(req, res, sql, 'err-find-post', 'no-post', (req, res, result) => {
                let reslength = result.length;
                for(let i = 0; i < reslength; i++){
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
                                        });
                                    }; 
                                    if(i == reslength-1){
                                        res.send({"res": mass});
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
                    if (perepostid === userid){ 
                        perepostid = `my`;
                    } else {  
                        perepostid = `nomy`;
                    };
                    let sql = `INSERT INTO blog_${userid} (userid, postfromid, postid, perepostfromid, perepostdate, perepostid) 
                               VALUES ('${userid}', '${userid}', '${req.body.postid}', '${req.body.wallid}', '${readyFullDate('', 'r')}', '${perepostid}')`;
                    sqlquery(req, res, sql, 'err-share', 'noshared', (req, res, result) => {
                        $_log('post-add', result.affectedRows, 'res', res);
                    });
                });
            };       
        });
    };

    let postlike = (req, res) => {
        checkProof(req, res, (req, res, userid) => { 
            console.log("userid", userid);
            console.log("postidid", req.body.postid);
            console.log("wallid", req.body.wallid);
            console.log("type", req.body.type);

            let sql = `SELECT likeuserid FROM like_${req.body.wallid} WHERE likepostid = '${req.body.postid}' AND liketype = '${req.body.type}'`;
            sqlquery(req, res, sql, `err-find-like-${req.body.type}`, `no-${req.body.type}`, (req, res, result) => {
                console.log(result);
                if ((result != '') && (result[0].likeuserid === userid)){
                    $_log(`like-is-${req.body.type}`, '0', 'res', res);
                } else {
                    let sql = `INSERT INTO like_${req.body.wallid} (likeuserid, likepostid, liketype) VALUE ('${userid}', '${req.body.postid}', '${req.body.type}')`;
                    sqlquery(req, res, sql, `err-add-like-${req.body.type}`, `noadd${req.body.type}`, (req, res, result) => {
                        console.log(result);
                        $_log(`like-added-${req.body.type}`, result.affectedRows, 'res', res);

                    }, 'noerr');   
                }
            }, 'noerr');
        });
    };

    let postlikechange = (req, res) => {
        checkProof(req, res, (req, res, userid) => { 
            console.log("userid", userid);
            console.log("postidid", req.body.postid);
            console.log("wallid", req.body.wallid);
            console.log("type", req.body.type);

            let sql = `SELECT likeuserid FROM like_${req.body.wallid} WHERE likepostid = '${req.body.postid}' AND liketype = '${req.body.type}'`;
            sqlquery(req, res, sql, `err-find-like-${req.body.type}`, `no-${req.body.type}`, (req, res, result) => {
                


                if (result != ''){
                    console.log("likeislength",result.length);
                    let likeis = (result[0].likeuserid === userid) ? 'yes' : 'no';
                    console.log("likeis", likeis);
                    $_log(`like-is-${req.body.type}`, {"likeis":`${likeis}`, "likelength":`${result.length}`}, 'res', res);
                } else {

                }
            }, 'noerr');
        });
    };


module.exports = {
    sendpost,
    postlist,
    postshare,
    postlike,
    postlikechange
}