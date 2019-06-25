let CLEAR = (function(){
    //clear registration prototipe
    let clearRegProto = function(){
        regProto.prototype.reglogin = "";
        regProto.prototype.regloginup = "";
        regProto.prototype.regpassword = "";
        regProto.prototype.regoldpassword = "";
        regProto.prototype.userid = "";
        regProto.prototype.regname = "";
        regProto.prototype.regsurname = "";
        regProto.prototype.regemail = "";
        regProto.prototype.ava = "";
        regProto.prototype.avasettings = "";
        regProto.prototype.regbirthday = "";
        regProto.prototype.regtel = "";
        regProto.prototype.regmessage = "";
        regProto.prototype.regcountry = "";
        regProto.prototype.regtown = "";
        regProto.prototype.regprofession = "";
        regProto.prototype.registr = "";
    };

    return {
        clearRegProto
    };
})();