let resOfPostRequest = (dateRes, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(dateRes));  
};

let errorServer = (error, res) => {
    res.writeHead(500, {'Content-Type':'text/plain'});
    res.end(error.message);
};

let errorData = (error, res) => {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end(JSON.stringify(error));
};

let trueJson = (data) => {
    let trueJson, errorParse;
    try {trueJson = JSON.parse(data.toString())} catch (error){errorParse = true}                         
    return errorParse ? false: trueJson;
};

module.exports = {
    resOfPostRequest,
    trueJson,
    errorServer,
    errorData
};