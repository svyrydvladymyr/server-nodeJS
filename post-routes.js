let con = require('./db/connectToDB').con;
let {resOfPostRequest, trueJson, errorServer, errorData} = require('./service');

let switchPostRequest = (reqPostUrl, data, res) => {
    switch (reqPostUrl){
        case '/addToDB': addToDB(reqPostUrl, data, res); break;
        case '/updateDB': updateDB(reqPostUrl, data, res); break;
        default: console.log('Unknown request')}
};

let chackPostRoutes = (reqUrl) => {
    return ((reqUrl === '/addToDB') || 
            (reqUrl === '/updateDB')) ? true: false;
};

let addToDB = (reqPostUrl, data, res) => {
    console.log('Request to:', reqPostUrl);
    if (trueJson(data) !== false){
        let objReuest = trueJson(data);
        con.connect((err) => {
            let sql = `INSERT INTO customersOne (name, address) VALUES ('${objReuest.name}', '${objReuest.address}')`;
            con.query(sql, (err, result) => {
                resOfPostRequest(`Record inserted...`, res);
            });            
        });    
    } else {
        errorData(`Invalid JSON object..!`, res);
    } 
};



let updateDB = (reqPostUrl, data, res) => {
    console.log('Request to:', reqPostUrl);
    if (trueJson(data) !== false){
        let objReuest = trueJson(data);
        con.connect(function(err) {
            con.query(`SELECT name, address FROM customersOne WHERE name = '${objReuest.name}'`, function (err, result) {
                console.log(result);
                resOfPostRequest(result, res);
            });
          });    
    } else {
        errorData(`Invalid JSON object..!`, res);
    } 

}

module.exports = {
    switchPostRequest,
    chackPostRoutes,
    addToDB,
    updateDB
}