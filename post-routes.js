let resOfPostRequest = (dateRes, res) => {
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify(dateRes));  
};

let info = reqPostUrl => console.log(`Request to: ${reqPostUrl}...`);

let addToDB = (reqPostUrl, data, res) => {
    info(reqPostUrl);    

    // console.log(data.toString());      
    let objReuest = data;
    console.log(objReuest);
    let i, o;
    i = objReuest.one + objReuest.one;    
    o = objReuest.two + objReuest.two;               
    let k = {"one":i,"two":o};     
    
    resOfPostRequest(k, res);
}

let updateDB = (reqPostUrl, data, res) => {
    info(reqPostUrl);

    // console.log(data.toString());      
    let objReuest = data;
    console.log(objReuest);
    let i, o;
    i = objReuest.one + objReuest.one;    
    o = objReuest.two + objReuest.two;               
    let k = {"one":i,"two":o};     
    
    resOfPostRequest(k, res);

}

module.exports = {
    addToDB,
    updateDB
}