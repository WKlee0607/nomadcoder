const colors = [
    "#ef5777",
    "#575fcf",
    "#4bcffa",
    "#34e7e4",
    "#0be881",
    "#f53b57",
    "#3c40c6",
    "#0fbcf9",
    "#00d8d6",
    "#05c46b",
    "#ffc048",
    "#ffdd59",
    "#ff5e57",
    "#d2dae2",
    "#485460",
    "#ffa801",
    "#ffd32a",
    "#ff3f34"
  ];
  const body = document.body;
  const backbtn = document.querySelector(".back-btn");
  const returnBtn = document.querySelector(".return-btn");
  
  function handleOnClick() {
    const chosenColors1 = colors[Math.floor(Math.random() * colors.length)];
    const chosenColors2 = colors[Math.floor(Math.random() * colors.length)];
    body.style.backgroundImage = `linear-gradient(45deg,${chosenColors1},${chosenColors2})`;
  }

  function returnColor(){
    body.style.backgroundImage = "none";
    body.style.backgroundColor = "rgb(78, 78, 78)";
  }
  
  backbtn.addEventListener("click", handleOnClick);
  returnBtn.addEventListener("click", returnColor);

  