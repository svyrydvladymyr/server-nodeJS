let {http, fs, path, switchPostRequest, chackPostRoutes} = require('./export-moduls');

let errorServer = (error, res) => {
    res.writeHead(500, {'Content-Type':'text/plain'});
    res.end(error.message);
};

let errorData = (error, res) => {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end(error);
};

let routs = (reqUrl, contType, res) => {
    const stream = fs.createReadStream(path.join(__dirname, 'public', reqUrl));
    stream.on('error', error => errorServer(error, res));
    res.writeHead(200, {'Content-Type': contType});
    stream.pipe(res);
}

http.createServer((req, res) => {
    console.log(req.method, req.url);  
    switch (req.method) {
        case 'GET':
            (req.url === '/') ? routs("index.html", "text/html", res):
            (req.url.match(/.css$/)) ? routs(req.url, "text/css", res):
            (req.url.match(/.js$/)) ? routs(req.url, "text/js", res):
            (req.url.match(/.json$/)) ? routs(req.url, "text/json", res):
            (req.url.match(/.png$/)) ? routs(req.url, "image/png", res):
            (req.url.match(/.jpg$/)) ? routs(req.url, "image/jpg", res):
            errorData(`Unknown format file for server "KALCIFER"..!`, res);
             
        break; 
        case 'POST':
            if (chackPostRoutes(req.url)){
                let obj = '';
                req.on('data', data => obj += data);
                req.on('error', error => errorServer(error, res));            
                req.on('end', () => {switchPostRequest(req.url, obj, res)}); 
            } else if (req.url === '/') {
                errorData('Empty POST routes..!', res);
            } else {
                errorData('Unknown POST routes..!', res);
            }    
        break;   
    }}).listen(8080, () => {console.log('Server working...')});
