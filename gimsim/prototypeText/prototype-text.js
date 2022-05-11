var Question = class Question {
  constructor(question, cor, wro1, wro2, wro3) {
    this.question = question;
    this.correct = cor;
    this.wrong = [wro1, wro2, wro3];
  }
}






var MoneySystem = class MoneySystem {
  constructor() {
    this.mpq = 1;
    this.mpqLev = 1;
    this.strBonus = 1;
    this.strBonusLev = 1;
    this.multi = 1;
    this.multiLev = 1;
    this.insurance = 0;
    this.insuranceLev = 1;

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

    this.insuranceCost = [
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

    this.money = 0;
    this.streak = 0;
  }
}

MoneySystem.prototype.correct = function() {
  this.streak++;
  let gain = (this.mpq + this.strBonus * (this.streak-1)) * this.multi;
  this.money += gain;
  return [gain, this.money, this.streak];
}

MoneySystem.prototype.wrong = function() {
  this.streak = 0;
  let loss = (1 - this.insurance) * this.mpq * this.multi;
  this.money -= loss;
  return [loss, this.money];
}

MoneySystem.prototype.shop = function() {
  let choice = prompt("== OPTIONS ==\n[1] Enter the Upgrade Shop\n[2] Continue");

  if (Number.parseInt(choice) == 1) {
    let nextMPQ, nextStrBonus, nextMulti, nextInsurance;

    if (this.mpqLev != 10) nextMPQ = this.mpqCost[this.mpqLev - 1];
    if (this.strBonusLev != 10) nextStrBonus = this.strBonusCost[this.strBonusLev - 1];
    if (this.multiLev != 10) nextMulti = this.multiCost[this.multiLev - 1];
    if (this.insuranceLev != 10) nextInsurance = this.insuranceCost[this.insuranceLev - 1];
    
    let mpqNum, strBonusNum, multiNum, insuranceNum, exitNum;
    let currentNum = 1;

    let upgradeStr = "== SHOP ==\nCurrent Balance: $" + this.money + "\n";
    if (nextMPQ) {
      upgradeStr += "[" + currentNum + "] Upgrade MONEY PER QUESTION " + this.mpqLev + " → " + (this.mpqLev + 1) + " ($" + nextMPQ[2] + ")\n";
      mpqNum = currentNum++; 
    }
    if (nextStrBonus) {
      upgradeStr += "[" + currentNum + "] Upgrade STREAK BONUS " + this.strBonusLev + " → " + (this.strBonusLev + 1) + " ($" + nextStrBonus[2] + ")\n";
      strBonusNum = currentNum++; 
    }
    if (nextMulti) {
      upgradeStr += "[" + currentNum + "] Upgrade MULTIPLIER " + this.multiLev + " → " + (this.multiLev + 1) + " ($" + nextMulti[2] + ")\n";
      multiNum = currentNum++; 
    }
    if (nextInsurance) {
      upgradeStr += "[" + currentNum + "] Upgrade INSURANCE " + this.insuranceLev + " → " + (this.insuranceLev + 1) + " ($" + nextInsurance[2] + ")\n";
      insuranceNum = currentNum++; 
    }

    upgradeStr += "[" + currentNum + "] Back to questions\n\nEnter the number next to your choice.";
    exitNum = currentNum;
    
    let upgrade = prompt(upgradeStr);

    if (upgrade == mpqNum) {
      if (this.money >= nextMPQ[2]) {
        this.money -= nextMPQ[2];
        this.mpq = nextMPQ[1];
        this.mpqLev = nextMPQ[0];

        alert("Upgrade Succesful!\nYou will now make $" + this.mpq + " base money per question!\n");
      } else {
        alert("You can't afford this purchase! Come back when you have $" + nextMPQ[2] + "!");
      }
    } else if (upgrade == strBonusNum) {
      if (this.money >= nextStrBonus[2]) {
        this.money -= nextStrBonus[2];
        this.strBonus = nextStrBonus[1];
        this.strBonusLev = nextStrBonus[0];

        alert("Upgrade Succesful!\nYou will now make $" + this.strBonus + " additional money per correct question in a row!\n");
      } else {
        alert("You can't afford this purchase! Come back when you have $" + nextStrBonus[2] + "!");
      }
    } else if (upgrade == multiNum) {
      if (this.money >= nextMulti[2]) {
        this.money -= nextMulti[2];
        this.multi = nextMulti[1];
        this.multiLev = nextMulti[0];

        alert("Upgrade Succesful!\nYour earnings (and losses!) are now multiplied by " + this.multi + "!\n");
      } else {
        alert("You can't afford this purchase! Come back when you have $" + nextMulti[2] + "!");
      }
    } else if (upgrade == insuranceNum) {
      if (this.money >= nextInsurance[2]) {
        this.money -= nextInsurance[2];
        this.insurance = nextInsurance[1];
        this.insuranceLev = nextInsurance[0];

        alert("Upgrade Succesful!\nLosses from wrong answers are now reduced by " + this.insurance + "!\n");
      } else {
        alert("You can't afford this purchase! Come back when you have $" + nextInsurance[2] + "!");
      }
    } 

  }

  
}



var QuestionAsker = class QuestionAsker {
  constructor(questions, moneySys) {
    this.questions = questions;
    this.moneySystem = moneySys;
  }
}

QuestionAsker.prototype.ask = function() {
  let question = this.questions[Math.floor(Math.random() * this.questions.length)];
  let correct = Math.floor(Math.random() * 4) + 1;
  let str = "== QUESTION ==\n" + question.question + "\n\n== ANSWERS ==\n";
  let wrongs = 0;
  for (let i = 0; i < 4; i++) {
    if (i == correct - 1) str += ("[" + (i + 1) + "] " + question.correct + "\n");
    else str += ("[" + (i + 1) + "] " + question.wrong[wrongs++] + "\n");
  }

 
  let answer = prompt(str + "\n Enter the number next to your answer.");
  if (Number.parseInt(answer) == correct) {
    let result = this.moneySystem.correct();
    alert("Correct!\n+$" + result[0] + "\nMoney: $" + result[1] + "\nStreak: " + result[2]);
    this.moneySystem.shop();
    this.ask();
  } else if (answer == null) {
    alert("Shutting down...\nFinal Money: $" + this.moneySystem.money);
  } else {
    let result = this.moneySystem.wrong();
    alert("Wrong! The correct answer was:\n\n[" + correct + "] " + question.correct + "\n-$" + result[0] + "\nMoney: $" + result[1] + "\nYou lost your answer streak...");
    this.moneySystem.shop();
    this.ask();
  }
}





var questions = [new Question("1 + 1", "2", "3", "4", "5"), new Question("2 + 1", "3", "4", "5", "2")];
var moneySystem = new MoneySystem();
var game = new QuestionAsker(questions, moneySystem);
game.ask();