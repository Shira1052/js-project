let colors = []
let placeCard = []
let cards = []
let firstCard = null
let secondCard = null
let lockBoard = false
let n

function start() {
    container.innerHTML=""
    //בליחצה על כפתור אוקיי יקלוט את מספר הזוגות 
    n = document.getElementById("num").value
    //וישלח לפונקציה שיוצרת אותם.
    creat(n)
    cards = [] = document.getElementsByClassName("container")
    placeCard = [n * 2]
    colors = [n]
    randomColors(n)
    insertPlace(n * 2)

}

//פוקצית יצירת קלפים
function creat(n) {
    //תיצור את הקלפים 
    //יצירה בלולאה לפי שלושת הכללים שלמדנו בכל איטרציה אבא מאמץ ילד
    for (let i = 0; i < n * 2; i++) {
        const newcard = document.createElement('div')
        newcard.id = i
        newcard.onclick = function () {
            revealCard(this)
        }
        newcard.innerHTML = "?"
        const container = document.getElementById("container")
        container.appendChild(newcard)
    }
}

function randomColors(n) {
    for (let i = 0; i < n; i++) {
        let R = Math.floor(Math.random() * 255)
        let G = Math.floor(Math.random() * 255)
        let B = Math.floor(Math.random() * 255)
        colors[i] = `rgb(${R},${G},${B})`
        if (ifExist(i))
            i--
    }
}

function ifExist(i) {
    for (let j = 0; j < i; j++)
        if (colors[i] == colors[j])
            return 1
    return 0
}

function insertPlace(n) {
    for (let i = 0; i < n; i++) {
        placeCard[i] = Math.floor(Math.random() * (n / 2))
        if (ex(i))
            i--
    }
}

function ex(i) {
    let c = 0;
    for (let j = 0; j < i; j++)
        if (placeCard[i] == placeCard[j]) {
            c++
            if (c > 1)
                return 1
        }
    return 0
}

function game() {
    lockBoard = true
    uq(firstCard, secondCard)
    firstCard = null
    secondCard = null
    if (ifFinish()==true) {
        alert("אלוף העולם, ניצחת!!!")
        start()
        container.innerHTML=""
    }
}

function ifFinish() {
    let card=container.children
    for (let i = 0; i < n * 2; i++)
        if (card[i].onclick!= null)
            return false
    return true
}


//פונקצית גילוי כרטיס.
//כשלוחצים על הכרטיס הכרטיס יצבע בצבע שקיים במערך הצבעים באותו המיקום .
function revealCard(card) {
    if (lockBoard == false) {
        let i = card.id
        let c = placeCard[i]
        let realC = colors[c]
        card.style.backgroundColor = realC
        card.innerHTML = ""
        if (firstCard == null)
            firstCard = card
        else if (firstCard != card) {
            secondCard = card
            game()
        }
    }
}


//פונקציה settimeout- 3 שניות והכרטיס מתהפך- חוזר לצבע המקורי.
function setTime(card1, card2) {
    setTimeout(() => {
        card1.style.backgroundColor = "#1e1e2e"
        card1.innerHTML = "?"
        card2.style.backgroundColor = "#1e1e2e"
        card2.innerHTML = "?"
        lockBoard = false
    }, 1000)
}


//פונקצי לבדיקת שוויון . 
function uq(card1, card2) {
    if (card1.style.backgroundColor == card2.style.backgroundColor) {
        card1.innerHTML = "✓"
        card1.onclick = null
        card2.innerHTML = "✓"
        card2.onclick = null
        lockBoard = false
    }
    else {
        setTime(card1, card2)
    }
}
