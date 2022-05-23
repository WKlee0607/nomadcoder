const body = document.querySelector("body");
const biUrls = [
    "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDI0M3wwfDF8cmFuZG9tfHx8fHx8fHx8MTY1MzI0MDAwOA&ixlib=rb-1.2.1&q=80"
];


function randomChooseBackgroundImage(){
    const chosenImage = biUrls[Math.floor(Math.random() * biUrls.length)];
    body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${chosenImage})`
}

randomChooseBackgroundImage();



    




const images = [
    "0.jpeg",
    "1.jpeg"
];

const chosenImage = images[Math.floor(Math.random()*images.length)];

const bgIamge = document.createElement("img");

bgIamge.src = `img/${chosenImage}`;

const username = document.querySelector("#greeting");
document.body.appendChild(bgIamge);

