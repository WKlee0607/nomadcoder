const frontSocket = io();//backend Socket과 연결됨.

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

let myStream;
let muted = false;
let cameraOff = false;

async function getCameras(){
    try{
        const devices = await navigator.mediaDevices.enumerateDevices();
        //console.log(devices); -> 확인해보삼
        const cameras = devices.filter((device) => device.kind ===  "videoinput");//true인 애들만 뽑아서 새 array만듦.
        //console.log(cameras); -> videoinput만 있는 새 array 만들어짐.
        const currentCamera = myStream.getVideoTracks()[0];
        cameras.forEach((camera) => {
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.innerText = camera.label;
            if(currentCamera.label === camera.label){
                option.selected = true;
            }
            camerasSelect.appendChild(option);
        })
    } catch(error){
        console.log(error);
    }
}

async function getMedia(deviceId){
    const initialConstrains = {
        audio: true,
        video: { facingMode : "user" },
    };
    const cameraConstrains = {
        audio: true,
        video: { deviceId: { exact: deviceId } },
    }
    try{
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId? cameraConstrains : initialConstrains
        );//user의 media를 가져옴(우린 특정 값을 줘서 카메라와 오디오를 가져옴)
        myFace.srcObject = myStream;
        if(!deviceId){
            await getCameras();
        }// deviceId가 없다면 카메라 목록을 가져와라! -> if문 없이 하면 카메라 바꿀 때마다 이 gerMedia함수가 계속 실행되니까 목록이 늘어남
    } catch(error){
        console.log(error)
    }
};

getMedia();

function handleMuteClick(){
    //console.log(myStream.getAudioTracks());//-> track정보(inspect) 제공
    myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    if(!muted){//muted = true라면 - default와 반대되는 값이라면// !: 반대되는 값을 리턴해줌
        muteBtn.innerText = "Unmute";
        muted = true;
    } else {
        muteBtn.innerText = "Mute";
        muted = false;
    }
}
function handleCameraClick(){
    //console.log(myStream.getVideoTracks()); -> track정보(inspect) 제공
    myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    if(cameraOff){//cameraOff가 참일 때
        cameraBtn.innerText = "Turn Camera Off";
        cameraOff = false;
    } else{
        cameraBtn.innerText = "Turn Camera On";
        cameraOff = true;
    }
}

async function handleCameraChange(){
    await getMedia(camerasSelect.value);
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);