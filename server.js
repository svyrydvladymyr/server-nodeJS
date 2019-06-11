let http = require('http');
let path = require('path');
let fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let multer  = require('multer')
// let mime = require('mime-types');
// let {errorServer, errorData} = require('./modules/service-res');
let {trueJson, translit, token, log} = require('./modules/service');
let {addToDB, addToDBB, updateDB, getButton} = require('./modules/post-routes');




app.use(log);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());  

app.post('/addToDB', addToDBB);

app.post('/registrationUser', (req, res) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {cb(null, __dirname+"/uploads")},
        filename: (req, file, cb) => {
          if (req.file === undefined){
            cb(null, token(10) +'_'+  file.originalname);
          }
        }})       
    let upload = multer({ storage: storage }).single('file');
    upload(req, res, (err) => {
        if (err) {
            console.log("err", err);
            res.send({"res":"error"});
        } else {
            console.log("files", req.file);
            // console.log("files", req.file.originalname);
            console.log("body", JSON.parse(req.body.objreg));
            let xx = JSON.parse(req.body.objreg);
            console.log("body--login", xx.login);
            res.send({"res":"sours"});
        }
    })
  })

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
