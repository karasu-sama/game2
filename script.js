'use strict';

document.addEventListener('keydown', function (s) {
  if (s.key === 'Enter') {
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
    document.querySelector('.main').classList.remove('hidden');
  }
});

document.querySelector('.exit').addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
  document.querySelector('.main').classList.remove('hidden');
});

const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');

const player0 = document.querySelector('.player--0');
const score0 = document.getElementById('score--0');
const current0 = document.getElementById('current--0');
const ops0 = document.querySelector('.OPS--0');

const player1 = document.querySelector('.player--1');
const score1 = document.getElementById('score--1');
const current1 = document.getElementById('current--1');
const ops1 = document.querySelector('.OPS--1');

let scores, currentScore, activePlayer, playing;

document.querySelector('.main').classList.add('hidden');

console.log();

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  ops0.textContent = 0;
  ops1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}
init();

function phoneView() {
  if (activePlayer === 0) {
    player0.classList.remove('off');
    player1.classList.add('off');
    dice.classList.toggle('off');
  } else if (activePlayer === 1) {
    player0.classList.add('off');
    player1.classList.remove('off');
    dice.classList.toggle('off');
  } else {
    console.log('fuck');
  }
}

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  phoneView();
};

rollBtn.addEventListener('click', function () {
  if ([playing]) {
    const diceNumber = Math.floor(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.classList.remove('off');

    dice.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log(currentScore);
    } else {
      alert(`You got [1]
        switching players`);
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    document.querySelector(`.OPS--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      dice.classList.add('hidden');
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
      phoneView();
    }
  }
});

console.log(activePlayer);

newBtn.addEventListener('click', init);
