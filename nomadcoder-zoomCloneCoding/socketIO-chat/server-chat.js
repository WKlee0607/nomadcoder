import http from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import express from "express";


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // 현재 실행중인 폴더 경로 = process.cwd()와 같다고 볼 수 있음. __dirname : returns the directory name of the directory containing the JavaScript source code file// process.cwd(): returns the current working directory, 즉, node명령을 호출한 디렉토리입니다.
app.use("/public", express.static(__dirname + "/public"));//이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static을 사용하십시오. -> app.use('/static', express.static(__dirname + '/public')); 이제 /static 경로 접두부를 통해 public 디렉토리에 포함된 파일을 로드할 수 있습니다.// 정적 파일이란, 직접 값에 변화를 주지 않는 이상 변하지 않는 파일을 의미합니다. 예를 들면, image, css 파일, js 파일 등을 의미합니다. -> static: 정적 파일만을 제공////보안상 유저는 서버 내 모든 폴더를 전부 들여다볼 수 없음(보안상의 이유 때문에) 그래서 유저가 볼 수 있는 폴더를 따로 지정해야댐. 즉, 이건 Front-end폴더임.
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));// -> catchall : 어떤 url을 가든 "/"로 돌아오게 만들어 home.pug만 볼 수 있도록 하기. 이번 프로젝트에서는 하나의 url만 사용할 것이기 때문에 이렇게 처리해줌.

const httpServer = http.createServer(app);//http 서버 만들기.
const ioServer = new Server(httpServer, {
    cors: {
      origin: ["https://admin.socket.io"],
      credentials: true
    },
  });//SocketIO로 서버를 만든 것임. 이전처럼 http위에 서버를 덮어썼지만.

instrument(ioServer, {
    auth: false
});

function publicRooms(){
    const {sockets : {adapter: {sids, rooms}}} = ioServer;
    // 위의 콘드는 밑의 두 줄을 풀어쓴 거. 	
	//const sids = ioServer.sockets.adapter.sids; 
    //const rooms = ioServer.sockets.adapter.rooms;
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if(sids.get(key) === undefined){
            publicRooms.push(key);
        }
    });
    return publicRooms;
};// rooms에서 sids(개인방)을 빼주는 작업임.

function countRoom(roomName){
    return ioServer.sockets.adapter.rooms.get(roomName)?.size
};

ioServer.on("connection",(backSocket) => {
    backSocket["nickname"] = "Anonymous";
    backSocket.onAny((event) => {
        console.log(ioServer.sockets.adapter);
        console.log(`Socket Event: ${event}`);
    });
    backSocket.on("enter_room", (roomName, done) => {
        backSocket.join(roomName);
        done();
        backSocket.to(roomName).emit("welcome", backSocket.nickname, countRoom(roomName));
        ioServer.sockets.emit("room_change", publicRooms());
    });
    backSocket.on("disconnecting",() => {
        backSocket.rooms.forEach((room) => backSocket.to(room).emit("bye", backSocket.nickname, countRoom(room) -1 ));//backSocket.rooms: {"id~~", "roomName"}
    });
    backSocket.on("disconnect", () => {
        ioServer.sockets.emit("room_change", publicRooms());
    });
    backSocket.on("new_message",(msg, room, done) => {
        backSocket.to(room).emit("new_message", `${backSocket.nickname}: ${msg}`);
        done();
    });
    backSocket.on("nickname",(nickname) => backSocket["nickname"] = nickname);
});


const handleListen = () => console.log(`Listening on http://localhost:3000, ws://localhost:3000`);
httpServer.listen(3000,handleListen);
