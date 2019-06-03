let SE = (() => {

    // function for get id node
    let $ = function(val) {
        return getid = document.getElementById(val);
    };

    // function for get object from (*.json) file
    let getLanguage = function(namefile) {
        var file = new XMLHttpRequest();
        file.onreadystatechange = function() {
            if (file.readyState === 4 && file.status == "200") {
                let data = JSON.parse(file.responseText);
                //set innerHTML
                for (let id in data) {if (SE.$(id)) {SE.$(id).innerHTML = data[id]}}
                //set placeholder
                for (let id in data.placeholder) {if (SE.$(id)) {SE.$(id).placeholder = data.placeholder[id]}}
                //set innerHTML to label
                for (let id in data.label) {if (SE.$(id)) {SE.$(id).innerHTML = data.label[id]}}
            }
        };
        file.open("GET", namefile, true);
        file.send(null);
    };    



    return {
        $, 
        getLanguage
    };
})();    