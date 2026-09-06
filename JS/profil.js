let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

if (!currentUser) {
    window.location.href = "../HTML/register.html";
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('userName').innerText = currentUser.name;
    document.getElementById('userEmail').innerText = currentUser.email;
    document.getElementById('gamesNum').innerText = `משחקים: ${currentUser.score.gamesNum}`;
    document.getElementById('victoriesNum').innerText = `ניצחונות: ${currentUser.score.vicyoriesNum}`;
    document.getElementById('failsNum').innerText = `הפסדים: ${currentUser.score.gamesNum - currentUser.score.vicyoriesNum}`;

    let successRate = currentUser.score.gamesNum > 0
        ? Math.round((currentUser.score.vicyoriesNum / currentUser.score.gamesNum) * 100)
        : 0;
    document.getElementById('successRate').innerText = `אחוז הצלחה: ${successRate}%`;

    document.getElementById('highScore').innerText = currentUser.score.highScore
        ? `שיא מהירות: ${currentUser.score.highScore}`
        : `שיא מהירות: אין עדיין`;
});