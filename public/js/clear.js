let CLEAR = (function(){
    //clear registration prototipe
    let clearRegProto = function(){
        regPrototype.login = "";
        regPrototype.password = "";
        regPrototype.userid = "";
        regPrototype.name = "";
        regPrototype.surname = "";
        regPrototype.email = "";
        regPrototype.ava = "";
        regPrototype.avasettings = "";
        regPrototype.birthday = "";
        regPrototype.phone = "";
        regPrototype.message = "";
        regPrototype.country = "";
        regPrototype.town = "";
        regPrototype.profession = "";
        regPrototype.registrdata = "";
    };

    return {
        clearRegProto
    };
})();