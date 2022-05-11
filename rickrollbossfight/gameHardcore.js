var Player = class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

Player.prototype.move = function(direction) {
  this.x += direction[0];
  this.y += direction[1];
  if (this.x < 15) this.x = 15;
  if (this.x > 985) this.x = 985;
  if (this.y < 15) this.y = 15;
  if (this.y > 485) this.y = 485;
}

Player.prototype.checkCollision = function(threats) {
  for (let i = 0; i < threats.length; i++) {
    let threat = threats[i];
    if (threat.type == "Pellet") {
      if (threat.x < (this.x + 15) &&
          threat.x > (this.x - 15) &&
          threat.y < (this.y + 15) &&
          threat.y > (this.y - 15)) {
        state.gameLose();
      }
    } else if (threat.type == "Laser" && threat.charge <= -10) {
      if (threat.start[0] !== threat.[0]) {
        let slope = (threat.start[1] - threat.end[1])/(threat.start[0] - threat.end[0]);
        let yIntercept = (-1 * (threat.start[0]) * slope) + threat.start[1];
        let yTest = (slope * this.x + yIntercept)
        if (Math.abs(yTest - this.y) <= 15) state.gameLose();
      } else {
        if (threat.start[0] <= (this.x + 10) &&
            threat.start[0] >= (this.x - 10)) {
          state.gameLose();
        }
      }
    }
  }
}

var Pellet = class Pellet {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.type = "Pellet";
  }
}

Pellet.prototype.update = function() {
  this.x += this.velocity[0];
  this.y += this.velocity[1];

  if (this.x < 0 || this.x > 1000 || this.y < 0 || this.y > 500) return null;
  else return true;
}

var Laser = class Laser {
  constructor(x1, y1, x2, y2, charge, duration) {
    this.start = [x1, y1];
    this.end = [x2, y2];
    this.charge = charge;
    this.duration = duration;
    this.type = "Laser";
  }
}

Laser.prototype.update = function() {
  this.charge -= 10;
  if (this.charge <= 0) this.duration -= 10;
  
  if (this.duration <= 0) return null;
  else return true;
}

var State = class State {
  constructor(attacks, player, canvas) {
    this.attacks = attacks;
    this.attackNumber = 0;
    this.currentAttackFunction = attacks[0][0];
    this.currentAttackInterval = attacks[0][1];
    this.baseAttackInterval = attacks[0][1];
    this.currentAttackDuration = attacks[0][2];
    
    this.threats = [];
    this.player = player;
    this.canvas = canvas;
  }
}

State.prototype.draw = function() {
  let ctx = this.canvas.getContext("2d");
  // Draw Game Screen
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1000, 500);
  ctx.fillStyle = "black";
  ctx.fillRect(5, 5, 990, 490);

  // Draw Player

  ctx.fillStyle = "cyan";
  ctx.fillRect(this.player.x - 10, this.player.y - 10, 20, 20);
  
  // Draw Threats

  ctx.fillStyle = "red";

  for (let i = 0; i < this.threats.length; i++) {
    let threat = this.threats[i];
    if (threat.type == "Pellet") {
      ctx.beginPath();
      ctx.ellipse(threat.x, threat.y, 5, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (threat.type == "Laser") {
      if (threat.charge >= 500) ctx.strokeStyle = "darkRed";
      else if (threat.charge >= 250) ctx.strokeStyle = "fireBrick";
      else ctx.strokeStyle = "red";
      if (threat.charge >= 0) ctx.lineWidth = 3;
      else ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(threat.start[0], threat.start[1]);
      ctx.lineTo(threat.end[0], threat.end[1]);
      ctx.stroke();
    }
  }
}


State.prototype.update = function() {
  // Move Player
  let up = (arrowKeys["ArrowUp"] || arrowKeys["w"]);
  let down = (arrowKeys["ArrowDown"] || arrowKeys["s"]);
  let left = (arrowKeys["ArrowLeft"] || arrowKeys["a"]);
  let right = (arrowKeys["ArrowRight"] || arrowKeys["d"]);
  this.player.move([
    ((left ? -2 : 0) + (right ? 2 : 0)),
    ((up ? -2 : 0) + (down ? 2 : 0))
  ]);
  
  // Update Threats
  for (let i = 0; i < this.threats.length; i++) {
    let threat = this.threats[i];
    if (threat != null && threat.update() == null) this.threats[i] = null;
  }

  // Create New Threats
  this.currentAttackDuration -= 10;
  if (this.currentAttackDuration >= 0) {
    this.currentAttackInterval -= 10;
    if (this.currentAttackInterval <= 0) {
      this.threats = this.threats.concat(this.currentAttackFunction(this.player));
      this.currentAttackInterval = this.baseAttackInterval;
    }
  } else {
    this.attackNumber++;
    if (this.attackNumber >= this.attacks.length) {
      this.gameWin();
    } else {
      this.currentAttackFunction = this.attacks[this.attackNumber][0];
      this.currentAttackInterval = this.attacks[this.attackNumber][1];
      this.baseAttackInterval = this.attacks[this.attackNumber][1];
      this.currentAttackDuration = this.attacks[this.attackNumber][2];
    }
  }

  // Remove Expired Threats
  this.threats = this.threats.filter(threat => threat != null);

  // Test for Collision
  // Remove for testing / debugging
  this.player.checkCollision(this.threats);

  // Redraw Game Screen
  this.draw();
}

State.prototype.gameLose = function() {
  clearInterval(gameInterval);
  music.pause();

  let ctx = this.canvas.getContext("2d");
  
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1000, 500);
  ctx.fillStyle = "black";
  ctx.fillRect(5, 5, 990, 490);
  
  ctx.font = "60px Courier";
	ctx.fillStyle = "White";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
  ctx.fillText("GAME OVER!", 500, 200);
  ctx.font = "20px Courier";
  ctx.fillText("Restarting in 3 seconds...", 500, 350);
  
  setTimeout(function() {
    let attempts = localStorage.getItem("attempts");
    localStorage.setItem("attempts", (attempts ? attempts + 1 : 1));
    window.location.reload();
  }, 3000);
  
  setInterval(function() { state.gameLose(); }, 1000);
}

var gameWinProgress = 0;

State.prototype.gameWin = function() {
  gameWinProgress += 0.5;
  
  if (gameWinProgress <= 255) {
    let ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1000, 500);
    ctx.fillStyle = "rgb(" + Math.floor(gameWinProgress) + ", " + Math.floor(gameWinProgress) + ", " + Math.floor(gameWinProgress) + ")"
    ctx.fillRect(5, 5, 990, 490);

    // Draw Player

    ctx.fillStyle = "cyan";
    ctx.fillRect(this.player.x - 10, this.player.y - 10, 20, 20);

    document.getElementById("rick").width = Math.floor((1 - gameWinProgress/255)*181);
    document.getElementById("rick").height = Math.floor((1 - gameWinProgress/255)*190);
  } else {
    window.location.href="./end.html";
  }
}

// ATTACK PATTERNS

// Spare counters

var counter1 = 0;
var counter2 = 0;
var counter3 = 0;

var attacks = [ // All attacks in order
  [function(player) {
    return [new Pellet(player.x, 0, [0, 1])];
  }, 500, 9500], // Introduction Tune Part 1
  [function(player) {
    return [new Laser(player.x, 0, player.x, 500, 2000, 100)];
  }, 500, 7000], // Introduction Tune Part 2
  [function(player) { return [] }, 2000, 2000], // Break



  [function(player) {
    return [new Pellet(player.x, 0, [0, 2]), 
            new Pellet(player.x, 500, [0, -2]),
            new Pellet(0, player.y, [2, 0]), 
            new Pellet(1000, player.y, [-2, 0])];
  }, 1000, 4000], // We're no strangers to love,
  [function(player) {
    return [new Laser(player.x, 0, player.x, 500, 2000, 100),
            new Laser(0, player.y, 1000, player.y, 2000, 100)];
  }, 750, 2500], // You know the rules, and so do I,
  [function(player) { return [] }, 2000, 2000], // Break
  [function(player) {
    return [new Pellet(500, 0, [(player.x-500)/50, (player.y)/50])]
  }, 500, 4000], // A full commitment’s what I’m thinking of,
  [function(player) {
    return [new Laser(player.x-9, 0, player.x-9, 500, 1500, 1500),
            new Laser(player.x+9, 0, player.x+9, 500, 1500, 1500),
            new Laser(0, player.y-9, 1000, player.y-9, 1500, 1500),
            new Laser(0, player.y+9, 1000, player.y+9, 1500, 1500)];
  }, 250, 750], // You wouldn't get this from any other guy,



  [function(player) { return [] }, 750, 2750], // Break
  [function(player) {
    return [new Pellet(0, player.y, [3, 0]),
            new Laser(player.x, 0, player.x, 500, 1000, 100)];
  }, 500, 4500], // I just wanna tell you how I'm feeling,
  [function(player) {
    return [new Pellet(player.x, 0, [0, 3]),
            new Laser(0, player.y, 1000, player.y, 1000, 100)];
  }, 500, 2000], // Gotta make you understand...



  [function(player) { counter1 = 10; return [] }, 1, 2000], // Initialize Counter 1 + Break
  [function(player) {
    counter1--;
    return [new Laser(0, (500 - 50 * counter1), 1000, (500 - 50 * counter1), (counter1 * 200), 2500)];
  }, 100, 2000], // Never gonna give you up,
  [function(player) { counter2 = 20; return [] }, 1, 10], // Initialize Counter 2
  [function(player) {
    counter2--;
    return [new Laser((1000 - 50 * counter2), 0, (1000 - 50 * counter2), 500, (counter2 * 100), 500)];
  }, 50, 2000], // Never gonna let you down,
  [function(player) { return []; }, 2000, 500], // Break
  [function(player) {
    return [new Pellet(0, 0, [Math.floor(Math.random()*2 + 1), Math.floor(Math.random()*2 + 1)]),
            new Pellet(0, 500, [Math.floor(Math.random()*2 + 1), -Math.floor(Math.random()*2 + 1)]),
            new Pellet(1000, 0, [-Math.floor(Math.random()*2 + 1), Math.floor(Math.random()*2 + 1)]),
            new Pellet(1000, 500, [-Math.floor(Math.random()*2 + 1), -Math.floor(Math.random()*2 + 1)])
            ];
  }, 150, 2000], // Never gonna run around and desert you.
  [function(player) { counter1 = 10; return [] }, 1, 2000], // Initialize Counter 1 + Break
  [function(player) {
    counter1--;
    return [new Laser(0, (50 * counter1), 1000, (50 * counter1), (counter1 * 200), 2500)];
  }, 100, 2000], // Never gonna make you cry,
  [function(player) { counter2 = 20; return [] }, 1, 10], // Initialize Counter 2
  [function(player) {
    counter2--;
    return [new Laser((50 * counter2), 0, (50 * counter2), 500, (counter2 * 100), 500)];
  }, 50, 2000], // Never gonna say goodbye,
  [function(player) { return []; }, 2000, 500], // Break
  [function(player) {
    return [new Pellet(0, 0, [Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*2 + 2)]),
            new Pellet(0, 500, [Math.floor(Math.random()*2 + 2), -Math.floor(Math.random()*2 + 2)]),
            new Pellet(1000, 0, [-Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*2 + 2)]),
            new Pellet(1000, 500, [-Math.floor(Math.random()*2 + 2), -Math.floor(Math.random()*2 + 2)])
            ];
  }, 50, 500], // Never gonna tell a lie and hurt you.



  [function(player) { return [] }, 1000, 3500], // Break
  [function(player) {
    if (counter3) {
      counter3 = 0;
      return [new Laser(0, 0, 1000, 500, 500, 200), new Laser(0, 500, 1000, 0, 500, 200)];
    } else {
      counter3 = 1;
      return [new Laser(500, 0, 500, 500, 500, 200), new Laser(0, 250, 1000, 250, 500, 200)];
    }
  }, 500, 4000], // We’ve known each other for so long
  [function(player) {
    return [new Pellet(Math.floor(Math.random() * 1000), 0, [0, 3])];
  }, 100, 4500], // Your heart’s been aching but you're too shy to say it
  [function(player) {
    return [new Pellet(0, Math.floor(Math.random() * 500), [3, 0])];
  }, 100, 3500], // Inside we both know what's been going on,
  [function(player) {
    return [new Laser(Math.floor(Math.random()*1000), 0, Math.floor(Math.random()*1000), 500, 1000, 100)];
  }, 500, 5000], // We know the game and we’re gonna play it.

  [function(player) {
    return [new Laser(0, Math.floor(Math.random()*500), 1000, Math.floor(Math.random()*500), 1000, 100)];
  }, 500, 3500], // Annnnnd if you ask me how I’m feeling,
  [function(player) {
    return [new Laser(Math.floor(Math.random()*1000), 0, Math.floor(Math.random()*1000), 500, 1000, 100)];
  }, 500, 2500], // Don’t tell me you’re too blind to see…



  [function(player) { counter1 = 15; return []; }, 1, 2000], // Initialize Counter 1 + Break
  [function(player) {
    counter1--;
    let angle = Math.PI/2 - (counter1 * (Math.PI/30));
    let x = Math.cos(angle) * 1500;
    let y = Math.sin(angle) * 1500;
    return [new Laser(0, 0, Math.floor(x), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna give you up,
  [function(player) { counter2 = 15; return []; }, 10, 1000], // Break
  [function(player) {
    counter2--;
    let angle = Math.PI/2 - (counter2 * (Math.PI/30));
    let x = 500-(Math.cos(angle) * 1500-500);
    let y = Math.sin(angle) * 1500;
    return [new Laser(1000, 0, Math.floor(x), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna let you down,
  [function(player) {
    return [new Laser(0, 250, 1000, 250, 500, 1500),
            new Laser(500, 0, 500, 500, 500, 1500)
          ];
  }, 750, 1500], // Initialize Cross Laser in Middle
  [function(player) {
    return [new Pellet(0, 0, [Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(0, 500, [Math.floor(Math.random()*2 + 1), -Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 0, [-Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 500, [-Math.floor(Math.random()*2 + 2), -Math.floor(Math.random()*4 + 2)])
          ];
  }, 100, 1500], // Never gonna run around and desert you.
  [function(player) { counter1 = 15; return []; }, 500, 2500], // Initialize Counter 1 + Break
  [function(player) {
    counter1--;
    let angle = Math.PI/2 - (counter1 * (Math.PI/30));
    let x = Math.cos(angle) * 1500;
    let y = Math.sin(angle) * 1500;
    return [new Laser(0, 0, Math.floor(x), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna make you cry
  [function(player) { counter2 = 15; return []; }, 10, 1000], // Break
  [function(player) {
    counter2--;
    let angle = Math.PI/2 - (counter2 * (Math.PI/30));
    let x = 500-(Math.cos(angle) * 1500-500);
    let y = Math.sin(angle) * 1500;
    return [new Laser(1000, 0, Math.floor(x), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna say goodbye,
  [function(player) {
    return [new Laser(0, 250, 1000, 250, 500, 1500),
            new Laser(500, 0, 500, 500, 500, 1500)
          ];
  }, 750, 1500], // Initialize Cross Laser in Middle
  [function(player) {
    return [new Pellet(0, 0, [Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(0, 500, [Math.floor(Math.random()*2 + 1), -Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 0, [-Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 500, [-Math.floor(Math.random()*2 + 2), -Math.floor(Math.random()*4 + 2)])
          ];
  }, 100, 1500], // Never gonna tell a lie and hurt you.



  [function(player) { counter1 = 15; return []; }, 1, 2000], // Initialize Counter 1 + Break
  [function(player) {
    counter1--;
    let angle = Math.PI/2 - (counter1 * (Math.PI/30));
    let x = Math.cos(angle) * 1500;
    let y = 250-(Math.sin(angle) * 1500-250);
    return [new Laser(0, 500, Math.floor(x), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna give you up,
  [function(player) { counter2 = 15; return []; }, 10, 1000], // Initialize Counter 2 + Break
  [function(player) {
    counter2--;
    let angle = Math.PI/2 - (counter2 * (Math.PI/30));
    let x = 500-(Math.cos(angle) * 1500-500);
    let y = 250-(Math.sin(angle) * 1500-250);
    return [new Laser(1000, 500, Math.floor(x), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna let you down,
  [function(player) {
    return [new Laser(0, 0, 1000, 500, 500, 1500),
            new Laser(0, 500, 1000, 0, 500, 1500)
          ];
  }, 750, 1500], // Initialize Diagonal Cross Laser in Middle
  [function(player) {
    return [new Pellet(0, 0, [Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(0, 500, [Math.floor(Math.random()*2 + 1), -Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 0, [-Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 500, [-Math.floor(Math.random()*2 + 2), -Math.floor(Math.random()*4 + 2)])
          ];
  }, 100, 1500], // Never gonna run around and desert you.
  [function(player) { counter1 = 15; return []; }, 500, 2500], // Initialize Counter 1 + Break
  [function(player) {
    counter1--;
    let angle = Math.PI/2 - (counter1 * (Math.PI/30));
    let x = Math.cos(angle) * 1500;
    let y = 250-(Math.sin(angle) * 1500-250);
    return [new Laser(0, 500, Math.floor(x), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna make you cry
  [function(player) { counter2 = 15; return []; }, 10, 1000], // Initialize Counter 2 + Break
  [function(player) {
    counter2--;
    let angle = Math.PI/2 - (counter2 * (Math.PI/30));
    let x = 500-(Math.cos(angle) * 1500-500);
    let y = 250-(Math.sin(angle) * 1500-250);
    return [new Laser(1000, 500, Math.floor(x), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna say goodbye,
  [function(player) {
    return [new Laser(0, 0, 1000, 500, 500, 1500),
            new Laser(0, 500, 1000, 0, 500, 1500)
          ];
  }, 750, 1500], // Initialize Diagonal Cross Laser in Middle
  [function(player) {
    return [new Pellet(0, 0, [Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(0, 500, [Math.floor(Math.random()*2 + 1), -Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 0, [-Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 500, [-Math.floor(Math.random()*2 + 2), -Math.floor(Math.random()*4 + 2)])
          ];
  }, 100, 1500], // Never gonna tell a lie and hurt you.


  [function(player) { counter1 = 50; return [] }, 100, 500], // Initialize Counter 1 + Break
  [function(player) {
    counter1--;
    let angle = counter1 * Math.PI/20;
    let x = Math.cos(angle) * 600;
    let y = Math.sin(angle) * 600;
    return [new Laser(Math.floor(x + 500),
                      Math.floor(y + 250),
                      Math.floor(500 - x),
                      Math.floor(250 - y),
                      1000, 100)];
  }, 80, 4000], // Give you up,
  [function(player) { counter2 = 0; return [] }, 100, 1000], // Initialize Counter 2 + Break
  [function(player) {
    counter2++;
    let angle = counter2 * Math.PI/20;
    let x = Math.cos(angle) * 600;
    let y = Math.sin(angle) * 600;
    return [new Laser(Math.floor(x + 500),
                      Math.floor(y + 250),
                      Math.floor(500 - x),
                      Math.floor(250 - y),
                      1000, 100)];
  }, 80, 4000], // Give you up.



  [function(player) { counter1 = 50; counter2 = 100; return [] }, 100, 1000], // Initialize Counter 1 + Counter 2 + Break
  [function(player) {
    counter1--;
    counter2--;
    let angle1 = counter1 * Math.PI/20;
    let x1 = Math.cos(angle1) * 600;
    let y1 = Math.sin(angle1) * 600;
    let angle2 = counter2 * Math.PI/20;
    let x2 = Math.cos(angle2) * 600;
    let y2 = Math.sin(angle2) * 600;
    return [new Laser(Math.floor(x1 + 500),
                      Math.floor(y1 + 250),
                      Math.floor(500 - x1),
                      Math.floor(250 - y1),
                      1000, 100),
            new Laser(Math.floor(x2 + 500),
                      Math.floor(y2 + 250),
                      Math.floor(500 - x2),
                      Math.floor(250 - y2),
                      1000, 100)];
  }, 80, 3000], // Never gonna give - Never gonna give - Give you up,
  [function(player) { counter1 = 0; counter2 = 50; return [] }, 100, 1500], // Initialize Counter 1 + Counter 2 + Break
  [function(player) {
    counter1++;
    counter2++;
    let angle1 = counter1 * Math.PI/20;
    let x1 = Math.cos(angle1) * 600;
    let y1 = Math.sin(angle1) * 600;
    let angle2 = counter2 * Math.PI/20;
    let x2 = Math.cos(angle2) * 600;
    let y2 = Math.sin(angle2) * 600;
    return [new Laser(Math.floor(x1 + 500),
                      Math.floor(y1 + 250),
                      Math.floor(500 - x1),
                      Math.floor(250 - y1),
                      1000, 100),
            new Laser(Math.floor(x2 + 500),
                      Math.floor(y2 + 250),
                      Math.floor(500 - x2),
                      Math.floor(250 - y2),
                      1000, 100)];
  }, 80, 3500], // Never gonna give - Never gonna give - Give you up.



  [function(player) { return [] }, 1000, 1000], // Break
  [function(player) {
    return [new Pellet(Math.floor(Math.random() * 1000), 0, [0, 3]),
            new Pellet(0, Math.floor(Math.random() * 500), [3, 0])];
  }, 200, 4000], // We’ve known each other for so long
  [function(player) {
    return [new Pellet(Math.floor(Math.random() * 1000), 500, [0, -3]),
            new Pellet(1000, Math.floor(Math.random() * 500), [-3, 0])];
  }, 200, 4500], // Your heart’s been aching but you're too shy to say it
  [function(player) { counter1 = 25; return []; }, 1, 10], // Initialize Counter 1
  [function(player) {
    counter1--;
    let angle = counter1 * Math.PI/30;
    let x = Math.cos(angle) * 600;
    let y = Math.sin(angle) * 600;
    return [new Laser(Math.floor(x + 500),
                      Math.floor(y + 250),
                      Math.floor(500 - x),
                      Math.floor(250 - y),
                      1000, 100)];
  }, 50, 3500], // Inside we both know what's been going on,
  [function(player) { counter2 = 0; return []; }, 1, 10], // Initialize Counter 2
  [function(player) {
    counter2++;
    let angle = counter2 * Math.PI/30;
    let x = Math.cos(angle) * 600;
    let y = Math.sin(angle) * 600;
    return [new Laser(Math.floor(x + 500),
                      Math.floor(y + 250),
                      Math.floor(500 - x),
                      Math.floor(250 - y),
                      1000, 100)];
  }, 50, 3500], // We know the game and we’re gonna play it.



  [function(player) {
    return [new Laser(0, Math.floor(Math.random()*500), 1000, Math.floor(Math.random()*500),
                      1000, 100),
            new Laser(Math.floor(Math.random()*1000), 0, Math.floor(Math.random()*1000), 500,               1000, 100)];
  }, 500, 6500], // I just wanna tell you how I'm feeling, Gotta make you understand...



  [function(player) { counter1 = 15; return []; }, 1, 2000], // Initialize Counter 1 + Break
  [function(player) {
    counter1--;
    let angle = Math.PI/2 - (counter1 * (Math.PI/30));
    let x1 = Math.cos(angle) * 1500;
    let x2 = 500-(Math.cos(angle) * 1500-500);
    let y = Math.sin(angle) * 1500;
    return [new Laser(0, 0, Math.floor(x1), Math.floor(y), 1000, 250),
            new Laser(1000, 0, Math.floor(x2), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna give you up,
  [function(player) { counter2 = 0; return []; }, 10, 1000], // Initialize Counter 2 + Break
  [function(player) {
    counter2++;
    let angle = Math.PI/2 - (counter2 * (Math.PI/30));
    let x1 = Math.cos(angle) * 1500;
    let x2 = 500-(Math.cos(angle) * 1500-500);
    let y = Math.sin(angle) * 1500;
    return [new Laser(0, 0, Math.floor(x1), Math.floor(y), 1000, 250),
            new Laser(1000, 0, Math.floor(x2), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna let you down,
  [function(player) {
    return [new Laser(0, 250, 1000, 250, 500, 1500),
            new Laser(500, 0, 500, 500, 500, 1500),
            new Laser(0, 0, 1000, 500, 500, 1500),
            new Laser(0, 500, 1000, 0, 500, 1500)];
  }, 1250, 1500], // Initialize Cross Laser + Diagonal Cross Laser in Middle
  [function(player) {
    return [new Pellet(0, 0, [Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(0, 500, [Math.floor(Math.random()*2 + 1), -Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 0, [-Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 500, [-Math.floor(Math.random()*2 + 2), -Math.floor(Math.random()*4 + 2)])
          ];
  }, 100, 1000], // Never gonna run around and desert you.
  [function(player) { counter1 = 15; return []; }, 500, 2000], // Initialize Counter 1 + Break
  [function(player) {
    counter1--;
    let angle = Math.PI/2 - (counter1 * (Math.PI/30));
    let x1 = Math.cos(angle) * 1500;
    let x2 = 500-(Math.cos(angle) * 1500-500);
    let y = 250-(Math.sin(angle) * 1500-250);
    return [new Laser(0, 500, Math.floor(x1), Math.floor(y), 1000, 250),
            new Laser(1000, 500, Math.floor(x2), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna make you cry
  [function(player) { counter2 = 0; return []; }, 10, 1000], // Initialize Counter 2 + Break
  [function(player) {
    counter2++;
    let angle = Math.PI/2 - (counter2 * (Math.PI/30));
    let x1 = 500-(Math.cos(angle) * 1500-500);
    let x2 = Math.cos(angle) * 1500;
    let y = 250-(Math.sin(angle) * 1500-250);
    return [new Laser(1000, 500, Math.floor(x1), Math.floor(y), 1000, 250),
            new Laser(0, 500, Math.floor(x2), Math.floor(y), 1000, 250)];
  }, 75, 1125], // Never gonna say goodbye,
  [function(player) {
    return [new Laser(0, 0, 1000, 500, 500, 1500),
            new Laser(0, 500, 1000, 0, 500, 1500),
            new Laser(0, 250, 1000, 250, 500, 1500),
            new Laser(500, 0, 500, 500, 500, 1500)
          ];
  }, 1250, 1500], // Initialize Diagonal Cross Laser in Middle
  [function(player) {
    return [new Pellet(0, 0, [Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(0, 500, [Math.floor(Math.random()*2 + 1), -Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 0, [-Math.floor(Math.random()*2 + 2), Math.floor(Math.random()*4 + 2)]),
            new Pellet(1000, 500, [-Math.floor(Math.random()*2 + 2), -Math.floor(Math.random()*4 + 2)])
          ];
  }, 100, 1500], // Never gonna tell a lie and hurt you. 
  


  [function(player) { counter1 = 25; return []; }, 100, 2500], // Initialize Counter 1 + Break
  [function(player) {
    counter1--;
    let angle = counter1 * Math.PI/30;
    let x = Math.cos(angle) * 600;
    let y = Math.sin(angle) * 600;
    return [new Laser(Math.floor(x + 500),
                      Math.floor(y + 250),
                      Math.floor(500 - x),
                      Math.floor(250 - y),
                      1000, 100)];
  }, 50, 1100], // Never gonna give you up,
  [function(player) { counter2 = 0; return []; }, 1, 1000], // Initialize Counter 1
  [function(player) {
    counter2++;
    let angle = counter2 * Math.PI/30;
    let x = Math.cos(angle) * 600;
    let y = Math.sin(angle) * 600;
    return [new Laser(Math.floor(x + 500),
                      Math.floor(y + 250),
                      Math.floor(500 - x),
                      Math.floor(250 - y),
                      1000, 100)];
  }, 50, 1100], // Never gonna let you down,
  [function(player) { counter3 = 0; return []; }, 1, 1250], // Initialize Counter 3 + Break
  [function(player) {
    counter3++;
    return [new Laser(counter3 * 25, 0, counter3 * 25, 500, 500, counter3*25),
            new Pellet(1000, Math.floor(Math.random() * 500), [-3, 0])];
  }, 50, 1000], // Never gonna run around and desert you.
  [function(player) { counter1 = 25; return []; }, 100, 3000], // Initialize Counter 1 + Break
  [function(player) {
    counter1--;
    let angle = counter1 * Math.PI/30;
    let x = Math.cos(angle) * 600;
    let y = Math.sin(angle) * 600;
    return [new Laser(Math.floor(x + 500),
                      Math.floor(y + 250),
                      Math.floor(500 - x),
                      Math.floor(250 - y),
                      1000, 100)];
  }, 50, 1100], // Never gonna make you cry,
  [function(player) { counter2 = 0; return []; }, 1, 1000], // Initialize Counter 1 + Break
  [function(player) {
    counter2++;
    let angle = counter2 * Math.PI/30;
    let x = Math.cos(angle) * 600;
    let y = Math.sin(angle) * 600;
    return [new Laser(Math.floor(x + 500),
                      Math.floor(y + 250),
                      Math.floor(500 - x),
                      Math.floor(250 - y),
                      1000, 100)];
  }, 50, 1100], // Never gonna say goodbye,
  [function(player) { counter3 = 0; return []; }, 1, 1250], // Initialize Counter 3 + Break
  [function(player) {
    counter3++;
    return [new Laser(1000 - counter3 * 25, 0, 1000 - counter3 * 25, 500, 500, counter3*25),
            new Pellet(0, Math.floor(Math.random() * 500), [3, 0])];
  }, 50, 1100], // Never gonna tell a lie and hurt you.
  [function(player) { return [] }, 10, 2000], // Break

  

  [function(player) {
    return [new Laser(500, 0, 500, 500, 1000, 100),
            new Laser(0, 250, 1000, 250, 1000, 100)];
  }, 500, 5000], // Never gonna give you up, never gonna let you down, never gonna run around and desert you...
  [function(player) {
    return [new Laser(0, 0, 1000, 500, 1000, 100),
            new Laser(0, 500, 1000, 0, 1000, 100)];
  }, 1000, 5000] // Rest of lyrics fades out
];

// Start Game

var canvas = document.getElementById("canvas");
var state = new State(attacks, new Player(500, 250), canvas);

// This code is mostly borrowed frome eloquentjavascript.net/16_game.html.
// Track keypresses to move the player

function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return down;
}

const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "w", "a", "s", "d"]);

// Continuously update the game state

var gameInterval = setInterval(function() {
  state.update();
}, 10);

var music = new Audio("RickRoll.mp3"); // Play a rickroll upon start
music.play();
