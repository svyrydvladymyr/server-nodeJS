let {http, fs, path} = require('./export-moduls');

let errorServer = function(error, res){
    res.writeHead(500, {'Content-Type':'text/plain'});
    res.end(error.message);
};

let routs = function(reqUrl, contType, res){
    const stream = fs.createReadStream(path.join(__dirname, 'page', reqUrl));
    stream.on('error', error => errorServer(error, res));
    res.writeHead(200, {'Content-Type': contType});
    stream.pipe(res);
}

http.createServer((req, res) => {
    console.log(req.url);  
    console.log(req.method);
    switch (req.method) {
        case 'GET':
            if (req.url === '/'){
                routs("index.html", "text/html", res);
            } else if (req.url.match(/.css$/)){
                routs(req.url, "text/css", res);
            }  else if (req.url.match(/.js$/)){
                routs(req.url, "text/js", res);
            } else if (req.url.match(/.json$/)){
                routs(req.url, "text/json", res);
            } else if (req.url.match(/.png$/)){
                routs(req.url, "image/png", res);
            } else if (req.url.match(/.jpg$/)){
                routs(req.url, "image/jpg", res);
            } 
        break; 
        case 'POST':
            let obj = '';
            req.on('data', data => obj += data);
            req.on('error', error => errorServer(error, res));            
            req.on('end', () => {
                
                
                console.log(obj.toString());      
                let objReuest = JSON.parse(obj.toString());
                console.log(objReuest);

                let i, o;
                i = objReuest.one + objReuest.one;    
                o = objReuest.two + objReuest.two;               
                let k = {"one":i,"two":o};  
                
                
                res.writeHead(200, {'Content-Type': 'text/json'});
                res.end(JSON.stringify(k));       
            });      
        break;   
    }  
    
}).listen(8080, () => {console.log('Server working...')});
