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
    










