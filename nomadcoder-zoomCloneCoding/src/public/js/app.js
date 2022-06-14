const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const frontSocket = new WebSocket(`ws://${window.location.host}`);//frontend의 socket등록.

function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}; //JSON형태로 {type:"message", payload:"input.value"} 이런 식으로 보내주는 것.

frontSocket.addEventListener("open",() => {
    console.log("Connected to Server ✅");
});

frontSocket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

frontSocket.addEventListener("close",() => {
    console.log("Disconnected to Server ❌");
});


function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    frontSocket.send(makeMessage("new_message", input.value));
    input.value="";
};

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    frontSocket.send(makeMessage("nickname",input.value));
    input.value="";
};

messageForm.addEventListener("submit",handleSubmit);
nickForm.addEventListener("submit",handleNickSubmit);