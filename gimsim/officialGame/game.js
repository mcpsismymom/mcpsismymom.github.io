/* MONEY SYSTEM -------------------------------------------------------------------------------------
Keeps track of player balance and upgrades.
*/


var MoneySystem = class MoneySystem {
  constructor() {
    // Upgrade Levels
    this.mpq = 1;
    this.mpqLev = 1;
    this.strBonus = 1;
    this.strBonusLev = 1;
    this.multi = 1;
    this.multiLev = 1;
    this.ins = 0;
    this.insLev = 1;

    // Upgrade Prices
    this.mpqCost = [
      [2, 5, 10],
      [3, 50, 100],
      [4, 100, 1000],
      [5, 500, 10000],
      [6, 2000, 75000],
      [7, 5000, 300000],
      [8, 10000, 1000000],
      [9, 250000, 10000000],
      [10, 1000000, 100000000]
    ];

    this.strBonusCost = [
      [2, 3, 20],
      [3, 10, 200],
      [4, 50, 2000],
      [5, 250, 20000],
      [6, 1200, 200000],
      [7, 6500, 2000000],
      [8, 35000, 20000000],
      [9, 175000, 200000000],
      [10, 1000000, 2000000000]
    ];

    this.multiCost = [
      [2, 1.5, 50],
      [3, 2, 300],
      [4, 3, 2000],
      [5, 5, 12000],
      [6, 8, 85000],
      [7, 12, 700000],
      [8, 18, 6500000],
      [9, 30, 65000000],
      [10, 100, 1000000000]
    ];

    this.insCost = [
      [2, 0.1, 10],
      [3, 0.25, 250],
      [4, 0.4, 1000],
      [5, 0.5, 25000],
      [6, 0.7, 100000],
      [7, 0.8, 1000000],
      [8, 0.9, 5000000],
      [9, 0.95, 25000000],
      [10, 0.99, 500000000]
    ];

    // Player Money & Streak
    this.money = 0;
    this.streak = 0;


    // DOM elements in game.html - used to update shop
    this.balance = document.getElementById("balance");
    this.upgradeDisplay = [
      document.getElementById("levMPQ"),
      document.getElementById("levSTR"),
      document.getElementById("levMULTI"),
      document.getElementById("levINS")
    ];
    this.upgradeButtons = [
      document.getElementById("upgMPQ"),
      document.getElementById("upgSTR"),
      document.getElementById("upgMULTI"),
      document.getElementById("upgINS")
    ]
  }
}

// Money gained from question answered correctly
MoneySystem.prototype.correct = function() {
  this.streak++;
  let gain = (this.mpq + this.strBonus * (this.streak-1)) * this.multi;
  this.money += Math.round(gain);
  return [Math.round(gain), this.streak];
}

// Money lost from question answered incorrectly
MoneySystem.prototype.wrong = function() {
  this.streak = 0;
  let loss = (1 - this.ins) * this.mpq * this.multi;
  this.money -= Math.round(loss);
  if (this.money < 0) {
    loss -= Math.abs(this.money);
    this.money = 0;
  }
  return Math.round(loss);
}

// Check If Upgrade Is Affordable
MoneySystem.prototype.affordable = function(upg, lev) {
  this.costs = [this.mpqCost, this.strBonusCost, this.multiCost, this.insCost];
  return (this.money >= this.costs[upg][lev - 2][2]);
}

// Helper Function - Create Progress Bars to display Upgrade Levels
function makeProgressBar(name, progress, end) {
  let progressBar = name + ": ";
  for (let i = 0; i < 10; i++) {
    if (i < progress) progressBar += "🟢";
    else progressBar += "⚪";
  }

  if (end) progressBar += end;
  return progressBar;
}

// Helper Function - Form Time Display based on a number in seconds
function formTime(time) {
  let minutes = Math.floor(time/60);
  let seconds = time % 60;
  let secondsString = "" + seconds;
  if (seconds == 0) secondsString = "00";
  else if (seconds < 10) secondsString = "0" + seconds;
  
  return minutes + ":" + secondsString
}


// Update Shop
MoneySystem.prototype.updateShop = function() {
  // Update Display
  this.balance.innerText = "Balance: $" + this.money + " | " + formTime(time);

  this.upgradeDisplay[0].innerText = makeProgressBar("MPQ", this.mpqLev, " | $" + this.mpq);
  this.upgradeDisplay[1].innerText = makeProgressBar("Streak Bonus", this.strBonusLev, " | $" + this.strBonus);
  this.upgradeDisplay[2].innerText = makeProgressBar("Multiplier", this.multiLev, " | " + this.multi + "x");
  this.upgradeDisplay[3].innerText = makeProgressBar("Insurance", this.insLev, " | " + (this.ins * 100) + "%");

  // Update Button Colors based on whether upgrade is affordable/at max level
  if (this.mpqLev < 10 && this.affordable(0, this.mpqLev + 1)) {
    this.upgradeButtons[0].classList.remove("grayButton");
    this.upgradeButtons[0].classList.add("greenButton");
  } else {
    this.upgradeButtons[0].classList.remove("greenButton");
    this.upgradeButtons[0].classList.add("grayButton");
  }

  if (this.strBonusLev < 10 && this.affordable(1, this.strBonusLev + 1)) {
    this.upgradeButtons[1].classList.remove("grayButton");
    this.upgradeButtons[1].classList.add("greenButton");
  } else {
    this.upgradeButtons[1].classList.remove("greenButton");
    this.upgradeButtons[1].classList.add("grayButton");
  }

  if (this.multiLev < 10 && this.affordable(2, this.multiLev + 1)) {
    this.upgradeButtons[2].classList.remove("grayButton");
    this.upgradeButtons[2].classList.add("greenButton");
  } else {
    this.upgradeButtons[2].classList.remove("greenButton");
    this.upgradeButtons[2].classList.add("grayButton");
  }

  if (this.insLev < 10 && this.affordable(3, this.insLev + 1)) {
    this.upgradeButtons[3].classList.remove("grayButton");
    this.upgradeButtons[3].classList.add("greenButton");
  } else {
    this.upgradeButtons[3].classList.remove("greenButton");
    this.upgradeButtons[3].classList.add("grayButton");
  }

  // Update text in upgrade buttons
  if (this.mpqLev != 10) {
    this.upgradeButtons[0].innerText = "Upgrade MPQ | Cost: $" + this.mpqCost[this.mpqLev - 1][2];
  } else {
    this.upgradeButtons[0].innerText = "Max Level!";
  }
  
  if (this.strBonusLev != 10) {
    this.upgradeButtons[1].innerText = "Upgrade Streak Bonus | Cost: $" + this.strBonusCost[this.strBonusLev - 1][2];
  } else {
    this.upgradeButtons[1].innerText = "Max Level!";
  }

  if (this.multiLev != 10) {
    this.upgradeButtons[2].innerText = "Upgrade Multiplier | Cost: $" + this.multiCost[this.multiLev - 1][2];
  } else {
    this.upgradeButtons[2].innerText = "Max Level!";
  }
  
  if (this.insLev != 10) {
    this.upgradeButtons[3].innerText = "Upgrade Insurance | Cost: $" + this.insCost[this.insLev - 1][2];
  } else {
    this.upgradeButtons[3].innerText = "Max Level!";
  }


  // Set onclick attributes for buttons to upgrade... the upgrades
  this.upgradeButtons[0].setAttribute("onclick", "balance.upgrade(0)");
  this.upgradeButtons[1].setAttribute("onclick", "balance.upgrade(1)");
  this.upgradeButtons[2].setAttribute("onclick", "balance.upgrade(2)");
  this.upgradeButtons[3].setAttribute("onclick", "balance.upgrade(3)");
}


// Upgrade Function
MoneySystem.prototype.upgrade = function(upg) {
  if (upg == 0 && this.mpqLev < 10 && this.affordable(0, this.mpqLev + 1)) {
    this.mpqLev++;
    this.mpq = this.mpqCost[this.mpqLev - 2][1];
    this.money -= this.mpqCost[this.mpqLev - 2][2];
    this.streak = 0;
    upgradeSound.play();
  }
  if (upg == 1 && this.strBonusLev < 10 && this.affordable(1, this.strBonusLev + 1)) {
    this.strBonusLev++;
    this.strBonus = this.strBonusCost[this.strBonusLev - 2][1];
    this.money -= this.strBonusCost[this.strBonusLev - 2][2];
    this.streak = 0;
    upgradeSound.play();
  }
  if (upg == 2 && this.multiLev < 10 && this.affordable(2, this.multiLev + 1)) {
    this.multiLev++;
    this.multi = this.multiCost[this.multiLev - 2][1];
    this.money -= this.multiCost[this.multiLev - 2][2];
    this.streak = 0;
    upgradeSound.play();
  }
  if (upg == 3 && this.insLev < 10 && this.affordable(3, this.insLev + 1)) {
    this.insLev++;
    this.ins = this.insCost[this.insLev - 2][1];
    this.money -= this.insCost[this.insLev - 2][2];
    this.streak = 0;
    upgradeSound.play();
  }

  this.updateShop();
}




/* Questions -------------------------------------------------------------------------------------------------------------
Self-explanatory
*/

// Question template to make the questions
var Question = class Question {
  constructor(question, correct, wro1, wro2, wro3) {
    this.question = question;
    this.correct = correct;
    this.wrong = [wro1, wro2, wro3];
  }
}

/* Question Asker --------------------------------------------------------------------------------------------------------
Asks questions continually in a loop
Updates balance based on answer
*/


var QuestionAsker = class QuestionAsker {
  constructor(questions, moneySystem) {
    // Set of questions
    this.questions = questions;
    // Money System
    this.moneySystem = moneySystem;
    // Question currently being asked
    this.currentQuestion = []; // Question, [Ans1, Ans2, Ans3, Ans4], Correct
    // Ice Timeout Variable
    this.iceTimeout = 0;

    // DOM elements to update question interface
    this.answerButtons = [
      document.getElementById("ans1"),
      document.getElementById("ans2"),
      document.getElementById("ans3"),
      document.getElementById("ans4")
    ];
    this.main = document.getElementById("questionWindow");
  }
}

// Ask New Question
QuestionAsker.prototype.askQuestion = function() {
  // Select a question
  let question = this.questions[Math.floor(Math.random() * this.questions.length)];
  let correct = Math.floor(Math.random() * 4);
  let answers = [];
  let currentWrongs = 0;
  for (let i = 0; i < 4; i++) {
    if (i == correct) answers.push(question.correct);
    else {
      answers.push(question.wrong[currentWrongs]);
      currentWrongs++;
    }
  }

  this.currentQuestion = [question.question, answers, correct];

  // Reset Answer Buttons
  this.answerButtons[0].classList.add("redButton");
  this.answerButtons[1].classList.add("yellowButton");
  this.answerButtons[2].classList.add("greenButton");
  this.answerButtons[3].classList.add("blueButton");

  for (let i = 0; i < 4; i++) {
    this.answerButtons[i].classList.remove("deepRedButton");
    this.answerButtons[i].classList.remove("limeButton");
    this.answerButtons[i].innerText = this.currentQuestion[1][i];
    // If button holds correct answer, call correct answer function when clicked
    // Else, call wrong answer function
    if (i == this.currentQuestion[2]) this.answerButtons[i].setAttribute("onclick", "questionAsker.correct()");
    else this.answerButtons[i].setAttribute("onclick", "questionAsker.wrong()");
  }

  // Reset Main Question Window
  this.main.classList.remove("gimCorrect");
  this.main.classList.remove("gimWrong");
  this.main.classList.add("gimWaiting");
  this.main.setAttribute("onclick", "null");
  // Update text to display question
  this.main.innerText = "\n" + this.currentQuestion[0];
}

// Update interface, display correct answers
QuestionAsker.prototype.questionAnswer = function() {
  this.main.setAttribute("onclick", "questionAsker.askQuestion()");
  for (let i = 0; i < 4; i++) {
    this.answerButtons[i].setAttribute("onclick", "null");
    this.answerButtons[i].classList.remove("redButton");
    this.answerButtons[i].classList.remove("yellowButton");
    this.answerButtons[i].classList.remove("greenButton");
    this.answerButtons[i].classList.remove("blueButton");
    if (i == this.currentQuestion[2]) this.answerButtons[i].classList.add("limeButton");
    else this.answerButtons[i].classList.add("deepRedButton");
  }
  this.moneySystem.updateShop();
}

// Calculate balance change after correct question, display money gained & streak
QuestionAsker.prototype.correct = function() {
  correctSound.play();
  let result = this.moneySystem.correct();
  this.main.classList.add("gimCorrect");
  this.main.innerText = "\n+ $" + result[0] + "\nStreak: " + result[1] + "\nClick Here To Continue";
  this.questionAnswer();
  if (Math.random() < localStorage.getItem("iceChance")/100) {
    this.ice();
  }
}

// Calculate balance change after wrong question, display money lost
QuestionAsker.prototype.wrong = function() {
  wrongSound.play();
  let result = this.moneySystem.wrong();
  this.main.classList.add("gimWrong");
  this.main.innerText = "\n- $" + result + "\nStreak Lost\nClick Here To Continue";
  this.questionAnswer();
  if (Math.random() < localStorage.getItem("iceChance")/100) {
    this.ice();
  }
}

// Ice Player
QuestionAsker.prototype.ice = function() {
  document.getElementById("mainGameWindow").hidden = true;
  document.getElementById("iceWindow").hidden = false;
  document.body.style = "background: black;"

  this.iceTimeout = setTimeout(function() {
    document.getElementById("mainGameWindow").hidden = false;
    document.getElementById("iceWindow").hidden = true;
    document.body.style = "background: #1B2B8B;"
  }, 15000);

  freezeSound.play();
}


QuestionAsker.prototype.end = function() {
  document.getElementById("mainGameWindow").hidden = true;
  document.getElementById("iceWindow").hidden = true;
  clearTimeout(this.iceTimeout);

  let totalTime = localStorage.getItem("gameTime") * 60;
  document.getElementById("time").innerText = "Time's Up! (" + formTime(totalTime) + ")"; 
  document.getElementById("finalBalance").innerText = "Final Balance: $" + this.moneySystem.money;
  document.getElementById("gameEndWindow").hidden = false;
}

/* Start -----------------------------------------------------------------------------------------------------------------
Initialize classes & music
*/

var balance = new MoneySystem();
balance.updateShop();

// Upload Questions
var questions = [];

try {
  let rawQuestions = JSON.parse(localStorage.getItem("questions"));
  if (rawQuestions.length == 0) throw new SyntaxError("Error");
  console.log(rawQuestions);
  for (let question of rawQuestions) {
    questions.push(new Question(question[0], question[1], question[2], question[3], question[4]));
  }
} catch(error) {
  alert("Error! Invalid questions!");
  window.location.href="/index.html";
}

var questionAsker = new QuestionAsker(questions, balance);
questionAsker.askQuestion();

// All Music Files
var music = new Audio("Sounds/music.mp3");
music.volume = localStorage.getItem("volumeMain")/100;

let sfxVolume = localStorage.getItem("volumeSFX")/100;
var correctSound = new Audio("Sounds/correct.mp3");
correctSound.volume = sfxVolume;
var wrongSound = new Audio("Sounds/wrong.mp3");
wrongSound.volume = sfxVolume;
var upgradeSound = new Audio("Sounds/upgrade.mp3");
upgradeSound.volume = sfxVolume;
var freezeSound = new Audio("Sounds/freeze.mp3");
freezeSound.volume = sfxVolume;
var endGameSound = new Audio("Sounds/end.mp3");
endGameSound.volume = sfxVolume;

// Main Music Loop
music.loop = true;
var musicStarted = false;
var musicInterval = setInterval(function() {
  if (musicStarted) {
    clearInterval(musicInterval);
    console.log("Music start successful!");
  }
  else {
    try {
      music.play();
    } catch (e) {
      console.log("Music start failed. Trying again in 1 second...");
    }
  }
}, 1000);


// Game End Checker

var time = localStorage.getItem("gameTime") * 60;
var timeLoop = setInterval(function() {
  time--;
  questionAsker.moneySystem.updateShop();
  if (time < 0) {
    music.volume = 0;
    endGameSound.play();
    questionAsker.end();
    clearInterval(timeLoop);
  }
}, 1000);
questionAsker.moneySystem.updateShop();

/*
Temporarily disabling for debug purposes


// Change button positions
if (localStorage.getItem("buttons") == "long") {
  document.getElementById("buttons").innerHTML = '<button id="ans1" class="gimAnswer redButton"></button><button id="ans2" class="gimAnswer yellowButton"></button><button id="ans3" class="gimAnswer greenButton"></button><button id="ans4" class="gimAnswer blueButton"></button>'; 
}
else if (localStorage.getItem("buttons") == "tall") {

}
else {

}
*/