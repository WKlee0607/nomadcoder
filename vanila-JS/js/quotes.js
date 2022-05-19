const quotes = [
{quote:"Be yourself; everyone else is already taken.",
    author:"Oscar Wilde"
},
{quote:"I am selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can not handle me at my worst, then you sure as hell do not deserve me at my best.",
author:"Marilyn Monroe"
},
{quote:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
author:"Albert Einstein"
},
{quote:"You only live once, but if you do it right, once is enough.",
author:"Mae West"
},
{quote:"Be the change that you wish to see in the world.",
author:"Mahatma Gandhi"
},
{quote:"If you tell the truth, you don't have to remember anything.",
author:"Mark Twain"
},
{quote:"I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
author:"Maya Angelou"
},
{quote:"A friend is someone who knows all about you and still loves you.",
author:"Elbert Hubbard"
},
{quote:"Always forgive your enemies; nothing annoys them so much.",
author:"Oscar Wilde"
},
{quote:"To live is the rarest thing in the world. Most people exist, that is all.",
author:"Oscar Wilde"
},
{quote:"Live as if you were to die tomorrow. Learn as if you were to live forever.",
author:"Mahatma Gandhi"
},
{quote:"Why not change the world?",
author:"Handong University"
},
{quote:"Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
author:" Martin Luther King Jr."
}
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * (quotes.length))];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
//Math.random()은 0과 1사이의 수를 랜덤으로 내보내줌 즉, 0과 1은 안 나옴!!

