const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector(".music-play");
const stopBtn = document.querySelector(".music-stop");
const nextBtn = document.querySelector(".next-music");
const resetBtn = document.querySelector(".music-reset");
const musicTitle = document.querySelector(".music-title h1");

//const audio = new Audio("src주소삽입");  -> 이런 식으로도 만들 수 있음. 이거는 이따가 해보기!
//audio를 설정할 때는 함수 밖에서 설정을 해줘야할 듯!
const audioSource = [
    "말리지마-(여자)아이들",
    "mybag-(여자)아이들",
    "TOMBOY-(여자)아이들"
];

const urlLength = (audioSource.length -1);

let currentUrl = 0;

let audio = new Audio();
    
let current = audio.currentTime;

function playAudio(){
    audio.src = `audio/${audioSource[currentUrl]}.mp3`
    audio.load();
    musicTitle.innerText = audioSource[currentUrl];
    audio.volume = 0.5
    audio.currentTime = current;
    audio.play();
}

function nextCurrenturl(){
    if(currentUrl < urlLength){
        currentUrl += 1;
    }else{
        currentUrl = 0;
    }
    audio.pause();
    current = 0;
    playAudio();
}

function pauseAudio(){
    audio.pause();
    current = audio.currentTime;
}

function resetCurrent(){
    current = 0;
    playAudio();
}



stopBtn.addEventListener("click",pauseAudio);
playBtn.addEventListener("click",playAudio);
nextBtn.addEventListener("click",nextCurrenturl);
resetBtn.addEventListener("click",resetCurrent);