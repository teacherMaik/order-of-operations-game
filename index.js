import { plusMinusLvls1 } from "./order-operations-lvl-1.js";


const plusMinusLvls2 = 'Level 2';

const plusMinusTimesLvls1 = 'Level 3';

const plusMinusTimesLvls2 = 'Level 4';

const plusMinusTimesDivideLvls1 = 'Level 5';

const plusMinusTimesDivideLvls2 = 'Level 6';

const operationsDisplay = document.querySelector('.operation-container');
const levelButtons = document.querySelectorAll('.order-operations-levels-menu');

const regexOpr = new RegExp("^.{0,3}");
const regexOprNum = new RegExp("[1-9]");
const regexOprType = new RegExp("\-(.*)");

var exstarted = false;
let currentLevel = [];
let currentEx = [];
let currentOpr = 1;
let fibonacchiCount = 1;

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

function startExercise(lvl) {

  operationsDisplay.innerHTML = '';
  console.log(lvl);
  console.log("to be exercise is -> " + lvl[0]);

  let exercise = [];
  console.log("new exercise is -> " + exercise);
  console.log("new exercise length is -> " + lvl[0].length);
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

    exercise.push(newP);
  }

  for (var j = 0; j < exercise.length; j++) {

    console.log("appending element for exercise");
    operationsDisplay.appendChild(exercise[j]);
  }
  currentLevel.shift();
  console.log(currentLevel);
  return [exercise, lvl];
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
    floatingPoints.textContent = '+' + fibonacchiPoints + ' pts';
    $('.floating-points').animate({
      opacity: 0,
      top: 300,
    }, 2000)
  } else {

    floatingPoints.classList.add('wrong');
    floatingPoints.textContent = '-1';
    fibonacchiCount = 1;
    $('.floating-points').animate({
      opacity: 0,
      top: 600,
    }, 2000)

    setTimeout(() => {
      floatingPoints.remove();
    }, 2000);
  }
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

function resolveUserAnswer(tempAnswer, tempDisplay) {

  console.log("tempAnswer is " + tempAnswer);
  $('button#temp-submit').on('click', (e) => {

    const userAnswer = $('input#temp-input').val();
    
    if (userAnswer == tempAnswer) {

      console.log("That is correct");
      animatePoints(e.target, true);

      if (currentEx.length > 3) {
        updateOperationDisplay(userAnswer, currentEx);
        tempDisplay.remove();

        console.log("CurrentEx length is -> " + currentEx.length);

        console.log("next exercise is -> " + currentLevel[0]);
      } else if (currentEx.length <= 3) {

        console.log("CurrentEx length is -> " + currentEx.length);

        console.log("next exercise is -> " + currentLevel[0]);
        //alert("You completed this 3exercise");
        tempDisplay.remove();
        
        startExercise(currentLevel);
      }

    } else if (userAnswer != tempAnswer) {

      animatePoints(e.target, false);
      console.log("That is incorrrect");
      tempDisplay.style.backgroundColor = 'rgba(235, 230, 69, 1)';

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

function displayTempOperation(opr1, operation, opr2) {

  let tempDisplay = document.createElement('div');
  tempDisplay.id = 'temp-display';

  let tempOperation = document.createElement('div');
  tempOperation.id = 'temp-operation';

  let tempOperationSymbol = getOperationSymbol(operation);

  tempOperation.innerHTML = `${opr1} ${tempOperationSymbol} ${opr2} =&nbsp;
    <input value="" id="temp-input" placeholder="¿?"></input>`;

  let tempSubmit = document.createElement('button');
  tempSubmit.id = 'temp-submit';
  tempSubmit.textContent = 'Comprobar';

  tempDisplay.appendChild(tempOperation);
  tempDisplay.appendChild(tempSubmit);

  operationsDisplay.appendChild(tempDisplay);

  const tempAnswer = getTempAnswer(opr1, operation, opr2);

  console.log("Temp Answer is " + tempAnswer);

  resolveUserAnswer(tempAnswer, tempDisplay);

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

      displayTempOperation(tempOperand1, tempOperation, tempOperand2);

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

levelButtons.forEach(level => {

  level.addEventListener('click', (e) => {

    levelButtons.forEach(level => {

      level.classList.remove('active');
    })

    level.classList.add('active');

    if (e.target.id === 'level-1') {

      console.log("Starting plusMinusLvls1");
      currentLevel = plusMinusLvls1;

      const exData = startExercise(currentLevel);

      currentEx = exData[0];
      let remainingEx = exData[1];

      currentEx.forEach(p => {

        if (regexOpr.exec(p.id)) {

          console.log("adding event listener to opr");
          p.addEventListener('click', (e) => {

            e.stopPropagation();
            testOperation(e.target, currentEx);
          })
        }
      });

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
