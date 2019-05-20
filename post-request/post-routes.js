let info = reqPostUrl => console.log(`Request to: ${reqPostUrl}...`);

let addToDB = (reqPostUrl, data, res) => {
    info(reqPostUrl);    

    console.log(data.toString());      
    let objReuest = JSON.parse(data.toString());
    console.log(objReuest);
    let i, o;
    i = objReuest.one + objReuest.one;    
    o = objReuest.two + objReuest.two;               
    let k = {"one":i,"two":o};     
    
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify(k));  
}



let updateDB = (reqPostUrl, data, res) => {
    info(reqPostUrl);

    console.log(data.toString());      
    let objReuest = JSON.parse(data.toString());
    console.log(objReuest);
    let i, o;
    i = objReuest.one + objReuest.one;    
    o = objReuest.two + objReuest.two;               
    let k = {"one":i,"two":o};     
    
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify(k));  
}

module.exports = {
    addToDB,
    updateDB
}