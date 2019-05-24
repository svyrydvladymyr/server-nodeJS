let errorServer = (error, res) => {
    res.writeHead(500, {'Content-Type':'text/plain'});
    res.end(error.message);
};

let errorData = (error, res) => {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end(error);
};

module.exports = {
    errorServer,
    errorData
};