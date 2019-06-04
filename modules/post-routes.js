let con = require('../db/connectToDB').con;
let {resOfPostRequest, errorData} = require('./service-res');

let addToDB = (objRequest, res) => {
    let sql = `INSERT INTO customersOne (name, address) VALUES ('${objRequest.name}', '${objRequest.address}')`;
    con.query(sql, (err, result) => {
        err ? errorData(err.sqlMessage, res) : resOfPostRequest(`Record inserted... status - ${result.protocol41}`, res)
    });
};

let updateDB = (objRequest, res) => {
    con.query(`SELECT name, address FROM customersOne WHERE name = '${objRequest.name}'`, function (err, result) {
        err ? errorData(err.sqlMessage, res) : resOfPostRequest(result, res)
    });            
};


let addToDBB = (req, res) => {
    
    console.log(req.body);
    res.send(req.body);
    // resOfPostRequest(`Record inserted... status - ${result.protocol41}`, res)

};


module.exports = {
    addToDB,
    updateDB,
    addToDBB
    
}