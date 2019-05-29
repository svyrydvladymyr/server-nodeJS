let con = require('./db/connectToDB').con;
let {resOfPostRequest, errorData} = require('./service');

let addToDB = (objReuest, res) => {
    let sql = `INSERT INTO customersOne (name, address) VALUES ('${objReuest.name}', '${objReuest.address}')`;
    con.query(sql, (err, result) => {
        if (err) {errorData(err.sqlMessage, res)
        } else {resOfPostRequest(`Record inserted...with ID ${result.insertId}`, res);               
    }
    });
};

let updateDB = (objReuest, res) => {
    con.query(`SELECT name, address FROM customersOne WHERE name = '${objReuest.name}'`, function (err, result) {
        if (err) {errorData(err.sqlMessage, res);
    } else { 
        resOfPostRequest(result, res);
    }
    });            
};

module.exports = {
    addToDB,
    updateDB
}