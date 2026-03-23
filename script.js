//DOM elements
let numBtns = document.querySelectorAll(".numBtn")
let result = document.getElementById("result")
let calcBtns = document.querySelectorAll(".calcBtn")
let resultBtn = document.querySelector(".resultBtn")
let clearBtn = document.querySelector(".clearBtn")
let deleteBtn = document.querySelector(".deleteBtn")
let floatBtn = document.querySelector(".floatBtn")
let percentBtn = document.querySelector(".percentBtn")

function add(a, b){
    return a+b
}

function substract(a, b){
    return a-b
}

function multiply(a, b){
    return a*b
}

function divide(a, b){
    return a/b
}

let num1;
let num2;
let operator;
let operationResult;
let isFinished = false;

function operate(a, operator, b){
    const n1 = Number(a);
    const n2 = Number(b);
    let result;
    if (operator === "+"){
        result = add(n1, n2)
    } else if (operator === "-"){
        result = substract(n1, n2)
    } else if (operator === "*"){
        result = multiply(n1, n2)
    } else if (operator === "/"){
        result = divide(n1, n2)
    }
    return Number(result.toFixed(8));
}

numBtns.forEach((numBtn) => {
    numBtn.addEventListener("click", (e) => {
        // Reset logic: if `isFinished` is true, it means we've already pressed the equals sign while performing an operation
        // We then set `isFinished` back to false to begin a new operation.
        if (isFinished) {
            num1 = undefined;
            num2 = undefined;
            operator = undefined;
            isFinished = false;
        }

        if (num1 === undefined){
            num1 = e.target.innerText;
            result.textContent = num1
        } else if (num1 !== undefined && operator === undefined){
            num1 = `${num1}${e.target.innerText}`;
            result.textContent = num1;
        } else if (num1 !== undefined && operator !== undefined && num2 === undefined){
            num2 = parseInt(e.target.innerText)
            result.textContent = `${num1} ${operator} ${num2}`
        } else if (num1 !== undefined && operator !== undefined && num2 !== undefined){
            num2 = `${num2}${e.target.innerText}`;
            result.textContent = `${num1} ${operator} ${num2}`
        } else if (num1 !== undefined && operator !== undefined && num2 !== undefined && operationResult !== undefined){
            num1 = undefined;
            num2 = undefined;
            operator = undefined;
            operationResult = undefined;
            num1 = e.target.innerText;
            result.textContent = num1
        }
    })
})

calcBtns.forEach((calcBtn) => {
    calcBtn.addEventListener("click", (e) => {
        isFinished = false; // If we press an operator after an operation, we allow the chain to continue
        if ((num1 !== undefined) && (num2 !== undefined)){
            operationResult = operate(num1, operator, num2);
            result.textContent = operationResult;
            operator = e.target.innerText;
            console.log(operator);
            num1 = operationResult;
            num2 = undefined;
        } else if ((num1 !== undefined)){
            operator = e.target.innerText;
            result.textContent = `${num1} ${operator}`
            // If num1 ends with a dot (ej 10.), remove the dot when we operate with it
            let num1Str = num1.toString();
                if (num1Str.endsWith(".")){
                num1 = num1.slice(0, -1)
                result.textContent = `${num1} ${operator}`
                }
        }
    })
})

resultBtn.addEventListener("click", () => {
    operationResult = operate(num1, operator, num2);
    result.textContent = operationResult;
    // Prepare for the next operations
    num1 = operationResult; 
    num2 = undefined;
    operator = undefined;
    isFinished = true;
})

clearBtn.addEventListener("click", () => {
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    isFinished = false;
    result.textContent = "";
})

deleteBtn.addEventListener("click", () => {
    let contenido = result.textContent;
    result.textContent = contenido.slice(0, -1); 
    if (operator === undefined) {
        num1 = parseInt(result.textContent) || undefined;
    } else if (num2 === undefined){
        operator = undefined;
    } else if (num2 !== undefined){
        let partsResult = contenido.split(" ")
        let stringNum2 = partsResult[2]
        num2 = parseInt(stringNum2.slice(0, -1)) || undefined;
    }
})

floatBtn.addEventListener("click", () => {
    if (operator === undefined) {
        // We are at num1. If num1 doesn't include a ".", we add it
        if (num1 !== undefined && !num1.toString().includes(".")) {
            num1 = `${num1}.`; 
            result.textContent = num1;
        }
    } else {
        if (num2 !== undefined && !num2.toString().includes(".")) {
            num2 = `${num2}.`;
            result.textContent = `${num1} ${operator} ${num2}`;
        } else if (num2 === undefined) {
            // If we press dot before the num2 (ej: "10 + .5")
            num2 = "0.";
            result.textContent = `${num1} ${operator} ${num2}`;
        }
    }
})

percentBtn.addEventListener("click", () => {
    if (operator === undefined) {
        num1 = num1 / 100
        result.textContent = num1;
    } else if (num2 !== undefined){
        num2 = num2 / 100
        result.textContent = `${num1} ${operator} ${num2}`;
    }
})

