import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views") // 현재 실행중인 폴더 경로 = process.cwd()와 같다고 볼 수 있음. __dirname : returns the directory name of the directory containing the JavaScript source code file// process.cwd(): returns the current working directory, 즉, node명령을 호출한 디렉토리입니다.
app.use("/public", express.static(__dirname + "/public"));//이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static을 사용하십시오. -> app.use('/static', express.static(__dirname + '/public')); 이제 /static 경로 접두부를 통해 public 디렉토리에 포함된 파일을 로드할 수 있습니다.// 정적 파일이란, 직접 값에 변화를 주지 않는 이상 변하지 않는 파일을 의미합니다. 예를 들면, image, css 파일, js 파일 등을 의미합니다. -> static: 정적 파일만을 제공////보안상 유저는 서버 내 모든 폴더를 전부 들여다볼 수 없음(보안상의 이유 때문에) 그래서 유저가 볼 수 있는 폴더를 따로 지정해야댐. 즉, 이건 Front-end폴더임.
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));// -> catchall : 어떤 url을 가든 "/"로 돌아오게 만들어 home.pug만 볼 수 있도록 하기. 이번 프로젝트에서는 하나의 url만 사용할 것이기 때문에 이렇게 처리해줌.


const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
//server만들기: babel, Nodemon, Express로 서버 만든 것임.