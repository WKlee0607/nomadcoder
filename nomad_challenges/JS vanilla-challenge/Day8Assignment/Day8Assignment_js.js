const randomForm = document.querySelector(".random-form");
const maxnum = document.querySelector(".max-column .max-column__num");
const guessnum = document.querySelector(".guess-column .guess-column__num");
const chooseNumSqure = document.querySelector(".choose_num");
const winSqure = document.querySelector(".win")

const FONTCOLOR = "font-color";


function handleRandomSubmit(event){
    event.preventDefault();
    const maximum = maxnum.valueAsNumber;
    const guessMyNum = guessnum.valueAsNumber;
    if(guessMyNum <= maximum){
        const randomnum = Math.ceil(Math.random()*(maximum));
        chooseNumSqure.innerHTML = `<span>You chose: ${guessMyNum} </span><span>, themachine chose ${randomnum}.</span>`;
        if(guessMyNum===parseInt(randomnum)){
            winSqure.classList.add(FONTCOLOR);
            winSqure.innerHTML = "<span>You Win</span>"
        } else{
            winSqure.classList.remove(FONTCOLOR);
            winSqure.innerHTML = "<span>You lose</span>"
        }
    }else{
        alert("Please write a number that is smaller than max number");
    }
    
}

randomForm.addEventListener("submit",handleRandomSubmit);


