import http from "http";
import SocketIO from "socket.io";
import express from "express";


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // 현재 실행중인 폴더 경로 = process.cwd()와 같다고 볼 수 있음. __dirname : returns the directory name of the directory containing the JavaScript source code file// process.cwd(): returns the current working directory, 즉, node명령을 호출한 디렉토리입니다.
app.use("/public", express.static(__dirname + "/public"));//이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static을 사용하십시오. -> app.use('/static', express.static(__dirname + '/public')); 이제 /static 경로 접두부를 통해 public 디렉토리에 포함된 파일을 로드할 수 있습니다.// 정적 파일이란, 직접 값에 변화를 주지 않는 이상 변하지 않는 파일을 의미합니다. 예를 들면, image, css 파일, js 파일 등을 의미합니다. -> static: 정적 파일만을 제공////보안상 유저는 서버 내 모든 폴더를 전부 들여다볼 수 없음(보안상의 이유 때문에) 그래서 유저가 볼 수 있는 폴더를 따로 지정해야댐. 즉, 이건 Front-end폴더임.
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));// -> catchall : 어떤 url을 가든 "/"로 돌아오게 만들어 home.pug만 볼 수 있도록 하기. 이번 프로젝트에서는 하나의 url만 사용할 것이기 때문에 이렇게 처리해줌.

const httpServer = http.createServer(app);//http 서버 만들기.
const ioServer = SocketIO(httpServer);//SocketIO로 서버를 만든 것임. 이전처럼 http위에 서버를 덮어썼지만.

ioServer.on("connection",(backSocket) => {
    backSocket["nickname"] = "Anonymous";
    backSocket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
    });
    backSocket.on("enter_room", (roomName, done) => {
        backSocket.join(roomName);
        done();
        backSocket.to(roomName).emit("welcome", backSocket.nickname);
    });
    backSocket.on("disconnecting",() => {
        backSocket.rooms.forEach((room) => backSocket.to(room).emit("bye", backSocket.nickname));//backSocket.rooms: {"id~~", "roomName"}
    });
    backSocket.on("new_message",(msg, room, done) => {
        backSocket.to(room).emit("new_message", `${backSocket.nickname}: ${msg}`);
        done();
    });
    backSocket.on("nickname",(nickname) => backSocket["nickname"] = nickname);
});
/*const wss = new WebSocket.Server({ server });//ws 서버 만들기 -> websocket을 만들 때 http위에 쌓아올리면서 만들었음.

const sockets = [];//fakeDB

wss.on("connection",(backSocket) => {// on: backend(server)의 eventListener임 -> 브라우저의 event에 귀 기울임
    sockets.push(backSocket);//fakeDB에 연결된 socket(브라우저 혹은 유저) 넣어주기
    backSocket["nickname"] = "Anonymous"; //아직 닉네임 정하지 않은 사람.
    console.log("Connected to Browser ✅");
    backSocket.on("close", () => console.log("Disconnected to the Brower ❌"));//Browser 연결이 끊기면 알려주는 콘솔창
    
    backSocket.on("message",(msg) =>{
        const message = JSON.parse(msg);
        switch (message.type){
            case "new_message":
                sockets.forEach((aSocket) => {aSocket.send(`${backSocket.nickname}: ${(message.payload).toString()}`)});
            case "nickname":
                backSocket["nickname"] = message.payload;// socket에 닉네임 넣어주기
        };
    });
}); */

const handleListen = () => console.log(`Listening on http://localhost:3000, ws://localhost:3000`);
httpServer.listen(3000,handleListen);