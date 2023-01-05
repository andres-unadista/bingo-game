const elPlayer1 = document.getElementById('player1');
const elPlayer2 = document.getElementById('player2');
const elShowBall = document.getElementById('show-ball');
const elResults = document.getElementById('results');

elShowBall.addEventListener('click', handleShowBall);

let arrayPlayer1 = [];
let arrayPlayer2 = [];
let ballsPermanence = [];

fillBalls();

function handleShowBall() {
  const number = printBall(elShowBall);
  validateBallInCards(number, elPlayer1, elPlayer2);
  comprobateWinner();
}

function printBall(element) {
  let indexArray = randomNumber(0, ballsPermanence.length - 1);
  let number = ballsPermanence[indexArray];
  element.textContent = number;

  removedBall(number);
  return number;
}

function removedBall(ball) {
  ballsPermanence = ballsPermanence.filter(number => number !== ball);
}

function fillBalls() {
  for (let ball = 1; ball <= 100; ball++) {
    ballsPermanence.push(ball);
  }
}

function validateBallInCards(ball, elPlayer1, elPlayer2) {
  let stateCard = false;
  if (arrayPlayer1.includes(ball)) {
    let player1 = elPlayer1.querySelector(`[data-id="${ball}"]`);
    findCardHTML(player1, ball, arrayPlayer1);
    let stateCard = true;
  }
  if (arrayPlayer2.includes(ball)) {
    let player2 = elPlayer2.querySelector(`[data-id="${ball}"]`);
    findCardHTML(player2, ball, arrayPlayer2, stateCard);
  }
}


function findCardHTML(player, ball, arrayPlayer, stateCard = false) {
  player.classList.add('board__item--desactive');
  let cloneCard = player.cloneNode(true);
  cloneCard.classList.remove('board__item--desactive');

  if (stateCard) {
    elResults.lastChild = cloneCard;
  } else {
    elResults.appendChild(cloneCard);
  }

  let index = arrayPlayer.findIndex((number) => number === ball);
  arrayPlayer.splice(index, 1);
}

function comprobateWinner() {
  if (arrayPlayer1.length === 0) {
    elShowBall.removeEventListener('click', handleShowBall);
    setTimeout(() => {
      alert('Player 1 is the winner 🎉');
    }, 500);
  }

  if (arrayPlayer2.length === 0) {
    setTimeout(() => {
      alert('Player 2 is the winner 🎉');
    }, 500);
    elShowBall.removeEventListener('click', handleShowBall);
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) ?? 0;
}

function generateCards() {
  let arrayCards = [];

  while (arrayCards.length < 15) {
    let numberGenerator = randomNumber(1, 100);
    if (arrayCards.includes(numberGenerator)) {
      continue;
    }
    arrayCards.push(numberGenerator);
  }

  return arrayCards;
}

function printCards(element, cards) {
  cards.map((card) => {
    const item = `<div class="board__item" data-id="${card}">${card}</div>`;
    element.innerHTML += item;
  });
}

arrayPlayer1 = generateCards();
arrayPlayer2 = generateCards();

printCards(elPlayer1, arrayPlayer1);
printCards(elPlayer2, arrayPlayer2);