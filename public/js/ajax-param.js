      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyDp5cZZvRKmvvcyGkekLRrdIWXdI9wfH2s",
        authDomain: "kalcifer-kirby.firebaseapp.com",
        databaseURL: "https://kalcifer-kirby.firebaseio.com",
        projectId: "kalcifer-kirby",
        storageBucket: "kalcifer-kirby.appspot.com",
        messagingSenderId: "126533458207"
    };      
    firebase.initializeApp(config);

    var ref = firebase.database().ref();
    ref.on("value", function(snapshot) {
        getName = snapshot.val();
        console.log("get obgect users");
        var x = "1111112019-02";
        document.getElementById("name").innerHTML = getName.users[x].name;
        document.getElementById("surname").innerHTML = getName.users[x].surname;
        document.getElementById("email").innerHTML = getName.users[x].email;
        document.getElementById("country").innerHTML = getName.users[x].country;
        document.getElementById("town").innerHTML = getName.users[x].town;
        document.getElementById("date").innerHTML = getName.users[x].birthday;
        document.getElementById("phone").innerHTML = getName.users[x].phone;
        document.getElementById("massage").innerHTML = getName.users[x].phone;
        document.getElementById("job").innerHTML = getName.users[x].profision;
        document.getElementById("joblevel").innerHTML = getName.users[x].profesionlevel;


        // value in form default
        document.getElementById("fname").value = getName.users[x].name;
    }, function (error) {
        console.log("Error: " + error.code);
    });



    function funChange(){
        const fb = firebase.database().ref();
        var name = document.getElementById("fname").value;
        var surname = document.getElementById("fsurname").value;
        var email = document.getElementById("femail").value;
        var phone = document.getElementById("fphone").value;
        var country = document.getElementById("fcountry").value;
        var town = document.getElementById("ftown").value;
        var birthday = document.getElementById("fbirthday").value;
        var profision = document.getElementById("fprofesion").value;
        var profesionlevel = document.getElementById("fprofesionlevel").value;

          console.log(name);
          console.log(surname);
          console.log(email);
          console.log(phone);
          console.log(country);
          console.log(town);
          console.log(birthday);
          console.log(profision);
          console.log(profesionlevel);

        var user_account = surname + "" + name + "" + birthday;
        var user = {name, surname, email, phone, country, town, birthday, profision, profesionlevel};           
        
          console.log(user_account);
          console.log(user);

        if (getName.users[user_account]){
            fb.child('users/' + user_account + '/').set(user);
        }else {
            fb.child('users/').push(user_account);
            fb.child('users/' + user_account + '/').set(user);
        }
    }   
    



// function for set parametrs
var setName = function(nodaid, param){
    getID(nodaid).innerText = param; 
};

// function for get object from (*.json) file
function getJson(namefile) {
    var file = new XMLHttpRequest();
    file.onreadystatechange = function() {
        if (file.readyState === 4 && file.status == "200") {
            var data = JSON.parse(file.responseText);
            // setName("name", data.name);
            // setName("surname", data.surname);
            // setName("contry", data.country);
            // setName("town", data.town);
            // setName("date", data.date[0]);
            // setName("mounth", data.date[1]);
            // setName("year", data.date[2]);
            // setName("email", data.email);
            // setName("phone", data.phone);
            // setName("massage", data.massage);
            // setName("job", data.job);
            // setName("joblevel", data.joblevel);
        }
    };
    file.open("GET", namefile, true);
    file.send(null);
}
 





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






     //make AJAX request
     let send = function(){
      let obj = {"one":"onfghfghfhfghffghfghe", "two":"two"};
      let file = document.getElementById('file').files;
let xxx = "dfgdfgdfg";
      let formData = new FormData();
      formData.append("hhh",xxx);
      formData.append("nnn",xxx);
      formData.append("mmm",'xxx');
      formData.append("ggg",JSON.stringify(obj));
      
      for(let i = 0; i < file.length; i++){
        formData.append("file",file[i]);
      }




      let contenttype = {
        headers:{"Content-type": "multipart/form-data"}
      }

      axios.post('/profile', formData, contenttype)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })

      
  };

      
