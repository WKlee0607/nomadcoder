const clock = document.querySelector("h2#clock");

function getClock(){
    const date = new Date();
    const months = String(date.getMonth());
    const days = String(date.getDay())
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `(${months}/${days}) ${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);