let http = require('http');
let path = require('path');
let fs = require('fs');
let mime = require('mime-types');
let {chackPostRoutes, trueJson, errorServer, errorData} = require('./service');
let {addToDB, updateDB} = require('./post-routes');

http.createServer((req, res) => {
    let typeFile = mime.lookup(req.url);
    console.log(`${req.method} --> ${req.url} --- ${typeFile}`);   
    switch (req.method) {
        case 'GET':
            let stream = fs.createReadStream(path.join(__dirname, public, (req.url == '/') ? 'index.html': req.url));
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
                    req.on('end', () =>{((obj, res) => {
                        if (trueJson(obj) !== false){
                            switch (req.url){
                                case '/addToDB': addToDB(trueJson(obj), res); break;
                                case '/updateDB': updateDB(trueJson(obj), res); break;}
                        } else {errorData(`Invalid JSON object..!`, res)}})(obj, res)}); 
                } else {errorData(`ERROR CONNECTION..! --> ${res.statusCode} -- ${res.statusMessage}`, res)};
            } else if (req.url === '/') {errorData('Empty POST routes..!', res);
            } else {errorData('Unknown POST routes..!', res)};   
        break;   
    }}).listen(process.env.PORT || 4000, function(){console.log('Server is running...')});
