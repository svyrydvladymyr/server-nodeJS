let http = require('http');
let path = require('path');
let fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let multer  = require('multer')
let {translit, token, log} = require('./modules/service');
let {registrationUsers} = require('./modules/post-routes');




app.use(log);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());  

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
          registrationUsers(req, res);
        }
    });
  });


app.listen(process.env.PORT || 4000, function(){console.log('Server is running...')});










// http.createServer((req, res) => {
//     let typeFile = mime.lookup(req.url);
//     console.log(`${req.method} --> ${req.url} --- ${typeFile}`);   
//     switch (req.method) {
//         case 'GET':    
//                 let stream = fs.createReadStream(path.join(__dirname, 'public', (req.url == '/') ? 'index.html': req.url));
//                 stream.on('error', error => errorServer(error, res));
//                 res.writeHead(200, {'Content-Type': (req.url == '/') ? 'text/html': typeFile});
//                 stream.pipe(res); 
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
