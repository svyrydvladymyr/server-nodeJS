let {addToDB, updateDB} = require('./post-routes.js');

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

module.exports = {
    switchPostRequest,
    chackPostRoutes
};