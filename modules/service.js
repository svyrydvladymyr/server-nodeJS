let transliteration = require('transliteration.cyr');

//transliteration
let translit = word => {return transliteratedValue = transliteration.transliterate(word)};

//generate token
let token = length => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {result += characters.charAt(Math.floor(Math.random() * characters.length))}
    return result;
};

//check on true JSON
let trueJson = (data) => {
    let trueJson, errorParse;
    try {trueJson = JSON.parse(data.toString())} catch (error){errorParse = true}                         
    return errorParse ? false: trueJson;
};

module.exports = {
    translit,
    trueJson,
    token
};