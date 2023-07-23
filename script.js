const startbtn = document.querySelector("#startitup");
const inputBtn = document.querySelector("#input-btn");
const quizContainer = document.querySelector("#quiz");
const timer = document.querySelector("#timer");
const questionLine = document.querySelector("#question");
const answerDiv = document.querySelector("#choices");
const flashNote = document.querySelector("#notification");
const endScreen = document.querySelector("#end-game-screen");
const inputBox = document.querySelector("#input");
const inputForm = document.querySelector("#input-form");
const scoreboard = document.querySelector("#scoreboard");
const coolcatpic = document.querySelector("#coolcatpic");
const highScoresSection = document.querySelector("#highscores-section")

const questionlist = [
  {
    question: "What is a GPU scalper?",
    choices: [
      "1: A person who buys GPUs and resells them at higher prices",
      "2: A specialized software used to mine cryptocurrencies",
      "3: A type of computer virus that affects GPUs",
      "4: A term used to describe a high-performance gaming PC",
    ],
    answer: "A person who buys GPUs and resells them at higher prices",
  },
  {
    question: "Why are GPU scalpers a problem?",
    choices: [
      "They contribute to the shortage of GPUs in the market",
      "They provide a reliable source for purchasing GPUs",
      "They help reduce the prices of GPUs",
      "They are not a problem at all",
    ],
    answer: "They contribute to the shortage of GPUs in the market",
  },
  {
    question: "What is the common tactic used by GPU scalpers?",
    choices: [
      "Buying GPUs in bulk from manufacturers",
      "Providing GPUs to gamers at affordable prices",
      "Using bots to purchase large quantities of GPUs online",
      "Donating GPUs to charity organizations",
    ],
    answer: "Using bots to purchase large quantities of GPUs online",
  },
  {
    question: "How does GPU scalping impact gamers?",
    choices: [
      "It benefits gamers by offering exclusive deals",
      "It helps gamers get GPUs at regular market prices",
      "It prevents gamers from getting GPUs at fair prices",
      "It has no impact on gamers",
    ],
    answer: "It prevents gamers from getting GPUs at fair prices",
  },
  {
    question: "What can be done to tackle GPU scalping?",
    choices: [
      "Nothing can be done, it's inevitable",
      "Manufacturers should increase GPU prices",
      "Implementing anti-scalping measures during online sales",
      "Encouraging scalpers to continue their practices",
    ],
    answer: "Implementing anti-scalping measures during online sales",
  },
  {
    question: "What is a potential consequence of GPU scalping?",
    choices: [
      "Increased availability of GPUs in the market",
      "Decreased demand for high-performance computers",
      "Decreased interest in gaming",
      "Inflated prices and reduced accessibility for gamers",
    ],
    answer: "Inflated prices and reduced accessibility for gamers",
  },
];

let indexShit = 0;
let noTime = 100;
let score = 0;
let flash;

const startTheDamThing = () => {
  window.timerInerval = setInterval(() => {
    timer.textContent = noTime;
    noTime--;
    if (noTime <= 0) {
      clearInterval(timerInerval);
      endShit();
    }
  }, 1000);
};

const startGame = () => {
  quizContainer.classList.remove("hide");
  startTheDamThing();
  displayShit();
};

const displayShit = () => {
  questionLine.textContent = questionlist[indexShit].question;

  let answerShit = questionlist[indexShit].choices;
  let theseAnswers = "";
  for (var i = 0; i < answerShit.length; i++) {
    theseAnswers += `
        <li>${answerShit[i]}</li>           
        `;
    answerDiv.innerHTML = theseAnswers;
  }
};

answerDiv.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.matches("li")) {
    checkShit(event.target.textContent);
  }
});

const checkShit = (element) => {
  const correctShit = questionlist[indexShit].answer;

  if (element === correctShit) {
    clearTimeout(flash)
    score++;
    flash = setTimeout(function(){
        flashNote.textContent = "you Right gueyyy"
    },1000)
  } else {
    clearTimeout(flash)
    score--;
    noTime -= 10;
    flash = setTimeout(function (){
        flashNote.textContent = "you suck!!!"
    })
  }

  indexShit++;

  if (questionlist.length > indexShit) {
    displayShit();
  } else {
    clearInterval(window.timerInerval);
    endShit();
  }
};

const endShit = () => {
  endScreen.classList.remove("hide");
};

const storeShit = (event) => {
  event.preventDefault();
  const initals = inputBox.value.trim();
  let scoreShit = JSON.parse(localStorage.getItem("scoreShit")) || [];

  let newShit = {
    initals: initals,
    score: score,
  };

  scoreShit.push(newShit);

  localStorage.setItem("scoreShit", JSON.stringify(scoreShit));
  highScoresSection.classList.remove("hide")
  coolcatpic.classList.remove("hide");
  inputBox.value = "";
};

const showShit = (event) => {
  event.preventDefault();
  scoreboard.classList.remove("hide");
  let showDemScores = JSON.parse(localStorage.getItem("scoreShit")) || [];
  let shitScores = "";
  for (var i = 0; i < showDemScores.length; i++) {
    shitScores += `
      
       <li>${showDemScores[i].initals} --- ${showDemScores[i].score}</li>
        
      `;

    scoreboard.innerHTML = shitScores;
  }
};

coolcatpic.addEventListener("mouseover", showShit);
inputBtn.addEventListener("click", storeShit);
startbtn.addEventListener("click", startGame);
