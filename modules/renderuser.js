let con = require('../db/connectToDB').con;

let renderuser = (req, res, next) => {
    let getuserid = req.params['userid'];
    console.log(getuserid);

    let sql = `SELECT * FROM users WHERE userid = '${getuserid}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log("err", err);
            res.send({"error":err});
        } else {
            if (result == ''){
                console.log("empty", result);
                next();
            } else {
                console.log("good", result);
                let avaurl, avaset;
                if (result[0].ava === null){
                    avaurl = `./img/ava_empty.jpg`;
                }else{
                    avaurl = `./uploads/${result[0].ava}`;
                }
                res.render(`main`, {
                    title: `${result[0].surname} ${result[0].name}`,
                    name: `${result[0].name}`,
                    surname: `${result[0].surname}`,
                    email: `${result[0].email}`,
                    birthday: `${result[0].birthday}`,
                    phone: `${result[0].phone}`,
                    message: `${result[0].message}`,
                    country: `${result[0].country}`,
                    town: `${result[0].town}`,
                    profession: `${result[0].profession}`,
                    ava: `${avaurl}`,
                    avasettings: `${result[0].avasettings}`
                });
            }
        }
    });

    
}




module.exports = renderuser;