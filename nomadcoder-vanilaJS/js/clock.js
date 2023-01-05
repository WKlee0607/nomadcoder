const clock = document.querySelector("#clock");

function getClock(){
    const date = new Date();
    const months = String(date.getMonth()+1); // getMonth는 0~11까지만 return so, +1
    const days = String(date.getDay()+1);
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `(${months}/${days}) ${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);