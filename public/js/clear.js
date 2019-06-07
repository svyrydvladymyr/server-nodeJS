let CLEAR = (function(){
    //function for clear obgect prototype
    let clearObg = function(){
        toSend.prototype.registr = "";
        toSend.prototype.addnomer = "";
        toSend.prototype.addstartdata = "";
        toSend.prototype.addkilk = "";
        toSend.prototype.addstatusgгest = "";
        toSend.prototype.addstatuszamovl = "";
        toSend.prototype.price = "";
    };

    //function for clear value in inputs
    let clearValue = function(){
        SE.$("add-nomer").value = "";
        SE.$("add-start-data").value = "";
        SE.$("add-kilk").value = "";
        SE.$("add-status-gгest").value = "";
        SE.$("add-status-zamovl").value = "";
    };

    //function for clear true icon
    let clearIcon = function(){
        SE.$("room-true").style.display = "none";
        SE.$("status-gгest-true").style.display = "none";
        SE.$("status-zamovl-true").style.display = "none";
        SE.$("name-error").style.display = "none";
        SE.$("surname-error").style.display = "none";
        SE.$("tel-error").style.display = "none";
        SE.$("room-error").style.display = "none";
        SE.$("status-gгest-error").style.display = "none";
        SE.$("status-zamovl-error").style.display = "none";
    };

    //function for clear tabs
    let clearTabs = function(){
        SE.setMessage("message-send", "none", "", "");
        SE.setMessage("message-price", "none", "", ""); 
        SE.setMessage("message-room", "none", "", "Кімната зайнята на:");
        SE.setMessage("message-add-name", "none", "", "");
        SE.setMessage("message-add-surname", "none", "", "");
        SE.setMessage("message-add-tel", "none", "", "");
        SE.setMessage("message-add-nomer", "none", "", "");
        SE.setMessage("message-add-start-data", "none", "", "");
        SE.setMessage("message-add-kilk", "none", "", "");
        SE.setMessage("message-add-status-grest", "none", "", "");
        SE.setMessage("message-add-status-zamovl", "none", "", "");
    };

    //clear update prototipe
    let clearUpdatePrototipe = function(){
        toUpdate.prototype.lastname = "";
        toUpdate.prototype.firstname = "";
        toUpdate.prototype.telephone = "";
        toUpdate.prototype.nomerkimn = "";
        toUpdate.prototype.kilkdniv = "";
        toUpdate.prototype.datazapisu = "";
        toUpdate.prototype.status = "";
        toUpdate.prototype.adminreg = "";
        toUpdate.prototype.datereg = "";
    };

    return {
        clearObg,
        clearValue,
        clearIcon,
        clearTabs,
        clearUpdatePrototipe
    };
})();