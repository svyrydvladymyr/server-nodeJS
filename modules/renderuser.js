let con = require('../db/connectToDB').con;
let {clienttoken, createTableFriends} = require('./service');

let renderIfNotVerify = (req, res, result, userObj, avaurl, permissionAccess) => {
    let permissionEdit, permissionFriend;
    permissionEdit = false;  
    permissionFriend = false;
    console.log('--render-user---->> ', result[0]);                     
    res.render(`main`, {
        title: `${userObj[0].surname} ${userObj[0].name}`,
        regtype: `${userObj[0].regtype}`,
        name: `${userObj[0].name}`,
        surname: `${userObj[0].surname}`,
        email: `${userObj[0].email}`,
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
        vfriendall: `${userObj[0].vfriendall}`
    });
};

let renderIfFoundAutorisFriend = (req, res, result, userObj, avaurl, permissionAccess, permissionEdit, permissionFriend, permissionisFriend, permissionidreq) => {
    console.log('--render-user---->> ', result[0]);  
    res.render(`main`, {
        title: `${userObj[0].surname} ${userObj[0].name}`,
        regtype: `${userObj[0].regtype}`,
        name: `${userObj[0].name}`,
        surname: `${userObj[0].surname}`,
        email: `${userObj[0].email}`,
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
    });
};

let renderIfFoundAndNotAutoris = (req, res, userObj, avaurl) => {
    permissionEdit = false;         
    permissionAccess = false;
    permissionFriend = false;
    res.render(`main`, {
        title: `${userObj[0].surname} ${userObj[0].name}`,
        regtype: `${userObj[0].regtype}`,
        name: `${userObj[0].name}`,
        surname: `${userObj[0].surname}`,
        email: `${userObj[0].email}`,
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
    });
};

let renderuser = (req, res) => {
    let permissionAccess, permissionEdit, permissionisFriend, permissionFriend, getuserid;
    //get variables
    getuserid = req.params['userid'];
    let clientToken = clienttoken(req, res);
    // get user information using usrid
    let sql = `SELECT U.*, S.* FROM users U INNER JOIN userssettings S on U.userid=S.userid WHERE U.userid = '${getuserid}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            //if user not find, renderer not find user page 
            if (result == ''){
                let sql = `SELECT token, name, surname, userid, active FROM users WHERE token = '${clientToken}'`;
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log("err", err);
                        res.send({"error":err});
                    } else {
                        //if the user is not found and is not authorized 
                        if (result == ''){
                            permissionAccess = false;
                            permissionEdit = false;
                            permissionFriend = false;
                            console.log('--render-user---->> ', result[0]);                            
                            res.render(`nouser`, {
                                permissAccess: `${permissionAccess}`,
                                permissEdit: `${permissionEdit}`,
                                permissName: ``,
                                permissSurname: ``,
                                permissUserid: ``,
                                onindex:`${getuserid}`,
                                userid: ``,
                                activee: `active`,
                                title:``
                            });
                        } else {
                        //if the user is not found but is authorized    
                            (result[0].token === clientToken) ? permissionAccess = true : permissionAccess = false;
                            (result[0].token === clientToken) ? permissionEdit = true : permissionEdit = false;
                            permissionFriend = false;
                            console.log('--render-user---->> ', result[0]);                     
                            res.render(`nouser`, {
                                permissAccess: `${permissionAccess}`,
                                permissEdit: `${permissionEdit}`,
                                permissName: `${result[0].name}`,
                                permissSurname: `${result[0].surname}`,
                                permissUserid: `${result[0].userid}`,
                                onindex:`${getuserid}`,
                                userid: ``,
                                activee: `active`,
                                title:``
                            });
                        }
                    }
                })            
            } else {
            //if a user is found, rendering the user's page    
                let userObj = result;
                //get and set ava url    
                let avaurl;
                let reg = /^http:/i;
                let reg2 = /^https:/i;
                if ((reg.test(result[0].ava)) || (reg2.test(result[0].ava))){
                    avaurl = `${result[0].ava}`;
                } else {
                    avaurl = ((result[0].ava === null) || (result[0].ava === '') || (result[0].ava === undefined)) ? `./img/ava_empty.jpg` : `./uploads/${result[0].ava}`;
                }
                //select user information from DB
                let sql = `SELECT token, name, surname, userid, active FROM users WHERE token = '${clientToken}'`;
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log("err", err);
                        res.send({"error":err});
                    } else {
                        //if the user is found but is not authorized                       
                        if (result == ''){
                            createTableFriends(getuserid);
                            renderIfFoundAndNotAutoris(req, res, userObj, avaurl);
                        } else {
                            //if the user is found and is autorized
                            if (result[0].active === 'active') {
                                createTableFriends(getuserid);
                                userObjAutoris = result;
                                //permission for edit
                                ((result[0].token === clientToken) && (result[0].userid === req.params['userid'])) ? 
                                permissionEdit = true : 
                                permissionEdit = false;
                                //permission for access
                                (result[0].token === clientToken) ? 
                                permissionAccess = true : 
                                permissionAccess = false;
                                //add to friends
                                ((result[0].token === clientToken) && (result[0].userid !== req.params['userid'])) ?
                                permissionFriend = true :
                                permissionFriend = false;                                
                                //add visits to friend
                                if ((result[0].token === clientToken) && (result[0].userid !== req.params['userid'])) {
                                    let sqlgetvis = `SELECT friendvisit FROM friends_${result[0].userid} WHERE friendid = '${req.params['userid']}'`;
                                    let userid = result[0].userid;
                                    let paramuserid = req.params['userid'];
                                    con.query(sqlgetvis, function (err, result) {
                                        if (err) {
                                            console.log("err", err);
                                            res.send({"error":err});
                                        } else {
                                            if (result != ''){
                                                let newvisit = (+result[0].friendvisit) + 1;
                                                let sqlsetvis = `UPDATE friends_${userid} SET friendvisit = '${newvisit}' WHERE userid = '${userid}' AND friendid = '${paramuserid}'`;
                                                con.query(sqlsetvis, function (err, result) {
                                                    if (err) {console.log("err", err)}
                                                }); 
                                            }
                                        }
                                    }); 
                                }                               
                                let sqlsel = `SELECT U.userid, S.userid, S.friendid, S.friendstatus FROM users U INNER JOIN friends_${result[0].userid} S on U.userid=S.userid WHERE S.friendid = '${req.params['userid']}'`;
                                con.query(sqlsel, function (err, result) {
                                    if (err) {
                                        console.log("err", err);
                                        res.send({"error":err});
                                    } else {
                                        console.log("--result-friends----->> ", result);
                                        if (result  == ''){
                                            permissionisFriend = false;
                                            permissionidreq = 'null';
                                            renderIfFoundAutorisFriend(req, res, userObjAutoris, userObj, avaurl, permissionAccess, permissionEdit, permissionFriend, permissionisFriend, permissionidreq);
                                        } else {
                                            permissionisFriend = true;
                                            result[0].friendstatus !== undefined ? permissionidreq = result[0].friendstatus : permissionidreq = 'null';
                                            renderIfFoundAutorisFriend(req, res, userObjAutoris, userObj, avaurl, permissionAccess, permissionEdit, permissionFriend, permissionisFriend, permissionidreq);
                                        }
                                    }
                                }); 
                            } else if ((result[0].active !== 'active') && (result[0].userid !== req.params['userid'])){ 
                                //if the user is found and is autorized but not verify and not my page
                                (result[0].token === clientToken) ? permissionAccess = true : permissionAccess = false;
                                createTableFriends(getuserid);
                                renderIfNotVerify(req, res, result, userObj, avaurl, permissionAccess);
                            } else if ((result[0].active !== 'active') && (result[0].userid === req.params['userid'])) {
                                //if the user is found and is autorized and its my page but not verify 
                                (result[0].token === clientToken) ? permissionAccess = true : permissionAccess = false;
                                (result[0].token === clientToken) ? permissionEdit = true : permissionEdit = false;
                                permissionFriend = false;
                                console.log('--render-user---->> ', result[0]);                     
                                res.render(`nouser`, {
                                    permissAccess: `${permissionAccess}`,
                                    permissEdit: `${permissionEdit}`,
                                    permissionFriend: `${permissionFriend}`,
                                    permissName: `${result[0].name}`,
                                    permissSurname: `${result[0].surname}`,
                                    permissUserid: `${result[0].userid}`,
                                    onindex:`${getuserid}`,
                                    activee: `${result[0].active}`,
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