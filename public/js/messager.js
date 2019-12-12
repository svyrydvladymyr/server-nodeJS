let MESSAGER = (() => {   
    //for hidden messanger write box
    let hiddenWriteBox = () => {
        SE.$('messenger_write_send_body').innerHTML = ``;
        SE.$('messenger_write_header_icon').innerHTML = `<i class='fas fa-times' onclick="SE.$('messenger_write').innerHTML = ''"></i>`;
    }

    //for check langth textarea 
    let lengthText = (val) => {
        SE.$('messenger_write_langth').innerHTML = `${255 - val.value.length}`;        
    }


    
return {
    hiddenWriteBox,
    lengthText,
}

})();