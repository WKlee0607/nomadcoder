const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_key = "todos";

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_key,JSON.stringify(toDos));//stirngify: array원본 형태를 문자 그대로 저장해주는 함수->"["a","b"]"
};

function deleteToDO(event){
    const li = event.target.parentElement;//console.dir을 통해 유추, target은 뭐를 눌렀을 때 이 함수가 시ㅣㄹ행됐는지 알려주고, parentElement는 이 target(button)의 부모 엘레멘트가 뭔지 알려줌.
    li.remove();//innerText만 없애는 게 아니라, 같이 생성된 것의 젤 위의 엘레멘트를 지워줌.
    toDos = toDos.filter((todo) => todo.id !==parseInt(li.id));
    saveToDos();
};

function paintToDO(newTodoObj){
    const li = document.createElement("li");
    li.id = newTodoObj.id;
    const span = document.createElement("span");
    span.innerText = newTodoObj.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click",deleteToDO);/*버튼 요소에 이 이벤트 리스너를 내포시켜주는 것임. */
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
};



function handleToDoSUbmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value; //<---여기서 변수 저장함.
    toDoInput.value ="";//<---위에서 저장했으므로 없애도 노상관임.
    const newTodoObj = {
        text:newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);//일케 저장하고 local storage에 넣을것암.but array형태로는 저장 불가.
    paintToDO(newTodoObj);
    saveToDos();
};

toDoForm.addEventListener("submit",handleToDoSUbmit);

const savedToDos = localStorage.getItem(TODOS_key);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);//"["a","b"]" 이런 형태로 저장된 string을 array타입으로 바꿔서 return해주는 함수:parse
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDO); //foreach: pasedToDos의 각각의 value에다가 함수를 적용시켜주는 함수:forEach = ()안에 좌측앤 item => 함수 내용 . 이런식으로 작성하면됨 //function은 event처럼 기본적으로 item이라는 변수를 기억하고 return해줌
};