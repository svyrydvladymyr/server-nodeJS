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
    database: "heroku_c286770ec73016d"
  };


// let con, db_config = {
//     driver: "mysql",
//     host: "localhost",
//     user: "root",
//     password: "",
//     // password: "kalcifer1988",
//     charset: 'utf8',
//     collation: 'utf8_unicode_ci',
//     prefix: '',
//     strict: false,
//     database: "kalcifer33333"
//   };

let dbName = db_config.database;

con = mysql.createConnection(db_config);
con.connect((err) => {
    if (err) {
      console.log("err-connect-to-db", err);
      res.send(err);       
    }
  }
);  

setInterval(function () {
    con.query('SELECT 1');
}, 10000);

module.exports = {
    con,
    dbName
};  
