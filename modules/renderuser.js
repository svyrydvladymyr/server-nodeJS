let con = require('../db/connectToDB').con;
let {clienttoken} = require('./service');

let renderuser = (req, res) => {
    let permissionAccess, permissionEdit, getuserid;
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
                (result[0].ava === null) ? avaurl = `./img/ava_empty.jpg` : avaurl = `./uploads/${result[0].ava}`;
                //select user information from DB
                let sql = `SELECT token, name, surname, userid, active FROM users WHERE token = '${clientToken}'`;
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log("err", err);
                        res.send({"error":err});
                    } else {
                        //if the user is found but is not authorized                       
                        if (result == ''){
                            permissionEdit = false;         
                            permissionAccess = false;
                            //render user page and send variables   
                            console.log('--render-user---->> ', result[0]);                     
                            res.render(`main`, {
                                title: `${userObj[0].surname} ${userObj[0].name}`,
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
                            });
                        } else {
                            //if the user is found and is autorized
                            if (result[0].active === 'active') {
                                //permission for edit
                                ((result[0].token === clientToken) && (result[0].userid === req.params['userid'])) ? 
                                permissionEdit = true : 
                                permissionEdit = false;
                                //permission for access
                                (result[0].token === clientToken) ? 
                                permissionAccess = true : 
                                permissionAccess = false;
                                //render user page and send variables  
                                console.log('--render-user---->> ', result[0]);        
                                res.render(`main`, {
                                    title: `${userObj[0].surname} ${userObj[0].name}`,
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
                                });
                            } else if ((result[0].active !== 'active') && (result[0].userid !== req.params['userid'])){ 
                                permissionEdit = false;         
                                (result[0].token === clientToken) ? 
                                permissionAccess = true : 
                                permissionAccess = false;
                                //render user page and send variables   
                                console.log('--render-user---->> ', result[0]);                     
                                res.render(`main`, {
                                    title: `${userObj[0].surname} ${userObj[0].name}`,
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
                                });
                            } else if ((result[0].active !== 'active') && (result[0].userid === req.params['userid'])) {
                                (result[0].token === clientToken) ? permissionAccess = true : permissionAccess = false;
                                (result[0].token === clientToken) ? permissionEdit = true : permissionEdit = false;
                                console.log('--render-user---->> ', result[0]);                     
                                res.render(`nouser`, {
                                    permissAccess: `${permissionAccess}`,
                                    permissEdit: `${permissionEdit}`,
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