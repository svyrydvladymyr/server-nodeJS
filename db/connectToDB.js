let mysql = require('mysql');
let con, db_config = {
    driver: "mysql",
    host: "eu-cdbr-west-02.cleardb.net",
    user: "bb3b6857c7c94b",
    password: "abe128b6",
    charset: 'utf8',
    collation: 'utf8_unicode_ci',
    prefix: '',
    strict: false,
    // database: "node"
  };

 // mysql://bb3b6857c7c94b:abe128b6@eu-cdbr-west-02.cleardb.net/heroku_c286770ec73016d?reconnect=true
 // postgres://lcyrjkyvuyyeqk:7b4b8a702b6596a36f56c7d9b2cc906964e5f8c4569d79a09aa27a3ca845315b@ec2-54-246-92-116.eu-west-1.compute.amazonaws.com:5432/detpqvvq0k2cer
 // mysql://g3pc8w0ydjshwrd8:io6rgb1zmg2aqwq7@zwgaqwfn759tj79r.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/ma5s3ctvqvwksrt0
con = mysql.createConnection(db_config);
con.connect((err) => {
    if (err) throw errorData(err, res);
});    

setInterval(function () {
    con.query('SELECT 1');
}, 10000);

module.exports = {
    con
};  
