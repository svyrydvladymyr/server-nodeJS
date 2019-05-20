// function for get id node
var getID = function(val) {
    var getid = document.getElementById(val);
    return getid;
};

// function for get class node
var getCL = function(val) {
    var getclass = document.getElementsByClassName(val);
    return getclass;
};

// function for get query selector
var getQS = function(val) {
    var getquerySelector = document.querySelector(val);
    return getquerySelector;
};

// function for get tag name
var getTAG = function(val) {
    var getclass = document.getElementsByTagName(val);
    return getclass;
};

// function for adding node 
var createN = function(noda, val) {
    var elem = document.createElement(noda);
    elem.innerHTML = val;
    return elem;
};

// function for adding node with atributes
var createNA  = function(noda, atr, val) {
    var elem = document.createElement(noda);
    var atribute = document.createAttribute(atr);
    atribute.value = val;
    elem.setAttributeNode(atribute);    
    return elem;
};

// function for adding atributes
var createA = function(atr, val) {
    var elem = document.createAttribute(atr);
    elem.value = val;
    return elem;
};








