let VW = (() => {
    
    //function for change login button
    let buttonLogin = function(){
        let logIn = document.getElementById("send-login-close");
        if (logIn.classList == "click-login-close"){
            logIn.classList = "click-login-open";
     
        } else if(logIn.classList == "click-login-open"){
            let inputLogin = SE.$("login").value;
            let inputPassword = SE.$("password").value;


            logIn.classList = "click-login-close";




            //chack on empty login and password and show message
            if ((inputLogin == "") && (inputPassword == "")){
            } else if ((inputLogin == "")) {
            } else if ((inputPassword == "")) {
            } else{

            }
        } else if (logIn.classList == "click-login-exit"){
            logIn.classList = "click-login-close";

            //clear session
            sessionStorage.autorisetionUser = "";
        }
    };

return {
    buttonLogin
};

})();