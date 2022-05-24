const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const link = document.querySelector("a");
const greeting = document.querySelector("#greeting");
const greetingDiv = document.querySelector("#greeting-div");
const button = document.querySelector("#greeting-div button");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event){
    event.preventDefault();
    console.dir(event);
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY,username);
    paintGreetings(username);
}

function paintGreetings(username){
    greeting.innerText = `${username}'s privacy ☃︎`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greetingDiv.classList.remove(HIDDEN_CLASSNAME);
    button.classList.remove(HIDDEN_CLASSNAME);
    button.addEventListener("click",deleteName);
}


function deleteName(event){
    localStorage.removeItem(USERNAME_KEY);
    window.location.reload();
}

const savedUsername = localStorage.getItem(USERNAME_KEY);


if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else{
    paintGreetings(savedUsername);
}



