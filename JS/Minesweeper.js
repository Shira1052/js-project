let N = 8;
let arrBoard = new Array(N);
let arrDom = new Array(N);
let mineOnBord = Math.floor(N * N * 0.15);
let openCardsNum = N * N - mineOnBord;
let firstClick = true;
let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
let timerInterval;
let gameOverTimeOut;
let game = false;
let timer = 0;
document.getElementById('timer').innerText = `⏱ ${timer}`;
const sndbomb = new Audio('../audio/פיצוץ.mp3');
const sndclap = new Audio('../audio/כפיים.mp3');
const sndcard = new Audio('../audio/קלף.mp4');

function changeLevelA() {
    N = 8;
    arrBoard = new Array(N);
    arrDom = new Array(N);
    mineOnBord = Math.floor(N * N * 0.15);
    openCardsNum = N * N - mineOnBord;
    firstClick = true;
    stopTimer();
    timer = 0;
    buildBoard();
}

function changeLevelB() {
    N = 14;
    arrBoard = new Array(N);
    arrDom = new Array(N);
    mineOnBord = Math.floor(N * N * 0.2);
    openCardsNum = N * N - mineOnBord;
    firstClick = true;
    stopTimer();
    timer = 0;
    buildBoard();
}

function changeLevelC() {
    N = 20;
    arrBoard = new Array(N);
    arrDom = new Array(N);
    mineOnBord = Math.floor(N * N * 0.26);
    openCardsNum = N * N - mineOnBord;
    firstClick = true;
    stopTimer();
    timer = 0;
    buildBoard();
}

const board = document.querySelector('.board');

function buildBoard() {
    game = true;
    if (!currentUser)
        window.location.href = "../HTML/register.html";
    openCardsNum = N * N - mineOnBord;
    firstClick = true;
    clearTimeout(gameOverTimeOut);
    stopTimer();
    timer = 0;
    document.getElementById('timer').innerText = `⏱ ${timer}`;
    board.innerHTML = "";
    gameOver.innerHTML = "";
    for (let i = 0; i < N; i++) {
        arrBoard[i] = new Array(N).fill(0);
        arrDom[i] = new Array(N).fill(0);
        for (let j = 0; j < N; j++) {
            board.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
            let cell = document.createElement('button');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.className = 'cell';
            cell.addEventListener('click', function (event) {
                let r = Number(event.currentTarget.dataset.row);
                let c = Number(event.currentTarget.dataset.col);
                if (firstClick) {
                    firstClick = false;
                    fillMine(r, c);
                    openCells(r, c);
                }
                else {
                    if (arrBoard[r][c] == -1)
                        failure();
                    else {
                        openCells(r, c);
                    }
                }
            });
            cell.addEventListener('contextmenu', function (event) {
                event.preventDefault();
                let r = Number(event.currentTarget.dataset.row);
                let c = Number(event.currentTarget.dataset.col);
                if (arrDom[r][c].dataset.opened)
                    return;
                if (arrDom[r][c].disabled) {
                    arrDom[r][c].innerText = ""
                    arrDom[r][c].disabled = false;
                }
                else {
                    arrDom[r][c].innerText = "🚩"
                    arrDom[r][c].disabled = true;
                }
            });
            board.appendChild(cell);
            arrDom[i][j] = cell;
        }
    }
}

function around(r, c, currr, currc) {
    if (r - 1 == currr || r == currr || r + 1 == currr)
        if (c - 1 == currc || c == currc || c + 1 == currc)
            return true;
    return false;
}

function fillMine(currr, currc) {
    for (let i = 0; i < mineOnBord; i++) {
        let r = Math.floor(Math.random() * N);
        let c = Math.floor(Math.random() * N);
        if (around(r, c, currr, currc)) {
            i--;
        }
        else {
            if (arrBoard[r][c] == -1)
                i--
            else {
                arrBoard[r][c] = -1;
                if (r > 0 && c > 0)
                    arrBoard[r - 1][c - 1] != -1 ? arrBoard[r - 1][c - 1]++ : 0;
                if (r > 0)
                    arrBoard[r - 1][c] != -1 ? arrBoard[r - 1][c]++ : 0;
                if (r > 0 && c < N - 1)
                    arrBoard[r - 1][c + 1] != -1 ? arrBoard[r - 1][c + 1]++ : 0;
                if (c > 0)
                    arrBoard[r][c - 1] != -1 ? arrBoard[r][c - 1]++ : 0;
                if (c < N - 1)
                    arrBoard[r][c + 1] != -1 ? arrBoard[r][c + 1]++ : 0;
                if (r < N - 1 && c > 0)
                    arrBoard[r + 1][c - 1] != -1 ? arrBoard[r + 1][c - 1]++ : 0;
                if (r < N - 1)
                    arrBoard[r + 1][c] != -1 ? arrBoard[r + 1][c]++ : 0;
                if (r < N - 1 && c < N - 1)
                    arrBoard[r + 1][c + 1] != -1 ? arrBoard[r + 1][c + 1]++ : 0;
            }
        }
    }
    counter();
}

function stopTimer() {
    clearInterval(timerInterval);
}

function counter() {
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').innerText = `⏱ ${timer}`;
    }, 1000);
}

function openCells(r, c) {
    if (arrDom[r][c].disabled)
        return;
    if (arrBoard[r][c] == 0) {
        openCardsNum--;
        sndcard.play();
        arrDom[r][c].disabled = true;
        arrDom[r][c].innerText = "";
        arrDom[r][c].dataset.opened = true;
        if (r > 0 && c > 0)
            openCells(r - 1, c - 1);
        if (r > 0)
            openCells(r - 1, c);
        if (r > 0 && c < N - 1)
            openCells(r - 1, c + 1);
        if (c > 0)
            openCells(r, c - 1);
        if (c < N - 1)
            openCells(r, c + 1);
        if (r < N - 1 && c > 0)
            openCells(r + 1, c - 1);
        if (r < N - 1)
            openCells(r + 1, c)
        if (r < N - 1 && c < N - 1)
            openCells(r + 1, c + 1);
    }
    else {
        openCardsNum--;
        sndcard.play();
        arrDom[r][c].disabled = true;
        arrDom[r][c].innerText = arrBoard[r][c];
    }
    if (!openCardsNum)
        victory();
}

const gameOver = document.getElementById('gameOver');

function victory() {
    if (game) {
        stopTimer();
        currentUser.score.lastScore = timer;
        currentUser.score.gamesNum++;
        currentUser.score.vicyoriesNum++;
        currentUser.score.avgTime = (currentUser.score.avgTime ? currentUser.score.avgTime : 1 * (currentUser.score.gamesNum - 1) + timer) / currentUser.score.gamesNum;

        let brokeRecord = !currentUser.score.highScore || timer < currentUser.score.highScore;
        if (brokeRecord) {
            currentUser.score.highScore = timer;
            currentUser.score.dateOfHightS = new Date().toLocaleDateString();
        }

        updateUser();
        sndclap.play();

        for (let i = 0; i < N; i++)
            for (let j = 0; j < N; j++)
                if (arrBoard[i][j] == -1)
                    arrDom[i][j].innerText = "💣";

        gameOverTimeOut = setTimeout(() => {
            gameOver.innerHTML = `<h2>תותח!, ניצחת 💪</h2>`;
            if (brokeRecord)
                gameOver.innerHTML += `<h3>שברת שיא!!</h3>`;
            gameOver.innerHTML += `<h4>מהירות: ${timer}</h4>
        <button onclick="buildBoard()">שחק שוב</button>
        <a href="../index.html"><button>חזרה לתפריט ראשי</button></a>`;
        }, 2000);
        game = false;
    }
}

function failure() {
    if (game) {
        stopTimer();
        currentUser.score.gamesNum++;
        updateUser();

        let mines = [];
        for (let i = 0; i < N; i++)
            for (let j = 0; j < N; j++)
                if (arrBoard[i][j] == -1)
                    mines.push({ i, j });

        let totalDuration = 1500;
        let step = totalDuration / mines.length;

        mines.forEach((pos, index) => {
            let cellEl = arrDom[pos.i][pos.j];
            cellEl.innerText = "💣";
            sndbomb.play();
            setTimeout(() => {
                cellEl.innerText = "💥";
            }, index * step);
        });

        gameOverTimeOut = setTimeout(() => {
            gameOver.innerHTML = `
        <h2>חבל, נכלשת 👎</h2>
        <button onclick="buildBoard()">שחק שוב</button>
        <a href="../index.html"><button>חזרה לתפריט ראשי</button></a> 
        `;
        }, totalDuration + 500);
        game = false;
    }
}


function updateUser() {
    let arrUsers = JSON.parse(localStorage.getItem('arrUsers'));
    let x = arrUsers.findIndex(u => u.email == currentUser.email && u.password == currentUser.password);
    if (x != -1) {
        arrUsers[x] = currentUser;
    }
    localStorage.setItem('arrUsers', JSON.stringify(arrUsers));
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
}

buildBoard();