let transliteration = require('transliteration.cyr');
let Cookies = require('cookies');

//transliteration
let translit = word => {return transliteratedValue = transliteration.transliterate(word)};

//generate token
let token = length => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {result += characters.charAt(Math.floor(Math.random() * characters.length))}
    return result;
};

//client token
let clienttoken = (req, res) => {
    let cookies, clientToken;
    cookies = new Cookies(req, res, {"keys":['volodymyr']});
    clientToken = cookies.get('sessionisdd', {signed:true});
    console.log("--client-token--", clientToken);
    return clientToken;
};


module.exports = {
    translit,
    token,
    clienttoken
};