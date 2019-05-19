// function for check cookie
(function () {
    var clang = getCookie("lang");
    if (clang == "") {
      var  getLang = navigator.language;
      setCookie("lang", getLang);
    } else {
      //console.log(clang);
      return clang; 
    }
})();

// function for set cookie  
function setCookie(name, value) {
    document.cookie = name + "=" + value + "; expires=Thu, 18 Dec 2029 12:00:00 UTC; path=/";
    console.log(document.cookie);
  }

// function for get cookie  
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
 

