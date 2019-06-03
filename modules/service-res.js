//system error
let errorServer = (error, res) => {
    res.writeHead(500, {'Content-Type':'text/plain'});
    res.end(error.message);
};

//custom error
let errorData = (error, res) => {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end(JSON.stringify(error));
};

//send response
let resOfPostRequest = (dateRes, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(dateRes));  
};

let resOfPostRequesttt = (dateRes, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(dateRes);  
};

module.exports = {
    resOfPostRequest,
    errorServer,
    errorData,
    resOfPostRequesttt
}