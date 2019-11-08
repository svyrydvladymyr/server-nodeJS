let AVA = (() => {
//show preview foto     
let readURL = (type) => {
    if (SE.$('reg-file').files && SE.$('reg-file').files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            if (type === 'm'){
                let url = e.target.result;
                let sett = SE.$('ava-preview-foto').style.backgroundPosition;
                SE.$('ava').style.backgroundPosition = sett;
                SE.updateAvaToDB(url, sett);
            } else if (type === 'r'){
                SE.$('reg-ava').setAttribute("style", `background-image: url("${e.target.result}")`)
            }
        }          
        reader.readAsDataURL(SE.$('reg-file').files[0]);
        setTimeout(() => {
            if (type === 'r'){
                SE.$("reg-form-send").addEventListener("click", SE.messageSendError);
                SE.$("reg-form-send").classList.add('reg_send_active');
                SE.$("reg-form-send").style.cursor = 'pointer'; 
                SE.$('reg-ava').style.display = 'table';
                SE.$('reg-ava').style.backgroundPosition = SE.$('ava-preview-foto').style.backgroundPosition;
                regProto.prototype.avasettings = SE.$('ava-preview-foto').style.backgroundPosition;
                SE.$('ava-preview-foto').setAttribute("style", `background-image: url("")`)                  
            }
        },500);
    }
}

//clear file input
let clearFileInput = () => {
    SE.$('reg-file').type = "text";
    setTimeout(() => {
        SE.$('ava-preview-foto').setAttribute("style", `background-image: url("")`)
        SE.$('reg-ava').setAttribute("style", `background-image: url("")`)
        SE.$('reg-ava').style.display = 'none';
        SE.$('horizontally').value = '50%';
        SE.$('vertical').value = '50%';
        SE.$('reg-file-mess').style.display = 'table';
        SE.$('reg-file-mess').innerHTML = '';
        SE.iconON('reg-file', "true", '');         
        SE.$('reg-file').type = "file";
        regProto.prototype.avasettings = '';
    },100);
} 

//confirm preview ava
let confirmPreview = (type) => {
    if (type === 'm'){
        SE.$('ava-preview-wrap-main').style.display = 'none';
    } else if (type === 'r'){
        SE.$('ava-preview-wrap').style.display = 'none';
    }
    SE.$('horizontally').value = '50%';
    SE.$('vertical').value = '50%';
    readURL(type); 
}

//confirm preview ava close
let confirmPreviewClose = (type) => {
    SE.$('horizontally').value = '50%';
    SE.$('vertical').value = '50%';
    SE.$('ava-preview-foto').setAttribute("style", `background-image: url("")`)
    if (type === 'm'){
        SE.$('ava-preview-wrap-main').style.display = 'none'; 
        SE.$('reg-file').type = "text";
        setTimeout(() => { SE.$('reg-file').type = "file" },100);
    } else if (type === 'r'){
        if (SE.$('reg-ava').style.backgroundImage === ''){ SE.$('reg-file-mess').style.display = 'table' };
        SE.$('ava-preview-wrap').style.display = 'none'; 
        SE.$('reg-ava').setAttribute("style", `background-image: url("")`);
        clearFileInput();
    }
};

//show preview foto     
let readURLPreview = () => {
    SE.$('ava-preview-foto').setAttribute("style", `background-image: url("")`)
    if (SE.$('reg-file').files && SE.$('reg-file').files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) { SE.$('ava-preview-foto').setAttribute("style", `background-image: url("${e.target.result}")`)};          
        reader.readAsDataURL(SE.$('reg-file').files[0]);
    }
}

//range ava foto
let rangeAvaFoto = (el) => {
    if (el === 'h') {
        SE.$('ava-preview-foto').style.backgroundPosition = `${SE.$('horizontally').value}% 50%`;
    } else if (el === 'v') {
        SE.$('ava-preview-foto').style.backgroundPosition = `50% ${SE.$('vertical').value}%`;
    }      
}; 

//update ava date in user date
let updateAva = () => {
    if (SE.$('reg-file').files.length === 1){
        if (SE.$('reg-file').files[0].size > 1024000) {
            SE.$('ava-mess-main').innerHTML = MESS.errorFormMessage().toLBigFile;  
            setTimeout(() => {SE.$('ava-mess-main').innerHTML = ''}, 3000);
        } else {
            //show preview
            SE.$('ava-preview-wrap-main').style.display = 'flex';
            readURLPreview();                             
        }
    }
};  

return {
    readURLPreview,
    confirmPreview,
    confirmPreviewClose,
    clearFileInput,
    rangeAvaFoto,
    updateAva
}
})();