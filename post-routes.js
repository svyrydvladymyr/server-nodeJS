let con = require('./db/connectToDB').con;
let {resOfPostRequest, errorData} = require('./service');

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

module.exports = {
    addToDB,
    updateDB
}