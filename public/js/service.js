let SE = (() => {

    // function for get id node
    let $ = function(val) {
        return getid = document.getElementById(val);
    };

    // function for get id node
    let redirect = route => window.location.href = route;

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
    
    //clone phone number
    let clonePhoneNumber = () => {
        let phoneNum = SE.$('reg-input-tel').value;
        if ((phoneNum !== '') && (phoneNum.length == 10) && (/^[0-9]+$/g.test(phoneNum))){
            SE.$('reg-input-message_cod').value = SE.$('reg-input-tel_cod').value;
            SE.$('reg-input-message').value = SE.$('reg-input-tel').value;
        }        
    }; 



    return {
        $, 
        getLanguage,
        redirect,
        clonePhoneNumber
    };
})();    