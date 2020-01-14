let MESS = (() => {

//error form message    
    let errorFormMessage = () => {
        if (localStorage.kalciferLang === "ua"){
            let allInputs = "Заповніть всі обов'язкові поля!";
            let notCunEmpty = 'Не може бути пустим!';
            let notCorectNum = 'Некоректний номер!';
            let notCorectVar = 'Некоректне значення!';
            let checkPass = 'Перевірте пароль!';
            let repeatPass = 'Повторіть пароль!';
            let onlyNum = "Тільки цифри!";
            let onlyLetterslat = "Тільки лат. букви!";
            let onlyLetters = "Тільки букви!";
            let toLBigFile = "Занадто великий файл! Макс. розмір 1мб";
            let dupllogin = "Користувач з таким логіном вже існує!";
            let duplemail = "Користувач з такою поштою вже існує!";
            let toshort = "Мінімум 7 символів!";
            let registrationGood = "Реєстрація успішна!";
            let autorisNotEmpty = "Заповніть всі поля!";
            let autorisOnlyletters = "Тільки лат. букви та цифри!";
            let autorisNotAvtoris = "Логін або пароль не вірні!";
            let enterPassword = "Введіть пароль!";
            let notSame = "Старий і новий паролі не можуть співпадати!";
            let save = "зберігається...";
            let saved = "Збережено!";
            let nedautoriz = "Потрібно авторизуватися!";
            let skillslevel = "Встановіть рівень, який на вашу думку ва маєте. Від 1 до 10.";
            let skillsname = "Введіть назву вашого навику. *";
            let skillschack = "Показувати чи ні.";
            let skillsemptyname = "Вкажіть назву навику!";
            let projectdescription = "Вкажіть опис проекту!";
            let projectname = "Вкажіть назву проекту! *";
            let projecturl = "Вкажіть посилання на проект!";
            let aftersendemail = "Лист для підтвердження надіслано на вашу пошту!";
            let yourarefriends = "Ви вже друзі!";
            let friendsdel = "Видалити";
            let friendsadd = "Додати";
            let friendsmess = "Повідомлення";
            let prooffriends = "Підтвердити";
            let showmore = "Показати ще";
            let recoverdatamess = "Лист з даними надіслано на вашу пошту. Це може зайняти кілька хвилин.";
            let recoverdataerr = "Під час надсилання електронного листа сталася помилка ...";
            let canseldel = "Ви можете відмінити видалення акаунта допоки таймер не досягне нуля.";
            let cansel = "Відмінити";
            let canselmess = "Тут ви можете видалити свій акаунт";
            let recovernotfind = "Користувача з такою поштою не знайдено!"
            let nochange = "Немає змін!"
            let prochitano = "Прочитано!"
            let neprochitano = "Не прочитано!"
            let forme = "ДЛЯ МЕНЕ"
            let forboth = "ДЛЯ ОБОХ"
            let messforme = "Повідомлення буде видалено тільки у вас. У співрозмовника повідомлення залишиться."
            let messforboth = "Повідомлення буде видалено для обох. У співрозмовника залишиться відмітка про видалене повідомлення."
            let messdeleted = "Видалено!"
            let messdeletedall = "Ви можете видалити весь діалог. Повідомлення будуть видалені також і у вашого друга але залишаться помітки що вони були видалені."
            let postsharemess = "Поширити собі"
            let postisonmypage = "Цей пост вже є на вашій сторінці!"
            let mypost = "Мій пост"
            let postfrom = "Репост від"
            let postshared = "Пост поширено на вашу сторінку!"
            let postwasdell = "Пост було видалено!"
            let postdelproof = "Підтвердіть видалення!"
            let showall = "і ще"
            let writemess = "Введіть повідомлення..."
            let writepost = "Напишіть коментар..."
            return {
                writepost,
                writemess,
                showall,
                postdelproof,
                postwasdell,
                postshared,
                mypost,
                postfrom,
                postisonmypage,
                postsharemess,
                messdeletedall,
                messdeleted,
                messforme,
                messforboth,
                forme,
                forboth,
                prochitano,
                neprochitano,
                nochange,
                recovernotfind,
                canselmess,
                cansel,
                canseldel,
                recoverdatamess,
                recoverdataerr,
                showmore,
                prooffriends,
                friendsmess,
                friendsdel,
                friendsadd,
                notCunEmpty,
                notCorectNum,
                notCorectVar,
                checkPass,
                repeatPass,
                onlyNum,
                onlyLetters,
                allInputs,
                toLBigFile,
                dupllogin,
                duplemail,
                toshort,
                registrationGood,
                autorisNotEmpty,
                autorisOnlyletters,
                autorisNotAvtoris,
                onlyLetterslat,
                enterPassword,
                notSame,
                save,
                saved,
                nedautoriz,
                skillslevel,
                skillsname,
                skillschack,
                skillsemptyname,
                projectname,
                projectdescription,
                projecturl,
                aftersendemail,
                yourarefriends
            };
        } else if (localStorage.kalciferLang === "en"){
            let allInputs = "Fill in all required fields!";
            let notCunEmpty = 'It can not be empty!';
            let notCorectNum = 'Not a valid number!';
            let notCorectVar = 'Invalid value!';
            let checkPass = 'Check your password!';
            let repeatPass = 'Repeat password!';
            let onlyNum = "Only numbers!";
            let onlyLetterslat = "Only letters!";
            let onlyLetters = "Only letters!";
            let toLBigFile = "Too large file! Max. size 1MB";
            let dupllogin = "A user with this login already exists!";
            let duplemail = "A user with such mail already exists!";
            let toshort = "Minimum of 7 characters!";
            let registrationGood = "Registration is successful!";
            let autorisNotEmpty = "Fill in all fields!";
            let autorisOnlyletters = "Only letters and numbers!";
            let autorisNotAvtoris = "Login or pass. is incorrect!";
            let enterPassword = "Enter the password!";
            let notSame = "Old and new passwords can not match!";
            let save = "save...";
            let saved = "Saved!";
            let nedautoriz = "You must be logged in!";
            let skillslevel = "Set the level that you think you have. From 1 to 10.";
            let skillsname = "Enter the name of your skill. *";
            let skillschack = "Show or not.";
            let skillsemptyname = "Вкажіть назву навику!";
            let projectdescription = "Specify the description of the project!";
            let projectname = "Specify the name of the project! *";
            let projecturl = "Specify a reference to the project!";
            let aftersendemail = "A confirmation letter has been sent to your mail!";
            let yourarefriends = "You are friends!";
            let friendsdel = "Remove";
            let friendsadd = "Add";
            let friendsmess = "Message";
            let prooffriends = "Confirm";
            let showmore = "Show more";
            let recoverdatamess = "A data letter has been sent to your mail. It may take a few minutes to receive.";
            let recoverdataerr = "An error occurred while sending the email...";
            let canseldel = "You can cancel deleting the account until the timer reaches zero.";
            let cansel = "Cancel";
            let canselmess = "Here you can delete your account";
            let recovernotfind = "No user with this mail was found!"
            let nochange = "No changes!"
            let prochitano = "Readed!"
            let neprochitano = "Not readed!"
            let forme = "FOR ME"
            let forboth = "FOR BOTH"
            let messforme = "The message will be deleted from you. The interlocutor will have a message."
            let messforboth = "The message will be deleted for both. The caller will keep a note about the deleted message."
            let messdeleted = "Deleted!"
            let messdeletedall = "You can delete the entire dialog. Messages will also be deleted from your friend, but will remain marked that they have been deleted."
            let postsharemess = "Share to your page"
            let postisonmypage = "This post is already on your page!"
            let mypost = "My post"
            let postfrom = "Repost from"
            let postshared = "The repost is done on your page!"
            let postwasdell = "The post has been deleted!"
            let postdelproof = "Confirm the deletion!"
            let showall = "and more"
            let writemess = "Enter message ..."
            let writepost = "Write a comment..."
            return {
                writepost,
                writemess,
                showall,
                postdelproof,                
                postwasdell,
                postshared,
                mypost,
                postfrom,
                postisonmypage,
                postsharemess,
                messdeletedall,
                messdeleted,                
                messforme,
                messforboth,
                forme,
                forboth,
                prochitano,
                neprochitano,
                nochange,
                recovernotfind,
                canselmess,                
                cansel,                
                canseldel,
                recoverdatamess,
                recoverdataerr,
                showmore,
                prooffriends,
                friendsmess,
                friendsdel,
                friendsadd,
                notCunEmpty,
                notCorectNum,
                notCorectVar,
                checkPass,
                repeatPass,
                onlyNum,
                onlyLetters,
                allInputs,
                toLBigFile,
                dupllogin,
                duplemail,
                toshort,
                registrationGood,
                autorisNotEmpty,
                autorisOnlyletters,
                autorisNotAvtoris,
                onlyLetterslat,
                enterPassword,
                notSame,
                save,
                saved,
                nedautoriz,
                skillslevel,
                skillsname,
                skillschack,
                skillsemptyname,
                projectname,
                projectdescription,
                projecturl,
                aftersendemail,
                yourarefriends
            };
        }
    };    

    return {
        errorFormMessage
    }
})()

