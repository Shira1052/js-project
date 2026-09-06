let currentUser;

const arrUsers = JSON.parse(localStorage.getItem('arrUsers')) || [];
const form = document.querySelector('.form');

function entry() {
    currentUser = arrUsers.find(user => user.name == form.name.value && user.password == form.password.value);
    if (currentUser) {
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        form.innerHTML = "התחברת!";
        setTimeout(() => {
            window.location.href = "../index.html"
        }, 1500);
    }
    else {
        form.name.value = "";
        form.password.value = "";
        form.innerHTML = `<input name="name" type="text" placeholder="שם משתמש">
        <input name="password" type="password" placeholder="סיסמה">
        <button type="button" onclick="entry()">כניסה</button>
        <p>לא נרשמתם עדיין?</p>
        <button type="button" onclick="moveToRegisteration()">הרשמה</button>
        <p>שם או סיסמה לא תקינים</p>`;
    }
}

function registeration() {
    if (form.password.value != form.password2.value) {
        form.password.value = "";
        form.password2.value = "";
        form.innerHTML = `
        <input name="name" type="text" placeholder="שם משתמש">
        <input name="email" type="email" placeholder="כתובת מייל">
        <input name="password" type="password" placeholder="סיסמה">
        <input name="password2" type="password" placeholder="אבטחת סיסמה">
        <button type="button" onclick="registeration()">הרשמה</button>
        <p>רשומים כבר?</p>
        <button type="button" onclick="moveToEntry()">כניסה</button>
        <p>סיסמה לא זהה</p>`;
        return;
    }
    let newScoreObj = {
        "lastScore": "",
        "highScore": "",
        "dateOfHightS": "",
        "gamesNum": 0,
        "vicyoriesNum": 0,
        "avgTime": 0
    };
    let newUserObj = {
        "name": "",
        "email": "",
        "password": "",
        "score": newScoreObj
    };
    newUserObj.name = form.name.value;
    newUserObj.email = form.email.value;
    newUserObj.password = form.password.value;
    arrUsers.push(newUserObj);
    localStorage.setItem('arrUsers', JSON.stringify(arrUsers));
    sessionStorage.setItem('currentUser', JSON.stringify(newUserObj));
    form.innerHTML = "נרשמת בהצלחה!";
    setTimeout(() => {
        window.location.href = "../index.html"
    }, 1500);
}

function moveToRegisteration() {
    form.innerHTML = `
        <input name="name" type="text" placeholder="שם משתמש">
        <input name="email" type="email" placeholder="כתובת מייל">
        <input name="password" type="password" placeholder="סיסמה">
        <input name="password2" type="password" placeholder="אבטחת סיסמה">
        <button type="button" onclick="registeration()">הרשמה</button>
        <p>רשומים כבר?</p>
        <button type="button" onclick="moveToEntry()">כניסה</button>`;
}

function moveToEntry() {
    form.innerHTML = `
        <input name="name" type="text" placeholder="שם משתמש">
        <input name="password" type="password" placeholder="סיסמה">
        <button type="button" onclick="entry()">כניסה</button>
        <p>לא נרשמתם עדיין?</p>
        <button type="button" onclick="moveToRegisteration()">הרשמה</button>`;
}
