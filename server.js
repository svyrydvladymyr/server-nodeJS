let http = require('http');
let path = require('path');
let fs = require('fs');
let mime = require('mime-types');
let {switchPostRequest, chackPostRoutes} = require('./service');
let {errorServer, errorData} = require('./error');

http.createServer((req, res) => {
    let typeFile = mime.lookup(req.url);
    console.log(`${req.method} --> ${req.url} --- ${typeFile}`);   
    switch (req.method) {
        case 'GET':
            let stream = fs.createReadStream(path.join(__dirname, 'public', (req.url == '/') ? 'index.html': req.url));
            stream.on('error', error => errorServer(error, res));
            res.writeHead(200, {'Content-Type': (req.url == '/') ? 'text/html': typeFile});
            stream.pipe(res); 
        break; 
        case 'POST':
            if (chackPostRoutes(req.url)){
                if (res.statusCode === 200) {
                    let obj = '';
                    req.on('data', data => obj += data);
                    req.on('error', error => errorServer(error, res));            
                    req.on('end', () => {switchPostRequest(req.url, obj, res)}); 
                } else {errorData(`ERROR CONNECTION..! _ ${res.statusCode} - ${res.statusMessage}`, res)}
            } else if (req.url === '/') {errorData('Empty POST routes..!', res)} else {errorData('Unknown POST routes..!', res)}    
        break;   
    }}).listen(8080, () => {console.log('Server working...')});
