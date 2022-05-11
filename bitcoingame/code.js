var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["25f83d38-fa67-468e-bf81-1607ca3c4518","f747369e-00f1-4c28-9b07-7ec3e4cfda27","5e7fd465-a353-403e-9185-8b236e808e90","72a0dbb5-828e-4206-a9e7-9509551a62ef","749ffc26-0609-4d92-990a-4a2b0b72ec76","d947cf6e-b44f-4fd7-bb27-752ed2a7aab8","07169e6e-ede5-4723-9955-537dbd0bd307","e01dae26-049a-43f8-a10e-bc847a083744","1a91a526-b034-4440-87a4-9d9dc40594a2","2ba0e9ec-287c-4b0b-8614-7610dcc99bc0","fa91e6b2-5c38-484d-b069-c3bf96fa8adb","fa207e89-78f6-4e44-bba5-b09c895be784","b27d52c2-9227-40ad-813e-ebdfb22817ee","67d8bfff-39a4-466e-92c7-2c4010ddc919","51a02c6f-1b68-4fd1-8b40-5ba5b2e4bea3","b2ef908d-9b2c-454f-b548-ca70caf12fca","fb36a611-a633-4d21-b108-2fb84f35d72c","3e9a395b-23f1-4af1-81a4-69a2603cad33","97b7d55b-bb12-4918-9536-c0ca5eb011b1"],"propsByKey":{"25f83d38-fa67-468e-bf81-1607ca3c4518":{"name":"computer1","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"pxsnkbinhx5ea4BWvIx9ykIhjYJar2ol","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/25f83d38-fa67-468e-bf81-1607ca3c4518.png"},"f747369e-00f1-4c28-9b07-7ec3e4cfda27":{"name":"computer5","sourceUrl":null,"frameSize":{"x":100,"y":109},"frameCount":1,"looping":true,"frameDelay":12,"version":"WlbogMfYguv__e_AdnWzwZbuYTSF3wYw","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":109},"rootRelativePath":"assets/f747369e-00f1-4c28-9b07-7ec3e4cfda27.png"},"5e7fd465-a353-403e-9185-8b236e808e90":{"name":"computer3","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"rAaQ6FJ1JjVOr7tNPmhAwgMZ9Ia3AVBY","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/5e7fd465-a353-403e-9185-8b236e808e90.png"},"72a0dbb5-828e-4206-a9e7-9509551a62ef":{"name":"computer4","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"tGKOam2KIkpwGp.Akh5O6MboMoPbw.Kv","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/72a0dbb5-828e-4206-a9e7-9509551a62ef.png"},"749ffc26-0609-4d92-990a-4a2b0b72ec76":{"name":"upgrade","sourceUrl":null,"frameSize":{"x":100,"y":20},"frameCount":1,"looping":true,"frameDelay":12,"version":"Qv5u9VEx8mgdzl3bx80ox6tgplHgpiXB","categories":["icons"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":20},"rootRelativePath":"assets/749ffc26-0609-4d92-990a-4a2b0b72ec76.png"},"d947cf6e-b44f-4fd7-bb27-752ed2a7aab8":{"name":"rebirth","sourceUrl":null,"frameSize":{"x":100,"y":20},"frameCount":1,"looping":true,"frameDelay":12,"version":"Tky4PI7sNICYPxIY8N8OrfeTYNXdn9ND","categories":["icons"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":20},"rootRelativePath":"assets/d947cf6e-b44f-4fd7-bb27-752ed2a7aab8.png"},"07169e6e-ede5-4723-9955-537dbd0bd307":{"name":"computer2","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"xwy3aFH2b6.4zWYiSssYG7h4UHXc1wqZ","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/07169e6e-ede5-4723-9955-537dbd0bd307.png"},"e01dae26-049a-43f8-a10e-bc847a083744":{"name":"money","sourceUrl":null,"frameSize":{"x":40,"y":40},"frameCount":1,"looping":true,"frameDelay":12,"version":"_Mjg6mdzAqjs_15.BqJ3fHfbzQfapKcc","loadedFromSource":true,"saved":true,"sourceSize":{"x":40,"y":40},"rootRelativePath":"assets/e01dae26-049a-43f8-a10e-bc847a083744.png"},"1a91a526-b034-4440-87a4-9d9dc40594a2":{"name":"sell","sourceUrl":null,"frameSize":{"x":50,"y":50},"frameCount":1,"looping":true,"frameDelay":12,"version":"WemyvpXpsTipWI0inxlnujRENgMcxElp","loadedFromSource":true,"saved":true,"sourceSize":{"x":50,"y":50},"rootRelativePath":"assets/1a91a526-b034-4440-87a4-9d9dc40594a2.png"},"2ba0e9ec-287c-4b0b-8614-7610dcc99bc0":{"name":"bitcoin","sourceUrl":null,"frameSize":{"x":40,"y":40},"frameCount":1,"looping":true,"frameDelay":12,"version":"133zeR._2Pzu3jXQLd4l8HL7nrzWckxK","loadedFromSource":true,"saved":true,"sourceSize":{"x":40,"y":40},"rootRelativePath":"assets/2ba0e9ec-287c-4b0b-8614-7610dcc99bc0.png"},"fa91e6b2-5c38-484d-b069-c3bf96fa8adb":{"name":"fan2","sourceUrl":null,"frameSize":{"x":80,"y":80},"frameCount":1,"looping":true,"frameDelay":12,"version":"NK2x4x2XnwUqeMgvvfc6PznwIBISi_eM","loadedFromSource":true,"saved":true,"sourceSize":{"x":80,"y":80},"rootRelativePath":"assets/fa91e6b2-5c38-484d-b069-c3bf96fa8adb.png"},"fa207e89-78f6-4e44-bba5-b09c895be784":{"name":"fan3","sourceUrl":null,"frameSize":{"x":80,"y":80},"frameCount":1,"looping":true,"frameDelay":12,"version":"WwPOLxUE8zkf6o4eiNuV_R339CEsGRww","loadedFromSource":true,"saved":true,"sourceSize":{"x":80,"y":80},"rootRelativePath":"assets/fa207e89-78f6-4e44-bba5-b09c895be784.png"},"b27d52c2-9227-40ad-813e-ebdfb22817ee":{"name":"fan1","sourceUrl":null,"frameSize":{"x":80,"y":80},"frameCount":1,"looping":true,"frameDelay":12,"version":"R0acUnCWhfduxCuaVul4t9tuHS5nlx1s","loadedFromSource":true,"saved":true,"sourceSize":{"x":80,"y":80},"rootRelativePath":"assets/b27d52c2-9227-40ad-813e-ebdfb22817ee.png"},"67d8bfff-39a4-466e-92c7-2c4010ddc919":{"name":"buy10on","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"PCX1aa2.A2o8436niR4aMhDNL3ZWDsNY","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/67d8bfff-39a4-466e-92c7-2c4010ddc919.png"},"51a02c6f-1b68-4fd1-8b40-5ba5b2e4bea3":{"name":"buy1on","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"E1oGf98UgCGW7NjkeA02pnwhjmR.Ol6s","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/51a02c6f-1b68-4fd1-8b40-5ba5b2e4bea3.png"},"b2ef908d-9b2c-454f-b548-ca70caf12fca":{"name":"buy1off","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"xVNeozx5xAKPc5o1Us3E7iodGUFhpdkJ","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/b2ef908d-9b2c-454f-b548-ca70caf12fca.png"},"fb36a611-a633-4d21-b108-2fb84f35d72c":{"name":"buy100on","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"i0xRAssvs_J2qN2AwkqJD.FelkowOIMe","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/fb36a611-a633-4d21-b108-2fb84f35d72c.png"},"3e9a395b-23f1-4af1-81a4-69a2603cad33":{"name":"buy100off","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"r8j7jNEfwZxpOp.bsVM3szHw0yeOzMlt","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/3e9a395b-23f1-4af1-81a4-69a2603cad33.png"},"97b7d55b-bb12-4918-9536-c0ca5eb011b1":{"name":"buy10off","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"_J73ghoNhaC8oy8e269SowTemmxS8RtV","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/97b7d55b-bb12-4918-9536-c0ca5eb011b1.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var buy1 = createSprite(40,10);
buy1.setAnimation("buy1on");
buy1.scale = 0.75;
var buy10 = createSprite(130,10);
buy10.setAnimation("buy10off");
buy10.scale = 0.75;
var buy100 = createSprite(220,10);
buy100.setAnimation("buy100off");
buy100.scale = 0.75;
var secret = createSprite(-200,-200);
secret.rotation = 45;
var computer = createSprite(200,200);
computer.setAnimation("computer1");
var upgrade = createSprite(75, 185);
upgrade.setAnimation("upgrade");
var coin = createSprite(50, 50);
coin.setAnimation("bitcoin");
var cash = createSprite(50, 100);
cash.setAnimation("money");
var fan1 = createSprite(315, 85);
fan1.setAnimation("fan1");
var fan2 = createSprite(315, 200);
fan2.setAnimation("fan2");
var fan3 = createSprite(315, 315);
fan3.setAnimation("fan3");
var sellbutton = createSprite(45, 275);
sellbutton.setAnimation("sell");
fan2.visible = false;
var cost1 = 200000000;
var bps = 1;
var money = 0;
var bitcoins = 0;
//var user = getUserId();
var bitcoinprice = 10000;
var cost2 = 22000000;
var cost3 = 150000000;
var cost4 = 1000000000;
var fan1s = 1;
var fan2s = 0;
var fan3s = 0;
var buymax = 1;
var rebirth = 100;
var rtxaccessible = 0;
var buyten = 0;
var oldbitcoinprice = 10000;
var olderbitcoinprice = 10000;
var oldestbitcoinprice = 10000;
var counter = World.seconds;
function draw() {
  bps = (((fan1s * 1) + fan2s * 10) * (fan3s+1)) * rebirth;
  background("white");
  if(counter != World.seconds){
  bitcoins = bitcoins + bps;
  oldestbitcoinprice = olderbitcoinprice;
  olderbitcoinprice = oldbitcoinprice;
  oldbitcoinprice = bitcoinprice;
  bitcoinprice = bitcoinprice + randomNumber(-7500, 7500);
  if (bitcoinprice > 30000) {
    bitcoinprice = 30000;
  }
  if (bitcoinprice < 5000) {
    bitcoinprice = 5000;
  }
  }
  if (mouseIsOver(buy1)) {
    if (mouseWentUp()) {
      buy1.setAnimation("buy1on");
      buy10.setAnimation("buy10off");
      buy100.setAnimation("buy100off");
      buyten=0;
    }
  }
  if (mouseIsOver(buy10)) {
    if (mouseWentUp()) {
      buy1.setAnimation("buy1off");
      buy10.setAnimation("buy10on");
      buy100.setAnimation("buy100off");
      buyten=1;
    }
  }
  if (mouseIsOver(buy100)) {
    if (mouseWentUp()) {
      buy1.setAnimation("buy1off");
      buy10.setAnimation("buy10off");
      buy100.setAnimation("buy100on");
      buyten = 2;
    }
  }
  counter = World.seconds;
  if(mouseIsOver(upgrade)){
   if(mouseWentUp()){
    if (rtxaccessible == 1) {
      rebirth = rebirth + Math.round(bitcoins/100000);
       money = 0;
       fan1s = 1;
       fan2s = 0;
       fan3s = 0;
    cost2 = 22000000;
   cost3 = 150000000;
  cost4 = 1000000000;
       bitcoins = 0;
    }
  }
}
  if(mouseIsOver(upgrade)){
   if(mouseWentUp()){
    if (rtxaccessible == 0) {
      if(money >= cost1){
       money = money - cost1;
       computer.setAnimation("computer4");
       rtxaccessible = 1;
       fan2.visible = true;
       upgrade.setAnimation("rebirth");
      }
    }
  }
}
  if(mouseIsOver(sellbutton)){
    if(mouseWentUp()){
      money = money + bitcoins * bitcoinprice;
      bitcoins = 0;
    }
  }
  if(buyten == 1) {
  if(mouseIsOver(fan1)){
    if(mouseWentUp()){
      if(money >= (cost2 * 10) + (2200000 * 45)){
      money = money - (cost2 * 10) - (2200000 * 45);
      fan1s = fan1s + 10;
      cost2 = cost2 + 22000000;
      }
    }
  }
}
  if(buyten == 2) {
  if(mouseIsOver(fan1)){
    if(mouseWentUp()){
      buymax = 1000;
      while (money > (cost2 * buymax) + (2200000 * (buymax * ((buymax-1)/2)))) {
        buymax = buymax + 1000;
}
buymax = buymax - 1000;
      while (money > (cost2 * buymax) + (2200000 * (buymax * ((buymax-1)/2)))) {
        buymax = buymax + 100;
}
  buymax = buymax - 100;
      while (money > (cost2 * buymax) + (2200000 * (buymax * ((buymax-1)/2)))) {
        buymax = buymax + 10;
}
buymax = buymax - 10;
      while (money > (cost2 * buymax) + (2200000 * (buymax * ((buymax-1)/2)))) {
        buymax = buymax + 1;
}
buymax = buymax - 1;
  if (buymax > 0){
  money = money - ((cost2 * buymax) + (2200000 * (buymax * ((buymax-1)/2))));
  fan1s = fan1s + buymax;
  cost2 = cost2 + (2200000 * buymax);
  }
    }
  }
}
  if(buyten == 0) {
  if(mouseIsOver(fan1)){
    if(mouseWentUp()){
      if(money >= cost2) {
      money = money - cost2;
      fan1s = fan1s + 1;
      cost2 = cost2 + 2200000;
      }
    }
  }
}
if(buyten == 1) {
  if(mouseIsOver(fan2)){
    if(mouseWentUp()){
      if (rtxaccessible == 1) {
        if(money >= ((cost3*10)+(15000000*45))) {
        money = money - ((cost3*10)+(15000000*45));
        fan2s = fan2s + 10;
        cost3 = cost3 + 150000000;
        }
      }
    }
  }
}
if(buyten == 2) {
  if(mouseIsOver(fan2)){
    if(mouseWentUp()){
      if (rtxaccessible == 1) {
              buymax = 1000;
      while (money > (cost3 * buymax) + (15000000 * (buymax * ((buymax-1)/2)))) {
        buymax = buymax + 1000;
}
buymax = buymax - 1000;
      while (money > (cost3 * buymax) + (15000000 * (buymax * ((buymax-1)/2)))) {
        buymax = buymax + 100;
}
  buymax = buymax - 100;
      while (money > (cost3 * buymax) + (15000000 * (buymax * ((buymax-1)/2)))) {
        buymax = buymax + 10;
}
buymax = buymax - 10;
      while (money > (cost3 * buymax) + (15000000 * (buymax * ((buymax-1)/2)))) {
        buymax = buymax + 1;
}
buymax = buymax - 1;
if (buymax > 0) {
  money = money - ((cost3 * buymax) + (15000000 * (buymax * ((buymax-1)/2))));
  fan2s = fan2s + buymax;
  cost3 = cost3 + (15000000 * buymax);
}
      }
    }
  }
}
if(buyten == 0) {
  if(mouseIsOver(fan2)){
    if(mouseWentUp()){
      if (rtxaccessible == 1) {
        if(money >= cost3) {
        money = money - cost3;
        fan2s = fan2s + 1;
        cost3 = cost3 + 15000000;
        }
      }
    }
  }
}
  if(mouseIsOver(fan3)){
    if(mouseWentUp()){
      if(money >= cost4) {
      money = money - cost4;
      fan3s = fan3s + 1;
      cost4 = cost4 * 2;
      }
    }
  }
    strokeWeight(1);
  if (oldbitcoinprice > bitcoinprice) {
    stroke("red");
  } else if ((bitcoinprice > oldbitcoinprice)) {
    stroke("green");
  } else {
    stroke("yellow");
  }
  if (385-(bitcoinprice/300)<285) {
     text("Current Price: $" + bitcoinprice, 150, 285);
  } else {
    text("Current Price: $" + bitcoinprice, 150, 385-(bitcoinprice/300));
  }
  if (oldbitcoinprice > bitcoinprice) {
    fill("red");
  } else if ((bitcoinprice > oldbitcoinprice)) {
    fill("green");
  } else {
    fill("yellow");
  }
  line(180, 400-(oldbitcoinprice/300), 270, 400-(bitcoinprice/300));
  ellipse(270, 400-(bitcoinprice/300), 10, 10);
    if (olderbitcoinprice > oldbitcoinprice) {
    stroke("red");
  } else if ((oldbitcoinprice > olderbitcoinprice)) {
    stroke("green");
  } else {
    stroke("yellow");
  }
    line(90, 400-(olderbitcoinprice/300), 180, 400-(oldbitcoinprice/300));
      if (oldestbitcoinprice > olderbitcoinprice) {
    stroke("red");
  } else if ((olderbitcoinprice > oldestbitcoinprice)) {
    stroke("green");
  } else {
    stroke("yellow");
  }
    line(0, 400-(oldestbitcoinprice/300), 90, 400-(olderbitcoinprice/300));
    drawSprites();
  fill("black");
    textSize(13);
    
  noStroke();
  if (rtxaccessible == 0) {
    text("Upgrade computer", 25, 165);
    text("Cost:" + cost1/100000, 25, 215);
  }
      if (rtxaccessible == 1) {
    text("Lose everything for a", 25, 165);
    text(Math.round(bitcoins/100000) + "% bonus", 25, 215);
  }
    text("Bitcoins: " + bitcoins/100000, 80, 55);
    text("Money: $" + money/100000, 80, 105);
    text("Sell your bitcoin!", 85, 270);
  text("Cost: $" + cost2/100000, 275, 25);
    text("GPUs:" + fan1s, 275, 40);
    
  if (rtxaccessible == 1) {
    text("Cost: $" + cost3/100000, 275, 140);
    text("RTX 3090s:" + fan2s, 275, 155);
  }
  text("Cost: $" + cost4/100000, 275, 255);
    
    
    text("GPU Freezer: " + fan3s, 275, 270);
    text("BPS: " + bps/100000, 150, 140);
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
