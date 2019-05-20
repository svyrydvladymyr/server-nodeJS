let http = require('http');
let fs = require('fs');
let path = require('path');
let switchPostRequest = require('./post-request/switch-post-request').switchPostRequest;
let chackPostRoutes = require('./post-request/switch-post-request').chackPostRoutes;

module.exports = {
    http,
    fs,
    path,
    switchPostRequest,
    chackPostRoutes   
}