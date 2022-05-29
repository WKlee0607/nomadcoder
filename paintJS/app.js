const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //canvas는 context를 갖는데, 이 context는 canvas의 픽셀에 접근할 수 있도록 해주는 것임. 픽셀에 접근해서 움직일 수 있도록 해줌-픽셀 컨트롤. 그래야 그림을 그릴 수 있음. 
/*캔버스는 처음에 비어있습니다. 무언가를 표시하기 위해서, 어떤 스크립트가 랜더링 컨텍스트에 접근하여 그리도록 할 필요가 있습니다. <canvas> 요소는 getContext() 메서드를 이용해서, 랜더링 컨텍스트와 (렌더링 컨텍스트의) 그리기 함수들을 사용할 수 있습니다.  getContext() 메서드는 렌더링 컨텍스트 타입을 지정하는 하나의 파라메터를 가집니다. 본 튜토리얼에서 다루고 있는 2D 그래픽의 경우, CanvasRenderingContext2D (en-US)을 얻기위해 "2d"로 지정합니다.*/
//getContext("2d")는 이 canvas를 픽셀로 만들어 png형태로 만든다.
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

/*제가 헷갈려서 실제로 테스트해보면서 알아낸 내용인데,
맨 처음에 app.js에서 따로 canvas라는 element에 width와 height를 부여한 이유는
js는 동작할 때 html파일로부터 canvas의 생성 내용을 받아오는데, html에서 만든 canvas가 우리 눈에 보여질 때는 css로부터 크기정보를 받아서 그 내용을 바탕으로 보여집니다.
즉 js가 html로부터 jsCanvas라는 id값을 바탕으로 canvas라는 element를 생성할 때 css에서 지정한 width와 height는 받아오지 않습니다. 따라서 이걸 받아오기 위해서는 니꼬쌤이 하신 것처럼 따로 700을 지정하거나, offsetWidth 혹은 offsetHeight 등으로 매번 캔버스를 측정해서 가져오도록 지정해야 합니다.
이렇게 따로 지정하는 일이 없도록 하기 위해서는
＜canvas id="jsCanvas" width="700" height="700"＞
이런 식으로 html 내부에 width와 height를 지정하면 따로 element에 값을 부여하지 않아도 정상적으로 그림이 그려지게 됩니다.

즉, css로 설정한 canvas의 크기는 js에서 인식하지 못하기 때문에, js에서 따로 지정해준 것이다*/
canvas.width =  canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = "white"; //초기 배경설정
ctx.fillRect = ctx.fillRect(0,0, canvas.offsetWidth, canvas.offsetHeight);//초기 배경설정 왜냐하면 이걸 안해주면 아무 배경색을 안 칠했을 경우, savedImg배경색에 아무 색도 안 나오기 때문임.
ctx.strokeStyle = INITIAL_COLOR;//strokeStyle: canvas의 default색깔을 지정해준 것임. 우리가 stroke(그리다)하는 픽셀들의 default색깔
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;//canvas default굵기는 2.5로 지정


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(event){
    painting = true;
    ctx.beginPath();//기존의 경로를 삭제하고, 새로운 경로생성 즉, 출발점을 생성하게 됨 (이 코드가 없으면 두번째 클릭 때부터는 첫번째 클릭했던 곳에서부터 그림이 시작됨) 
}

function onMouseMove(event){
    const x = event.offsetX;//layerX or clientX:윈도우 바탕 내에서의 좌표//offsetX: canvas내부에서의 좌표! 우리는 캔버스 위애 그림 그릴 거니까 canvas내에서의 좌표만 필요함
    const y = event.offsetY;
    if(!painting){//!: paingting의 기본 값인 false일 때를 가져옴 !!:기존값의 반대되는 boolean값을 줌. 따라사 !painting === painting = false(위에서 지정해준 기본값) 
        ctx.moveTo(x,y);//새 경로를 만들진 않지만,처음 좌표에서 moveTo(x,y)의 좌표로 픽셀(?)을 옮겨줌. !painting이면 그림 그리진 않지만, 위치값만 옮겨줌 -> 없어도 되지만 위의 begintpath와 이중잠금의 역할인듯함. or 코딩으로만 그림을 그릴 때 사용될 것으로 추정됨// path:선(line)
        //ctx.beginPath();//이 자리에 들어가도 됨. -> 왜 painting===false일 때 경로를 지정해주냐? false일 때 경로를 매 마우스 움직일 때마다 바꿔서 true(mousedown)새 출발 좌표를 지정/ True일 때(mousedown) 지정하면 시작 경로랑 끝경로랑 겹쳐서 그림이 안 그려짐 
    } else{//painting === true (start) 
        ctx.lineTo(x,y);//선 끝 좌표 -> 매 마우스 움직일 때마다 바뀜//출발좌표에서 현재위치까지 선을 만ㄷ름 & 작은 선들을 모두 이어줌=계속 그리는 것처럼 보임. -> 이게 없어도 그려지는 이유: 선들이 매우 작아서 다 이어지는 것처럼 보임 but 엄청 가까이서 보면 실제로는 이어져 있지 않음.
        ctx.stroke();//선 그리기, stroke:획
    }
}

function handleColorClick(event){
    //console.log(event.target.style); 이걸로 누른 color div의 style파악하기
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    //console.log(event) -> console.log(event.target)
    const size =  event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "BackFill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCavasColorClick(){
    if(filling){
        ctx.fillRect(0,0, canvas.offsetWidth, canvas.offsetHeight);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");//image: URL형태임
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[by WK]🎨"; // download: 브라우저에게 URL을 다운로드 하라고 명령함. 이 때, 다운로드 하는 URL은 a의 href이고, download의 내용은 그 다운로드의 이름이 됨.
    link.click();//a.click() :가짜 버튼. href가 download되도록 click하여 실행한ㄷㅏ. href 값은 링크를 복사하거나 드래그할 때, 링크를 새 탭이나 새 창에서 열 때, 즐겨찾기에 추가할 때와 JavaScript를 불러오고 있거나 스크립트 오류가 발생했을 때, 아니면 비활성화했을 때 예측하지 못한 동작을 유발합니다. 또한 스크린 리더 등 보조 기술에도 잘못된 의미를 전달합니다.
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);//mousedown: mouse를 클릭한 상태일 때
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCavasColorClick);
    canvas.addEventListener("contextmenu",handleCM); //contextmenu: 우클릭할 경우.
}

if(colors){
    Array.from(colors).forEach((eachColordiv) => eachColordiv.addEventListener("click",handleColorClick));
    //forEach는 array에만 적용됨. (color)는 array의 한 개체를 지정하는 말임(임의로 내가 지정함). 
}

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}
