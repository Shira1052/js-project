function xo() {
    if (this.innerText === ""){
        if(i%2==0)
            this.innerText = "x"
        else
            this.innerText = "o"
        if (cells[0].innerText !== "" && 
            cells[0].innerText === cells[1].innerText && 
            cells[1].innerText === cells[2].innerText)
                win(i)
        else if (cells[3].innerText !== "" && 
            cells[3].innerText === cells[4].innerText && 
            cells[4].innerText === cells[5].innerText) 
                win(i)
        else if (cells[6].innerText !== "" && 
            cells[6].innerText === cells[7].innerText && 
            cells[7].innerText === cells[8].innerText) 
                win(i)
        else if (cells[0].innerText !== "" && 
            cells[0].innerText === cells[4].innerText && 
            cells[4].innerText === cells[8].innerText) 
                win(i)
        else if (cells[2].innerText !== "" && 
            cells[2].innerText === cells[4].innerText && 
            cells[4].innerText === cells[6].innerText) 
                win(i)
        else if (cells[0].innerText !== "" && 
            cells[0].innerText === cells[3].innerText && 
            cells[3].innerText === cells[6].innerText) 
                win(i)
        else if (cells[1].innerText !== "" && 
            cells[1].innerText === cells[4].innerText && 
            cells[4].innerText === cells[7].innerText) 
                win(i)
        else if (cells[2].innerText !== "" && 
            cells[2].innerText === cells[5].innerText && 
            cells[5].innerText === cells[8].innerText) 
                win(i)
        else {
            i++
            if(i>=9)
                res()
        }
    }
}

function win(i) {
    if(i%2==0){
        s1++
        alert ("X win")
    }
    else{
        s2++
        alert("O win")
    }
    document.getElementById("sx").innerText = "ניקוד ל-X "+ s1;
    document.getElementById("so").innerText = "ניקוד ל-O "+ s2;
    res()
}

function res1(params) {
    s1=0
    s2=0
    document.getElementById("sx").innerText = "ניקוד ל-X "+ s1;
    document.getElementById("so").innerText ="ניקוד ל-O "+ s2;
    res()
}

function res() {
    cells.forEach(cell => {
    cell.innerText=""
    })
    i=0
}

let i=0, s1=0,s2=0
const cells = document.querySelectorAll('.card div');

document.getElementById("rs").addEventListener("click", res1);

cells.forEach(cell => {
    cell.addEventListener("click", xo);
});


document.getElementById("sx").innerText = "ניקוד ל-X "+ s1;
document.getElementById("so").innerText = "ניקוד ל-O "+ s2;