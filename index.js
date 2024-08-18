import { plusMinusLvls1 } from "./order-operations-lvl-1.js";

let plusMinusLvls1Progress = 0;
let plusMinusLvls1Complete = false; 
let activeLevel = '';

const plusMinusLvls2 = 'Level 2';

const plusMinusTimesLvls1 = 'Level 3';

const plusMinusTimesLvls2 = 'Level 4';

const plusMinusTimesDivideLvls1 = 'Level 5';

const plusMinusTimesDivideLvls2 = 'Level 6';

const levelButtons = document.querySelectorAll('.order-operations-levels-menu');
const currentLevelDisplay = document.getElementById('current-level-display');
const levelPointsDisplayCurrent = document.getElementById('level-points-current');
const levelPointsDisplayBest = document.getElementById('level-points-best');

const operationsDisplay = document.querySelector('.operation-container');

const regexOpr = new RegExp("^.{0,3}");
const regexOprNum = new RegExp("[1-9]");
const regexOprType = new RegExp("\-(.*)");

let currentLevel = [];
let currentEx = [];
let currentOpr = 1;
let fibonacchiCount = 1;
let levelPoints = 0;

/*
function shuffleNewLevel(level) {

  console.log(level);
  let currentIndex = level.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [level[currentIndex], level[randomIndex]] = [
      level[randomIndex], level[currentIndex]];
  }

  return level;
}
  */

$('.dropdown').on('click', (e) => {

  $('.dropdown').toggleClass('is-active');

  const levelToDisplay = e.target.cloneNode(true);
  levelToDisplay.id = 'level-displayed';
  currentLevelDisplay.innerHTML = '';

  const progressBarToDisplay = document.createElement('div');
  progressBarToDisplay.id = "current-level-progress";

  currentLevelDisplay.appendChild(levelToDisplay);
  currentLevelDisplay.appendChild(progressBarToDisplay);

  for (var i = 0; i < 10; i++) {
    let progressBar = document.createElement('div');
    progressBar.id = `current-level-ex-${i}`;
    progressBar.classList.add('current-level-ex');
    progressBarToDisplay.appendChild(progressBar);
  }

  if (e.target.id = 'level-1') {
    activeLevel = 'level-1';
  } else if (e.target.id = 'level-2') {
    activeLevel = 'level-2';
  } else if (e.target.id = 'level-3') {
    activeLevel = 'level-3';
  } else if (e.target.id = 'level-4') {
    activeLevel = 'level-4';
  } else if (e.target.id = 'level-5') {
    activeLevel = 'level-5';
  } else if (e.target.id = 'level-6') {
    activeLevel = 'level-6';
  }
});

function updateProgressBar(level) {

  console.log(level);

  if (level == 'level-1') {
    plusMinusLvls1Progress++;

    let progressBarToColor = document.getElementsByClassName('current-level-ex');
    console.log(progressBarToColor);

    console.log(progressBarToColor[0]);
    for (var i = 0; i < plusMinusLvls1Progress; i++) {

      progressBarToColor[i].classList.add('progress-gained');
    }

    if (plusMinusLvls1Progress === 10) {

      plusMinusLvls1Complete = true;
      document.getElementById('level-displayed').classList.add('complete');
    }
  }
}

function exerciseComplete(event) {

  var x = event.clientX,
  y = event.clientY;
  cleanUpArray();
  initParticles(config.particleNumber, x, y);

  updateProgressBar(activeLevel);
}

function getFibonacchiPoints(num) {

  console.log("fibonacchiCount is -> " + fibonacchiCount);

  let fibSeq = [];

  if (num === 1) {

    fibonacchiCount++;
    return 1;
  } else if (num === 2) {

    fibonacchiCount++;
    return 2;
  } else if (num > 2) {

    fibSeq = [1, 2];

    for (var i = 2; i < num; i++ ) {

      let nextFib = fibSeq[i - 2] + fibSeq[i - 1];
      fibSeq.push(nextFib);
    }

    fibonacchiCount++;
    return (fibSeq[num - 1]);
  }
}

function animatePoints(event, hit) {

  let floatingPoints = document.createElement('div');
  floatingPoints.style.position = 'absolute';
  floatingPoints.classList.add('floating-points');
  floatingPoints.classList.add('order-operator-float');

  operationsDisplay.appendChild(floatingPoints);

  if (hit) {

    floatingPoints.classList.add('correct');
    let fibonacchiPoints = getFibonacchiPoints(fibonacchiCount);
    levelPoints = levelPoints + fibonacchiPoints;
    levelPointsDisplayCurrent.textContent = 'Level points: ' + levelPoints;
    floatingPoints.textContent = '+' + fibonacchiPoints + ' pts';
    $('.floating-points').animate({
      opacity: 0,
      top: 300,
    }, 2000)
  } else {

    levelPoints--;
    floatingPoints.classList.add('wrong');
    floatingPoints.textContent = '-1';
    levelPointsDisplayCurrent.textContent = 'Level points: ' + levelPoints;
    fibonacchiCount = 1;
    $('.floating-points').animate({
      opacity: 0,
      top: 600,
    }, 2000)
  }

  setTimeout(() => {
    console.log()
    floatingPoints.remove();
  }, 2000);
}

function getTempAnswer(opr1, operation, opr2) {

  console.log("reaching resolveTempOperation");
  if (operation == 'plus') {

    console.log("operation is a sum");
    return opr1 + opr2;
  } else if (operation == 'minus') {

    console.log("operation is a subtraction");
    return opr1 - opr2;
  }

  console.log("not recognizing operation");
}

function resolveUserAnswer(tempAnswer, tempDisplay, event) {

  $('button#temp-submit').on('click', (e) => {

    const userAnswer = $('input#temp-input').val();
    if (userAnswer == tempAnswer) {

      animatePoints(e.target, true);

      setTimeout(() => {

        if (currentEx.length > 3) {

          updateOperationDisplay(userAnswer, currentEx);
          tempDisplay.remove();
        } else if (currentEx.length <= 3) {
  
          currentOpr = 1;
          exerciseComplete(event);
          startLevel(currentLevel);
          tempDisplay.remove();
        }
      }, 1000);

    } else if (userAnswer != tempAnswer) {

      animatePoints(e.target, false);
      console.log("That is incorrrect");
      tempDisplay.style.backgroundColor = 'hsl(348, 100%, 61%)';

      setTimeout(() => {

        tempDisplay.style.backgroundColor = 'white';
      }, 500);
    }
  });
}

function getOperationSymbol (operationToTest) {

  if (operationToTest === 'plus') {

    return '&plus;';
  } else if (operationToTest === 'minus') {

    return '&minus;';
  }

}

function updateOperationDisplay(newNum) {

  currentEx.shift();
  currentEx.shift();
  currentEx.shift();

  let newP = document.createElement('p');

  newP.id = 'numNew';
  newP.textContent = newNum;
  currentEx.unshift(newP);

  console.log(currentEx);

  for (var i = 0; i < currentEx.length; i++) {

    operationsDisplay.appendChild(currentEx[i]);
  }
}

function displayTempOperation(opr1, operation, opr2, event) {

  let tempDisplay = document.createElement('div');
  tempDisplay.id = 'temp-display';

  let tempOperation = document.createElement('div');
  tempOperation.id = 'temp-operation';

  let tempOperationSymbol = getOperationSymbol(operation);

  tempOperation.innerHTML = `${opr1} ${tempOperationSymbol} ${opr2} =&nbsp;
    <input value="" id="temp-input" placeholder="¿?"></input>`;

  let tempSubmit = document.createElement('button');
  tempSubmit.id = 'temp-submit';
  tempSubmit.textContent = 'Check';

  tempDisplay.appendChild(tempOperation);
  tempDisplay.appendChild(tempSubmit);

  operationsDisplay.appendChild(tempDisplay);

  const tempAnswer = getTempAnswer(opr1, operation, opr2);

  console.log("Temp Answer is " + tempAnswer);

  resolveUserAnswer(tempAnswer, tempDisplay, event);

}

function testOperation(event, ex) {

  let tempId = event.id;
  console.log("temp ID is -> " + tempId);

  console.log("index pos is -> " + ex.indexOf(event));
  console.log("operation is -> " + ex[ex.indexOf(event)].innerHTML);

  let tempOperand1 = parseInt(ex[ex.indexOf(event) - 1].innerHTML);
  let tempOperation = regexOprType.exec(ex[ex.indexOf(event)].id)[1];
  let tempOperand2 = parseInt(ex[ex.indexOf(event) + 1].innerHTML);
  
  console.log(tempOperand1);
  console.log(tempOperation);
  console.log(tempOperand2);
  if (currentOpr == regexOprNum.exec(tempId)) {
    console.log("+1 points");

    animatePoints(event, true);
    setTimeout(() => {

      displayTempOperation(tempOperand1, tempOperation, tempOperand2, event);

      if (ex.length > 3) {
        document.getElementById(ex[ex.indexOf(event) - 1].id).remove();
        document.getElementById(ex[ex.indexOf(event)].id).remove();
        document.getElementById(ex[ex.indexOf(event) + 1].id).remove();
      }
    }, 1000);

    currentOpr++;
  } else if (currentOpr != regexOprNum.exec(tempId)) {

    animatePoints(event, false);

    operationsDisplay.style.backgroundColor = 'hsl(348, 100%, 61%)';
    setTimeout(() => {
      operationsDisplay.style.backgroundColor = 'transparent';
    }, 500)
  }
}

function startLevel(lvl) {

  operationsDisplay.innerHTML = '';

  currentEx = [];

  for (var i = 0; i < lvl[0].length; i++) {

    let newP = document.createElement('p');

    console.log(newP);
    if (lvl[0][i].type === 'num') {

      newP.innerHTML = `${lvl[0][i].val}`;
      newP.id = `${lvl[0][i].pos}`;
    } else if (lvl[0][i].type === 'opr') {

      newP.innerHTML = `${lvl[0][i].val}`;
      newP.classList.add('order-operator');
      newP.id = `${lvl[0][i].pos}`;
    }

    currentEx.push(newP);
  }

  for (var j = 0; j < currentEx.length; j++) {

    console.log("appending element for currentEx");
    operationsDisplay.appendChild(currentEx[j]);
  }
  currentLevel.shift();
  

  currentEx.forEach(p => {

    if (regexOpr.exec(p.id)) {

      console.log("adding event listener to opr");
      p.addEventListener('click', (e) => {

        e.stopPropagation();
        testOperation(e.target, currentEx);
      })
    }
  });
}


levelButtons.forEach(level => {

  level.addEventListener('click', (e) => {

    console.log(e);
    console.log(e.target);
    levelButtons.forEach(level => {

      level.classList.remove('active');
    })

    level.classList.add('active');

    if (e.target.id === 'level-1') {

      console.log("Starting plusMinusLvls1");
      currentLevel = plusMinusLvls1;

      startLevel(currentLevel);

    } else if (e.target.id === 'level-2') {

      startLevel(plusMinusLvls2);
    } else if (e.target.id === 'level-3') {

      startLevel(plusMinusTimesLvls1);
    } else if (e.target.id === 'level-4') {

      startLevel(plusMinusTimesLvls2);
    } else if (e.target.id === 'level-5') {

      startLevel(plusMinusTimesDivideLvls1);
    } else if (e.target.id === 'level-6') {

      startLevel(plusMinusTimesDivideLvls2);
    }
  });
})


// Explosion Code
// Little Canvas things
var canvas = document.querySelector("#canvas"),
ctx = canvas.getContext('2d');

// Set Canvas to be window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuration, Play with these
var config = {
  particleNumber: 800,
  maxParticleSize: 10,
  maxSpeed: 40,
  colorVariation: 50 };


// Colors
var colorPalette = {
  bg: { r: 12, g: 9, b: 29 },
  matter: [
  /* Original colors
  { r: 36, g: 18, b: 42 }, // darkPRPL
  { r: 78, g: 36, b: 42 }, // rockDust
  { r: 252, g: 178, b: 96 }, // solorFlare
  { r: 253, g: 238, b: 152 } // totesASun
  */

  { r: 0, g: 209, b: 178 }, // Bulma primary
  { r: 32, g: 156, b: 238 }, // Bulma info
  { r: 255, g: 221, b: 87 }, // Bulma Warning
  { r: 181, g: 181, b: 181}, //Bulma Text Light Gray
  ] };


// Some Variables hanging out
var particles = [],
centerX = canvas.width / 2,
centerY = canvas.height / 2,
drawBg,

// Draws the background for the canvas, because space
drawBg = function (ctx, color) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// Particle Constructor
var Particle = function (x, y) {
  // X Coordinate
  this.x = x || Math.round(Math.random() * canvas.width);
  // Y Coordinate
  this.y = y || Math.round(Math.random() * canvas.height);
  // Radius of the space dust
  this.r = Math.ceil(Math.random() * config.maxParticleSize);
  // Color of the rock, given some randomness
  this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
  // Speed of which the rock travels
  this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
  // Direction the Rock flies
  this.d = Math.round(Math.random() * 360);
};

// Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2
var colorVariation = function (color, returnString) {
  var r, g, b, a, variation;
  r = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.r);
  g = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.g);
  b = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.b);
  a = Math.random() + .5;
  if (returnString) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  } else {
    return { r, g, b, a };
  }
};

// Used to find the rocks next point in space, accounting for speed and direction
var updateParticleModel = function (p) {
  var a = 180 - (p.d + 90); // find the 3rd angle
  p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
  p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
  return p;
};

// Just the function that physically draws the particles
// Physically? sure why not, physically.
var drawParticle = function (x, y, r, c) {
  ctx.beginPath();
  ctx.fillStyle = c;
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
};

// Remove particles that aren't on the canvas
var cleanUpArray = function () {
  particles = particles.filter(p => {
    return p.x > -100 && p.y > -100;
  });
};


var initParticles = function (numParticles, x, y) {
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(x, y));
  }
  particles.forEach(p => {
    drawParticle(p.x, p.y, p.r, p.c);
  });
};

// That thing
window.requestAnimFrame = function () {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();


// Our Frame function
var frame = function () {
  // Draw background first
  drawBg(ctx, colorPalette.bg);
  // Update Particle models to new position
  particles.map(p => {
    return updateParticleModel(p);
  });
  // Draw em'
  particles.forEach(p => {
    drawParticle(p.x, p.y, p.r, p.c);
  });
  // Play the same song? Ok!
  window.requestAnimFrame(frame);
};

// Click listener
document.body.addEventListener("click", function (event) {
  
});

// First Frame
frame();

// First particle explosion
// initParticles(config.particleNumber);