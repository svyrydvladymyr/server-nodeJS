let WFRIENDS = (() => {    

    //for show all friends
        let showFriends = (res) => {
            let parseObj = JSON.parse(res).res;
            console.log(parseObj);          

            SE.$('friends-conteiner').innerHTML = ``;

            for (let i = 0; i < parseObj.length; i++){
                console.log(parseObj[i]);
                let avafoto;
                if ((parseObj[i].ava === null) || (parseObj[i].ava === '') || (parseObj[i].ava === undefined)){
                    avafoto = `./img/ava_empty.jpg`;
                } else {
                    avafoto = `./uploads/${parseObj[i].ava}`;
                }
                



                    SE.$('friends-conteiner').innerHTML += `

                    <div class="listusers-boks2" id="${parseObj[i].userid}" onclick="VW.renderPage(this)">
                        <div class="listusers-img" 
                            style="background-image: url('${avafoto}'); 
                            background-position: ${parseObj[i].avasettings};">
                        </div>    
                        <p>${parseObj[i].name} ${parseObj[i].surname}</p>
                    </div>
                    
                    
                    
                    `;





            }
        };
  
     
    
    return {
        showFriends,
    };
    
    })();