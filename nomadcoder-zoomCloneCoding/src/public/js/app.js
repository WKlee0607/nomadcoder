const frontSocket = io();//backend Socket과 연결됨.

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

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
    if(myPeerConnection){
        const videoTrack = myStream.getVideoTracks()[0];//이미 이 함수 첫째줄에서 새로운 stream으로 바뀌었기 떄문에 여기서 그냥 videoTrack을 가져와도 바뀐 track을 가져올 것임.
        //console.log(myPeerConnection.getSenders()); -> RTCRtpSender에 관한 data가 있음. 여기서 track에서 kind:video인 Sender를 보면 됨,
        const videoSender = myPeerConnection.getSenders().find((sender) => sender.track.kind === "video");//peerConnection에서 Send하고 있는 정보의 videoTrack부분을 가져옴.
        videoSender.replaceTrack(videoTrack);//가져온 Sender의 viedoTrack부분을 새로운 Stream의 비디오 트랙으로 변경해줌
    }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);


//Welcome Form (join a room)

const welcome = document.getElementById("welcome");
const welcomeFoam = welcome.querySelector("form");

async function initCall(){
    welcome.hidden = true;
    call.hidden = false;
    await getMedia();
    makeConnection();
}

async function handleWelcomSubmit(event){
    event.preventDefault();
    const input = welcomeFoam.querySelector("input");
    await initCall();//-> 원래 join_room emit에 있었음. 근데 유저가 방에 들어오고 이 함수가 실행되면 처리 속도가 너무 빨라서 뒤에 들어온 손님 유저가 offer를 받지 못해서 이렇게 밖으로 빼줌.
    frontSocket.emit("join_room", input.value);
    roomName = input.value;
    input.value="";
}

welcomeFoam.addEventListener("submit", handleWelcomSubmit);

//Socket Code

frontSocket.on("welcome", async () => {
    const offer = await myPeerConnection.createOffer();//3단계 : offer(초대코드) 만들기 -> 이미 들어와있던 사람에게만 작용하는 코드임.
    myPeerConnection.setLocalDescription(offer);//4단계: 주인장 쪽 콘센트 연결. offer로 연결 구성. -> 이미 들어와있던 사람에게만 작용하는 코드임.
    //console.log(offer);
    console.log("sent the offer");
    frontSocket.emit("offer",offer,roomName);//5단계: offer 보내기
});// -> 주인쪽 브라우저에서 돌아가는 코드

frontSocket.on("offer", async (offer) => {//6단계: offer받기
    console.log("received the offer");
    myPeerConnection.setRemoteDescription(offer);//7단계: 손님쪽 remote 콘센트 연결
    const answer = await myPeerConnection.createAnswer();// 8단계: answer 생성.
    //console.log(answer);
    myPeerConnection.setLocalDescription(answer);//9단계 : 손님쪽 local 콘센트 연결.
    frontSocket.emit("answer", answer, roomName);//10단계 : 주인장한테 answer보내기
    console.log("sent the answer");
});// -> 손님쪽 브라우저에서 돌아가는 코드

frontSocket.on("answer",(answer) => {
    console.log("received the answer");
    myPeerConnection.setRemoteDescription(answer);//11단계 : 주인장 remote연결
});

frontSocket.on("ice", candidate => {
    console.log("received candidate");
    myPeerConnection.addIceCandidate(candidate);//14단계 : 두 브라우저가 보낸 candidate 서로 받기
});

//RTC Code

function makeConnection(){
    myPeerConnection = new RTCPeerConnection();// 1단계: 두 브라우저 사이에 peer connection 만듦
    myPeerConnection.addEventListener("icecandidate", handleIce);//12단계 : IceCandidate 생성
    myPeerConnection.addEventListener("addstream", handleAddStream);//15 단계: 상대방 stream add하기 및 media 불러오기
    //console.log(myStream.getTracks()); //-> video & Audio Tracks가 담겨있음. 즉 우리 stream의 데이터임.
    myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));//2단계 : 내 stream데이터를 peer연결에 넣어주는 것임 // 새로운 장치를 사용하면 Stream을 새로 바꾸는데, 여기서도 새로운 Stream을 보냄.
}
function handleIce(data){
    console.log("sent candidate");
    //console.log(data); -> candidate찾으삼
    frontSocket.emit("ice", data.candidate , roomName);// 13단계 : IceCandidate를 다른 브라우저로 보내기 위해 서버로 보내기 -> 두 브라우저에게 동시에 적용되는 코드임. 동시에 두 브라우저가 서로에게 data.candidate를 보냄
}

function handleAddStream(data){//15 단계: 상대방 stream add하기 및 media 불러오기
    //console.log(data.stream);// <- 상대 브라우저 stream
    //console.log(myStream);// <- 내 stream
    const peerFace = document.getElementById("peerFace");
    peerFace.srcObject = data.stream;   
}