const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector(".music-play");
const stopBtn = document.querySelector(".music-stop");
const nextBtn = document.querySelector(".next-music");
const musicTitle = document.querySelector(".music-title h1");

//const audio = new Audio("src주소삽입");  -> 이런 식으로도 만들 수 있음. 이거는 이따가 해보기!
//audio를 설정할 때는 함수 밖에서 설정을 해줘야할 듯!
const audioSource = [
    "말리지마-(여자)아이들",
    "mybag-(여자)아이들",
    "TOMBOY-(여자)아이들"
];

const MUSIC_COUNT = audioSource.length;

let currentAudio = 0;

function playAudio(){
    musicContainer.volume = 0.5;
    musicContainer.loop = true;
    musicContainer.play();
}

function stopAudio(){
    musicContainer.pause();
}

function loadAudio(){
    const source = document.querySelector(".music-source");
    source.src = `audio/${audioSource[currentAudio]}.mp3`;
    musicContainer.load();
    playAudio();
    musicTitle.innerText = audioSource[currentAudio];
}

function handleNextButtinClick(){
    if(currentAudio < (MUSIC_COUNT-1)){
        currentAudio += 1;
    }else{
        currentAudio =0;
    }

    musicContainer.pause();
    loadAudio();
}

playBtn.addEventListener("click",loadAudio);
stopBtn.addEventListener("click",stopAudio);
nextBtn.addEventListener("click",handleNextButtinClick);
