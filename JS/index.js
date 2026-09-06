let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

let User = document.querySelector('.User');

document.addEventListener('DOMContentLoaded', function () {
    if (currentUser) {
        let exit = document.createElement('div');
        exit.innerText = "צא";
        let us = document.getElementById('user');
        us.innerText = "החלף משתמש";
        exit.addEventListener('click', function () {
            sessionStorage.clear();
            us.innerText = "התחברות";
            exit.innerText = "";
            prof.innerText = "";
            rec.innerText = "";
        });
        User.appendChild(exit);
        let prof = document.createElement('a');
        prof.href = "./HTML/profil.html";
        prof.innerText = "דף פרופיל";
        User.appendChild(prof);
        let rec = document.createElement('a');
        rec.href = "./HTML/record.html";
        rec.innerText = "דף שיאים";
        User.appendChild(rec);
    }
    else {
        User.innerHTML = `
        <a href="./HTML/register.html">התחברות</a>`;
    }
});