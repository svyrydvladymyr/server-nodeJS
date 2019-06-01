// function for set foto
var setFoto = function(nodaid , param){   
    var atr = createA("src", param);
    getID(nodaid).setAttributeNode(atr);
};

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
            setFoto("foto" , data.foto);
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
 

// function for get language
(function(){ 
    var clang = getCookie("lang");
    //console.log(clang);
    if (clang == "en"){
        getJson("./json/configEN.json");
    } else if (clang == "ua"){
        getJson("./json/configUA.json");
    } else {
        getJson("./json/configEN.json");
    }
})();




let loadDoc = function() {
    let xxx = document.getElementById('nameee').value;
    let yyy = document.getElementById('surnameee').value;
    let obgg = {"name":`${xxx}`,"address":`${yyy}`};
    let obg = JSON.stringify(obgg);

    console.log(obg);
       
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this.readyState);
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {         
            document.getElementById("demo").innerHTML = this.responseText;
            // let x = JSON.parse(this.responseText);
            console.log(this.responseText);  
        }
    };
    xhttp.open("POST", "addToDB", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(obg);
  }

  let loadDoc2 = function() {
    let xxx = document.getElementById('nameee2').value;
    let yyy = document.getElementById('surnameee2').value;
    let obgg = {"name":`${xxx}`};
    let obg = JSON.stringify(obgg);
    
    console.log(obg);
       
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this.readyState);
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {         
            document.getElementById("demo2").innerHTML = this.responseText;
            // let x = JSON.parse(this.responseText);
            console.log(this.responseText);  
        }
    };
    xhttp.open("POST", "updateDB", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(obg);
  }



  let loadDoc3 = function() {
      let obgg = {"gh":"hj"}; 
      let obg = JSON.stringify(obgg);      
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {         
            document.getElementById("button").innerHTML = this.responseText;
                document.getElementById('click').addEventListener('click', VW.buttonLogin);

         
// let x = JSON.parse(this.responseText);
            console.log(this.responseText);  
        }
    };
    xhttp.open("POST", "getButton", true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send(obg);
  }

document.getElementById('send').addEventListener('click', loadDoc);
document.getElementById('send2').addEventListener('click', loadDoc2);
document.getElementById('send3').addEventListener('click', loadDoc3);




