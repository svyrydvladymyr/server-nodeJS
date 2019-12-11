let con = require('../db/connectToDB').con;
let {clienttoken, createTableFriends, $_log} = require('./service');

let renderIfNotVerify = (req, res, result, userObj, avaurl, permissionAccess, active) => {
    $_log('render-user', result[0]);                  
    res.render(`main`, {
        title: `${userObj[0].surname} ${userObj[0].name}`,
        regtype: `${userObj[0].regtype}`,
        name: `${userObj[0].name}`,
        surname: `${userObj[0].surname}`,
        email: `${userObj[0].email}`,        
        facebookemail: `${userObj[0].facebookemail}`,
        googleemail: `${userObj[0].googleemail}`,
        instagramemail: `${userObj[0].instagramemail}`,
        githubemail: `${userObj[0].githubemail}`,
        linkedinemail: `${userObj[0].linkedinemail}`,
        twitteremail: `${userObj[0].twitteremail}`,
        birthday: `${userObj[0].birthday}`,
        phone: `${userObj[0].phone}`,
        message: `${userObj[0].message}`,
        country: `${userObj[0].country}`,
        town: `${userObj[0].town}`,
        profession: `${userObj[0].profession}`,
        education: `${userObj[0].education}`,
        ava: `${avaurl}`,
        avasettings: `${userObj[0].avasettings}`,
        permissAccess: `${permissionAccess}`,
        permissEdit: `false`,
        permissionFriend: `false`,
        permissionidreq: `null`,
        permissName: `${result[0].name}`,
        permissSurname: `${result[0].surname}`,
        permissUserid: `${result[0].userid}`,
        vskillsall: `${userObj[0].vskillsall}`,
        vskillsme:`${ userObj[0].vskillsme}`,
        vprojectsall: `${userObj[0].vprojectsall}`,
        vprojectsme: `${userObj[0].vprojectsme}`,
        vskillsalltop: `${userObj[0].vskillsalltop}`,
        vskillsmetop: `${userObj[0].vskillsmetop}`,
        vprojectsalltop: `${userObj[0].vprojectsalltop}`,
        vprojectsmetop: `${userObj[0].vprojectsmetop}`,
        vblogall: `${userObj[0].vblogall}`,
        vblogme: `${userObj[0].vblogme}`, 
        vfriendme: `${userObj[0].vfriendme}`,
        vfriendall: `${userObj[0].vfriendall}`,
        activee: `${active}`,
    });
};

let renderIfFoundAutorisFriend = (req, res, result, userObj, avaurl, permissionAccess, permissionEdit, permissionFriend, permissionisFriend, permissionidreq, active) => {
    $_log('render-user', result[0]); 
    res.render(`main`, {
        title: `${userObj[0].surname} ${userObj[0].name}`,
        regtype: `${userObj[0].regtype}`,
        name: `${userObj[0].name}`,
        surname: `${userObj[0].surname}`,
        email: `${userObj[0].email}`,
        facebookemail: `${userObj[0].facebookemail}`,
        googleemail: `${userObj[0].googleemail}`,
        instagramemail: `${userObj[0].instagramemail}`,
        githubemail: `${userObj[0].githubemail}`,
        linkedinemail: `${userObj[0].linkedinemail}`,
        twitteremail: `${userObj[0].twitteremail}`,
        birthday: `${userObj[0].birthday}`,
        phone: `${userObj[0].phone}`,
        message: `${userObj[0].message}`,
        country: `${userObj[0].country}`,
        town: `${userObj[0].town}`,
        profession: `${userObj[0].profession}`,
        education: `${userObj[0].education}`,
        ava: `${avaurl}`,
        avasettings: `${userObj[0].avasettings}`,
        permissAccess: `${permissionAccess}`,
        permissEdit: `${permissionEdit}`,
        permissionFriend: `${permissionFriend}`,
        permissionisFriend: `${permissionisFriend}`,
        permissionidreq: `${permissionidreq}`,
        permissName: `${result[0].name}`,
        permissSurname: `${result[0].surname}`,
        permissUserid: `${result[0].userid}`,
        vskillsall: `${userObj[0].vskillsall}`,
        vskillsme:`${ userObj[0].vskillsme}`,
        vprojectsall: `${userObj[0].vprojectsall}`,
        vprojectsme: `${userObj[0].vprojectsme}`,
        vskillsalltop: `${userObj[0].vskillsalltop}`,
        vskillsmetop: `${userObj[0].vskillsmetop}`,
        vprojectsalltop: `${userObj[0].vprojectsalltop}`,
        vprojectsmetop: `${userObj[0].vprojectsmetop}`,
        vblogall: `${userObj[0].vblogall}`,
        vblogme: `${userObj[0].vblogme}`,   
        vfriendme: `${userObj[0].vfriendme}`,
        vfriendall: `${userObj[0].vfriendall}`,
        activee: `${active}`,                                 
    });
};

let renderIfFoundAndNotAutoris = (req, res, userObj, avaurl, active) => {
    res.render(`main`, {
        title: `${userObj[0].surname} ${userObj[0].name}`,
        regtype: `${userObj[0].regtype}`,
        name: `${userObj[0].name}`,
        surname: `${userObj[0].surname}`,
        email: `${userObj[0].email}`,
        facebookemail: `${userObj[0].facebookemail}`,
        googleemail: `${userObj[0].googleemail}`,
        instagramemail: `${userObj[0].instagramemail}`,
        githubemail: `${userObj[0].githubemail}`,
        linkedinemail: `${userObj[0].linkedinemail}`,
        twitteremail: `${userObj[0].twitteremail}`,
        birthday: `${userObj[0].birthday}`,
        phone: `${userObj[0].phone}`,
        message: `${userObj[0].message}`,
        country: `${userObj[0].country}`,
        town: `${userObj[0].town}`,
        profession: `${userObj[0].profession}`,
        education: `${userObj[0].education}`,
        ava: `${avaurl}`,
        avasettings: `${userObj[0].avasettings}`,
        permissAccess: `false`,
        permissEdit: `false`,
        permissionFriend: `false`,
        permissionidreq: `null`,
        permissName: ``,
        permissSurname: ``,
        permissUserid: ``,
        vskillsall: `${userObj[0].vskillsall}`,
        vskillsme:`${ userObj[0].vskillsme}`,
        vprojectsall: `${userObj[0].vprojectsall}`,
        vprojectsme: `${userObj[0].vprojectsme}`,
        vskillsalltop: `${userObj[0].vskillsalltop}`,
        vskillsmetop: `${userObj[0].vskillsmetop}`,
        vprojectsalltop: `${userObj[0].vprojectsalltop}`,
        vprojectsmetop: `${userObj[0].vprojectsmetop}`,
        vblogall: `${userObj[0].vblogall}`,
        vblogme: `${userObj[0].vblogme}`,
        vfriendme: `${userObj[0].vfriendme}`,
        vfriendall: `${userObj[0].vfriendall}`,
        activee: `${active}`,
    });
};

let renderuser = (req, res) => {
    let permissionAccess, permissionEdit, permissionisFriend, permissionFriend, getuserid = req.params['userid'];
    let clientToken = clienttoken(req, res);
    // get user information using usrid
    let sql = `SELECT U.*, S.* FROM users U INNER JOIN userssettings S on U.userid=S.userid WHERE U.userid = '${getuserid}'`;
    con.query(sql, function (err, result) {
        if (err) {
            $_log('err-db-req', err, 'error', res);                     
        } else {
            //if user not find, renderer not find user page 
            if (result == ''){
                let sql = `SELECT token, name, surname, userid, active FROM users WHERE token = '${clientToken}'`;
                con.query(sql, function (err, result) {
                    if (err) {                        
                        $_log('err-db-req', err, err, res);                      
                    } else {
                        //if the user is not found and is not authorized 
                        if (result == ''){
                            $_log('render-user', result[0]);                          
                            res.render(`nouser`, {
                                permissAccess: `false`,
                                permissEdit: `false`,
                                permissName: ``,
                                permissSurname: ``,
                                permissUserid: ``,
                                onindex:`${getuserid}`,
                                setsettings:`false`,
                                userid: ``,
                                activee: `${result[0].active}`,
                                title:``
                            });
                        } else {
                        //if the user is not found but is authorized    
                            $_log('render-user', result[0]);                          
                            res.render(`nouser`, {
                                permissAccess: `${(result[0].token === clientToken) ? true : false}`,
                                permissEdit: `${(result[0].token === clientToken) ? true : false}`,
                                permissName: `${result[0].name}`,
                                permissSurname: `${result[0].surname}`,
                                permissUserid: `${result[0].userid}`,
                                onindex:`${getuserid}`,
                                setsettings:`false`,
                                userid: ``,
                                activee: `${result[0].active}`,
                                title:``
                            });
                        }
                    }
                })            
            } else {
            //if a user is found, rendering the user's page    
                let userObj = result, activeStatus = result[0].active, avaurl;
                //get and set ava url    
                if ((/^http:/i.test(result[0].ava)) || (/^https:/i.test(result[0].ava))){
                    avaurl = `${result[0].ava}`;
                } else {
                    avaurl = ((result[0].ava === null) || (result[0].ava === '') || (result[0].ava === undefined)) ? `./img/ava_empty.jpg` : `./uploads/${result[0].ava}`;
                }              
                //select user information from DB
                let sql = `SELECT token, name, surname, userid, active FROM users WHERE token = '${clientToken}'`;
                con.query(sql, function (err, result) {
                    if (err) {
                        $_log('err-db-req', err, 'error', res);                     
                    } else {
                        //if the user is found but is not authorized                       
                        if (result == ''){
                            if (activeStatus === 'active') {
                                renderIfFoundAndNotAutoris(req, res, userObj, avaurl, result[0].active);
                            } else {
                                $_log('render-user', result[0]);                    
                                res.render(`nouser`, {
                                    permissAccess: `false`,
                                    permissEdit: `false`,
                                    permissName: ``,
                                    permissSurname: ``,
                                    permissUserid: ``,
                                    onindex:`${getuserid}`,
                                    setsettings:`false`,
                                    userid: ``,
                                    activee: `${result[0].active}`,
                                    title:``
                                })
                            }
                        } else {
                            let active = result[0].active;
                            //if the user is found and is autorized
                            if (result[0].active === 'active') {
                                createTableFriends(getuserid);
                                userObjAutoris = result;
                                //permission for edit
                                permissionEdit = ((result[0].token === clientToken) && (result[0].userid === req.params['userid'])) ? true : false;
                                //permission for access
                                permissionAccess = (result[0].token === clientToken) ? true : false;
                                //add to friends
                                permissionFriend = ((result[0].token === clientToken) && (result[0].userid !== req.params['userid'])) ? true : false;                              
                                //add visits to friend
                                if ((result[0].token === clientToken) && (result[0].userid !== req.params['userid'])) {
                                    let sqlgetvis = `SELECT friendvisit FROM friends_${result[0].userid} WHERE friendid = '${req.params['userid']}'`;
                                    let userid = result[0].userid;
                                    con.query(sqlgetvis, function (err, result) {
                                        if (err) {
                                            $_log('err-db-req', err, 'error', res);                    
                                        } else {
                                            if (result != ''){
                                                let sqlsetvis = `UPDATE friends_${userid} SET friendvisit = '${(+result[0].friendvisit) + 1}' WHERE userid = '${userid}' AND friendid = '${req.params["userid"]}'`;
                                                con.query(sqlsetvis, function (err, result) {
                                                    if (err) {$_log('err-db-req', err)}
                                                }); 
                                            }
                                        }
                                    }); 
                                }                               
                                let sqlsel = `SELECT U.userid, U.active, S.userid, S.friendid, S.friendstatus FROM users U INNER JOIN friends_${result[0].userid} S on U.userid=S.userid WHERE S.friendid = '${req.params['userid']}'`;
                                con.query(sqlsel, function (err, result) {
                                    if (err) {
                                        $_log('err-db-req', err, 'error', res);                     
                                    } else {
                                        $_log('result-friends', result)
                                        if (result  == ''){
                                            renderIfFoundAutorisFriend(req, res, userObjAutoris, userObj, avaurl, permissionAccess, permissionEdit, permissionFriend, false, null, active);
                                        } else {                                          
                                            permissionidreq = (result[0].friendstatus !== undefined) ? result[0].friendstatus : 'null';
                                            renderIfFoundAutorisFriend(req, res, userObjAutoris, userObj, avaurl, permissionAccess, permissionEdit, permissionFriend, true, permissionidreq, active);
                                        }
                                    }
                                }); 
                            } else if ((result[0].active !== 'active') && (result[0].userid !== req.params['userid'])){ 
                                //if the user is found and is autorized but not verify and not my page
                                renderIfNotVerify(req, res, result, userObj, avaurl, (result[0].token === clientToken) ? true : false, active);
                            } else if ((result[0].active !== 'active') && (result[0].userid === req.params['userid'])) {
                                //if the user is found and is autorized and it's my page but not verify 
                                $_log('render-user', result[0]);                  
                                res.render(`nouser`, {
                                    permissAccess: `${(result[0].token === clientToken) ? true : false}`,
                                    permissEdit: `${(result[0].token === clientToken) ? true :  false}`,
                                    permissionFriend: `false`,
                                    permissName: `${result[0].name}`,
                                    permissSurname: `${result[0].surname}`,
                                    permissUserid: `${result[0].userid}`,
                                    onindex:`nouser`,
                                    setsettings:`false`,
                                    activee: `${active}`,
                                    userid: `${result[0].userid}`,
                                    title:``
                                });
                            }                            
                        }                
                    }
                })
            }            
        }
    });    
};

module.exports = renderuser;