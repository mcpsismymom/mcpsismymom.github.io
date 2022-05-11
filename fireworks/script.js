var Sparkle = class Sparkle {
  constructor(x, y, color, gravity, duration) {
    this.x = x;
    this.y = y;

    this.color = color;
    this.gravity = gravity;
    this.duration = duration;

    this.sparkling = true;
    this.nextSwitch = 500;
  }
}

Sparkle.prototype.update = function update() {
  this.nextSwitch -= 5;
  if (this.nextSwitch <= 0) {
    this.nextSwitch = 500;
    this.sparkling = !this.sparkling;
  }
  
  this.y -= this.gravity;
  this.duration -= 5;
  if (this.duration > 0) return [this];
}

Sparkle.prototype.draw = function draw(ctx, height) {
  ctx.fillStyle = this.color;
  if (this.sparkling) {
    ctx.beginPath();
    ctx.arc(this.x, height - this.y, 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

var Fizzle = class Fizzle {
  constructor (x, y, speedX, speedY, slowdown, gravity, gravityAcc, color, duration) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.slowdown = slowdown;
    this.gravity = gravity;
    this.gravityAcc = gravityAcc;
    this.floatDownMode = false;
    this.color = color;
    this.duration = duration;

    this.nextSparkle = 250;
  }
}

Fizzle.prototype.update = function update() {
  if (!this.floatDownMode) {
    if (this.speedX > -1 && this.speedX < 1 && this.speedY > -1 && this.speedY < 1) {
      this.floatDownMode = true;
      this.speedX = 0;
      this.speedY = 0;
    } else {

      this.x += this.speedX;
      this.y += this.speedY;

      this.speedX *= this.slowdown;
      this.speedY *= this.slowdown;

    }
  } else {
    this.y -= this.gravity;
    this.gravity += this.gravityAcc;
  }

  this.duration -= 5;
    this.nextSparkle -= 5;

    if (this.nextSparkle < 0) {
      this.nextSparkle = 250;
      return [this, new Sparkle(this.x, this.y, this.color, (this.gravity < 0.5 ? this.gravity : 0.5), 1000)];
    } else {
      if (this.duration < 0) {
        return [];
      } else {
        return [this];
      }
    }
}

Fizzle.prototype.draw = function draw(ctx, height) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, height - this.y, 4, 0, 2 * Math.PI, false);
  ctx.fill();
}

var StandardFirework = class StandardFirework {
  constructor(x, y, speedX, speedY, gravity, explosionFizzles, color, duration) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.gravity = gravity;
    this.color = color;
    this.duration = duration;
    this.explosionFizzles = explosionFizzles;

    this.nextSparkle = 200;
  }
}

StandardFirework.prototype.update = function prototype() {
  this.x += this.speedX;
  this.y += this.speedY;
  this.speedY -= this.gravity;

  this.duration-=5;
  this.nextSparkle-=5;
  if (this.duration > 0) {
    if (this.nextSparkle <= 0) {
      this.nextSparkle = 100;
      return [this, new Sparkle(this.x, this.y, this.color, 0.5, 1000)];
    } else {
      return [this];
    }
  } else {
    let array = [];
    for (let angle = 0; angle < Math.PI * 2; angle+=Math.PI/(this.explosionFizzles/2)) {
      array.push(new Fizzle(this.x, this.y, Math.cos(angle) * 20, Math.sin(angle) * 20, 0.8, 0.05, 0.004, this.color, 5000));
    }
    return array;
  }
}

StandardFirework.prototype.draw = function draw(ctx, height) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, height - this.y, 8, 0, 2 * Math.PI, false);
  ctx.fill();
}





var State = class State {
  constructor() {
    this.entities = [];
    this.canvas = document.getElementById("canvas");
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.ctx = this.canvas.getContext("2d");
  }
}

State.prototype.update = function update() {
  this.ctx.fillStyle = "black";
  this.ctx.beginPath();
  this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  this.ctx.fill();

  let newEntities = [];
  for (let entity of this.entities) {
    if (entity != undefined) {
      newEntities = newEntities.concat(entity.update());
    }
  }
  this.entities = newEntities;
  for (let entity of this.entities) {
    if (entity != undefined) {
      entity.draw(this.ctx, this.canvasHeight);
    }
  }
}


State.prototype.newFirework = function newFirework() {
  let colors = ["Red", "Orange", "Yellow", "Lime", "Cyan", "Magenta"];

  let x = Math.floor(Math.random() * this.canvasWidth);
  let speedX;
  if (x < this.canvasWidth/2) speedX = Math.floor(Math.random() * 3 + 1);
  else speedX = -Math.floor(Math.random() * 3 + 1);

  this.entities.push(new StandardFirework(x, 0, speedX, Math.floor(Math.random() * 2 + 4), 0.02, 2 * Math.floor(Math.random() * 3 + 4),
  colors[Math.floor(Math.random() * colors.length)], Math.floor(Math.random() * 200 + 900)));

  return this.entities[this.entities.length-1];
}








var state = new State();

var barrageTimeout = 3;
var barrageFireworks;
var barrageInterval;

setInterval(function() {
  if (document.hasFocus()) {
    state.newFirework(); 

    // Firework Barrage
    if (Math.random() < 0.2 && barrageTimeout < 0) {
      barrageFireworks = 1;
      barrageTimeout = 3;
      barrageInterval = setInterval(function() {
        state.newFirework();
        barrageFireworks++;
        if (barrageFireworks > 5) clearInterval(barrageInterval);
      }, 500);

    }
    barrageTimeout--;
  }
}, 3000);

setInterval(function() {
  state.update();
}, 5)