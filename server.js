let http = require('http');
let path = require('path');
let fs = require('fs');
let express = require('express');
let app = express();
let mime = require('mime-types');
let {errorServer, errorData} = require('./modules/service-res');
let {trueJson, translit, token} = require('./modules/service');
let {addToDB, updateDB, getButton} = require('./modules/post-routes');


app.use(express.static(__dirname + '/public'));
app.use('/registration', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
    <p onclick="redirect('/')">ghfhfgh</p>
    <script>
        let redirect = route => window.location.href = route;
    </script>
    </body>
    </html>`
    );                 
});

app.listen(process.env.PORT || 4000, function(){console.log('Server is running...')});










// http.createServer((req, res) => {
//     let typeFile = mime.lookup(req.url);
//     console.log(`${req.method} --> ${req.url} --- ${typeFile}`);   
//     switch (req.method) {
//         case 'GET':    
//             if (req.url == '/registration') {
//                 res.writeHead(200, {'Content-Type': 'text/html'});
//                 res.end(`<!DOCTYPE html>
//                 <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//                     <title>Document</title>
//                 </head>
//                 <body>
//                 <p onclick = "SE.redirect('/')">ghfhfgh</p>
//                 <script src="./js/service.js"></script>
//                 </body>
//                 </html>`
//                 ); 
//             } else {
//                 let stream = fs.createReadStream(path.join(__dirname, 'public', (req.url == '/') ? 'index.html': req.url));
//                 stream.on('error', error => errorServer(error, res));
//                 res.writeHead(200, {'Content-Type': (req.url == '/') ? 'text/html': typeFile});
//                 stream.pipe(res); 
//             } 
//         break; 
//         case 'POST': 
//             if (res.statusCode === 200) {
//                 let obj = '';
//                 req.on('data', data => obj += data);                    
//                 req.on('error', error => errorServer(error, res));    
//                 req.on('end', () =>{((obj, res) => {
//                     if (trueJson(obj) !== false){
//                         switch (req.url){
//                             case '/addToDB': addToDB(trueJson(obj), res); break;
//                             case '/updateDB': updateDB(trueJson(obj), res); break;
//                             case '/getButton': getButton(trueJson(obj), res); break;}
//                     } else {errorData(`Invalid JSON object..!`, res)}})(obj, res)}); 
//             } else {errorData(`ERROR CONNECTION..! --> ${res.statusCode} -- ${res.statusMessage}`, res)}             
//         break;   
//     }}).listen(process.env.PORT || 4000, function(){console.log('Server is running...')});
