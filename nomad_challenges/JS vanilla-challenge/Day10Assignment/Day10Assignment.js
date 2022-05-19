const eve = document.querySelector("#date")

function getChristmas(){
    const today = new Date();
    const year = today.getFullYear();
    const christmas = new Date(`${year}-12-25 00:00:00+0900`);
    const gap = christmas - today;
    if (gap < 0){
        const nextyear = year + 1;
        const nextchristmas = new Date(`${nextyear}-12-25 00:00:00+0900`)
        const nextgap = nextchristmas - today;
        const nextday = String(Math.floor(nextgap/(1000*60*60*24))).padStart(2,"0");
        const nexthours = String(Math.floor((nextgap/(1000*60*60)) %24)).padStart(2,"0");
        const nextminutes = String(Math.floor((nextgap/(1000*60))%60)).padStart(2,"0");
        const nextseconds = String(Math.floor((nextgap/1000)%60)).padStart(2,"0");
        eve.innerText = `${nextday}d ${nexthours}h ${nextminutes}m ${nextseconds}s`;
    } else {
        const day = String(Math.floor(gap/(1000*60*60*24))).padStart(2,"0");
        const hours = String(Math.floor((gap/(1000*60*60)) %24)).padStart(2,"0");
        const minutes = String(Math.floor((gap/(1000*60))%60)).padStart(2,"0");
        const seconds = String(Math.floor((gap/1000)%60)).padStart(2,"0");
        eve.innerText = `${day}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

function countDown(){
    getChristmas();
    setInterval(getChristmas,1000);
}

countDown()

//Math.floor : 주어진 수와 같거나 작은 수 중에서 가장 큰 정수를 반환하는 함수입니다.