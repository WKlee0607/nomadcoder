const frontSocket = io();//backend Socket과 연결됨.

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
const roomMsgForm = room.querySelector("#msg");
const roomNameForm = room.querySelector("#name");

roomMsgForm.hidden = true;

let roomName;

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
};

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    frontSocket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value = "";
};

function handleNicknameSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#name input");
    frontSocket.emit("nickname", input.value);
};

function showRoom(){
    welcome.hidden = true;
    roomNameForm.hidden = true;
    roomMsgForm.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room: ${roomName}`;
    roomMsgForm.addEventListener("submit",handleMessageSubmit);
};

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    frontSocket.emit("enter_room", input.value, showRoom);//Websocket(WS)에서의 send와 같은 역할인 거 같음. WS에서는 object를 string형태로 보냈어야 했는데, SocketIO에서는 그럴 필요없이 바로 object로 보낼 수 있음, 또한 3번쨰 arg로 callback fn이 들어가는데 이 fn도 서버(backend)에서 인수로 받아 서버에서 제어 가능  물론 실행은 frontend에서 함!
    roomName = input.value;
    input.value = "";
};

form.addEventListener("submit",handleRoomSubmit);
roomNameForm.addEventListener("submit",handleNicknameSubmit);

frontSocket.on("welcome",(user) => {
    addMessage(`${user} joined!`);
});

frontSocket.on("bye",(left) => {
    addMessage(`${left} left ㅠㅠ`);
});

frontSocket.on("new_message", (msg) => {
    addMessage(msg);
});