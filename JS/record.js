let arrUsers = JSON.parse(localStorage.getItem('arrUsers')) || [];
arrUsers = arrUsers.filter(u => u.score.highScore != "" && u.score.highScore != null)
    .sort((u1, u2) => u1.score.highScore - u2.score.highScore);

document.addEventListener('DOMContentLoaded', function () {
    const t = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < 3 && i < arrUsers.length; i++) {
        const nr = t.insertRow();
        const c1 = nr.insertCell(0);
        const c2 = nr.insertCell(1);
        const c3 = nr.insertCell(2);
        c1.innerHTML = arrUsers[i].name;
        c2.innerHTML = arrUsers[i].score.highScore;
        c3.innerHTML = arrUsers[i].score.dateOfHightS;
    }
})
