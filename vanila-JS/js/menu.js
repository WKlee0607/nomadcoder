const btoon = document.querySelector(".toggle");
const dap = document.querySelector(".dap");
const menu = document.querySelector(".toggle span:first-child")
const X = document.querySelector(".toggle span:last-child")

function toggleMenu(){
    dap.classList.toggle("hidden");
    menu.classList.toggle("hidden");
    X.classList.toggle("hidden");
}

btoon.addEventListener("click",toggleMenu);