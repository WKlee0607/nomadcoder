const body = document.querySelector("body");
const biUrls = [
    "https://images.unsplash.com/photo-1559286023-3d27c0e06d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1MzI0MjMxMA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw0MDI0M3wwfDF8cmFuZG9tfHx8fHx8fHx8MTY1MzI0MDAwOA&ixlib=rb-1.2.1&q=80",
    "https://images.unsplash.com/photo-1426901466156-3990a15c82b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1MzI0NjAzMg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
];


function randomChooseBackgroundImage(){
    const chosenImage = biUrls[Math.floor(Math.random() * biUrls.length)];
    body.style.backgroundImage = `linear-gradient(rgba(108, 104, 146, 0.126), rgba(0, 0, 0, 0.3)), url(${chosenImage})`
}

randomChooseBackgroundImage();



    










/*const images = [
    "0.jpeg",
    "1.jpeg",
    "2.jpeg",
    "3.jpeg"
];

const chosenImage = images[Math.floor(Math.random()*images.length)];

const bgIamge = document.createElement("img");

bgIamge.src = `img/${chosenImage}`;

document.body.appendChild(bgIamge);*/