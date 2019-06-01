let con = require('./db/connectToDB').con;
let {resOfPostRequest, resOfPostRequesttt, errorData} = require('./service');
let buttonTempl = require('./modules/templ.js');

console.log(buttonTempl);


let addToDB = (objReuest, res) => {
    let sql = `INSERT INTO customersOne (name, address) VALUES ('${objReuest.name}', '${objReuest.address}')`;
    con.query(sql, (err, result) => {
        err ? errorData(err.sqlMessage, res) : resOfPostRequest(`Record inserted... status - ${result.protocol41}`, res)
    });
};

let updateDB = (objReuest, res) => {
    con.query(`SELECT name, address FROM customersOne WHERE name = '${objReuest.name}'`, function (err, result) {
        err ? errorData(err.sqlMessage, res) : resOfPostRequest(result, res)
    });            
};

let getButton = (obj, res) => {
    console.log(obj);
    console.log(buttonTempl);

    resOfPostRequesttt(buttonTempl, res);             
};

module.exports = {
    addToDB,
    updateDB,
    getButton
}