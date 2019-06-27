let con = require('../db/connectToDB').con;
let Cookies = require('cookies');

let renderuser = (req, res) => {
    let permissionAccess, permissionEdit, clientToken, cookies, getuserid;
    //get variables
    getuserid = req.params['userid'];
    cookies = new Cookies(req, res, {"keys":['volodymyr']});
    clientToken = cookies.get('sessionisdd', {signed:true}); 
    // get user information using usrid
    let sql = `SELECT U.*, S.* FROM users U INNER JOIN userssettings S on U.userid=S.userid WHERE U.userid = '${getuserid}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            //if user not find, renderer not find user page 
            if (result == ''){
                let sql = `SELECT token, name, surname, userid FROM users WHERE token = '${clientToken}'`;
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log("err", err);
                        res.send({"error":err});
                    } else {
                        //if the user is not found and is not authorized 
                        if (result == ''){
                            permissionAccess = false;
                            permissionEdit = false;
                            console.log('--render-user--', result[0]);                            
                            res.render(`nouser`, {
                                permissAccess: `${permissionAccess}`,
                                permissEdit: `${permissionEdit}`,
                                permissName: ``,
                                permissSurname: ``,
                                permissUserid: ``,
                                onindex:`${getuserid}`,
                                title:``
                            });
                        } else {
                        //if the user is not found but is authorized    
                            (result[0].token === clientToken) ? permissionAccess = true : permissionAccess = false;
                            (result[0].token === clientToken) ? permissionEdit = true : permissionEdit = false;
                            console.log('--render-user--', result[0]);                     
                            res.render(`nouser`, {
                                permissAccess: `${permissionAccess}`,
                                permissEdit: `${permissionEdit}`,
                                permissName: `${result[0].name}`,
                                permissSurname: `${result[0].surname}`,
                                permissUserid: `${result[0].userid}`,
                                onindex:`${getuserid}`,
                                title:``
                            });
                        }
                    }
                })            
            } else {
            //if a user is found, rendering the user's page    
                console.log("good", result);
                let userObj = result;
                //get and set ava url    
                let avaurl;
                (result[0].ava === null) ? avaurl = `./img/ava_empty.jpg` : avaurl = `./uploads/${result[0].ava}`;
                //select user information from DB
                let sql = `SELECT token, name, surname, userid FROM users WHERE token = '${clientToken}'`;
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
                            console.log('--render-user--', result[0]);                     
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
                                ava: `${avaurl}`,
                                avasettings: `${userObj[0].avasettings}`,
                                permissAccess: `${permissionAccess}`,
                                permissEdit: `${permissionEdit}`,
                                permissName: ``,
                                permissSurname: ``,
                                permissUserid: ``,
                                vskillsall: `${userObj[0].vskillsall}`,
                                vskillsme: `${userObj[0].vskillsme}`,
                            });
                        } else {
                            //if the user is found and is autorized
                            //permission for edit
                            ((result[0].token === clientToken) && (result[0].userid === req.params['userid'])) ? 
                            permissionEdit = true : 
                            permissionEdit = false;
                            //permission for access
                            (result[0].token === clientToken) ? 
                            permissionAccess = true : 
                            permissionAccess = false;
                            //render user page and send variables  
                            console.log('--render-user--', result[0]);        
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
                                ava: `${avaurl}`,
                                avasettings: `${userObj[0].avasettings}`,
                                permissAccess: `${permissionAccess}`,
                                permissEdit: `${permissionEdit}`,
                                permissName: `${result[0].name}`,
                                permissSurname: `${result[0].surname}`,
                                permissUserid: `${result[0].userid}`,
                                vskillsall: `${userObj[0].vskillsall}`,
                                vskillsme: `${userObj[0].vskillsme}`,
                            });
                        }                
                    }
                })
            }            
        }
    });    
};

module.exports = renderuser;