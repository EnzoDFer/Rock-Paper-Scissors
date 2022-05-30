"use strict";

const choices = ['rock','paper','scissors'];
const gameButton = document.querySelector('#gameButton');
const playerLifeCount = document.querySelector('#playerLives');
const monsterLifeCount = document.querySelector('#monsterLives');

const testButton = document.querySelector('#testButton');
const plDiv = document.querySelector('#playerHealthBar');
const monDiv = document.querySelector('#monsterHealthBar');


const newSVG = (svgElement,aDiv)=> {
  const newSVG = document.querySelector(svgElement).cloneNode(true);
  aDiv.appendChild(newSVG);
};

gameButton.addEventListener('click', () => gameStart(playerLifeCount.value,monsterLifeCount.value));
testButton.addEventListener('click', () => {
  gameStart(playerLifeCount.value,monsterLifeCount.value);
})

function gameStart(playerLives, monsterLives) {
  for (let i=1;i<playerLives;i++) {
    newSVG('#heartSvg',plDiv);
  }
  for (let i=1;i<monsterLives;i++) {
    newSVG('#cartoonSkull',monDiv);
  }
};


function computerPlay() { //randomly chooses from choices array
  return choices[Math.floor(Math.random()*choices.length)]
}


function playRound(playerSelection='rock') {
  return winCheck(playerSelection,computerPlay())
}

function winCheck(playerSelection, computerSelection) {
  switch (playerSelection.toLowerCase()) {
    case 'rock':
      if (computerSelection === 'rock') { 
        console.log('Tie! Try again')
        return 0;
      } else if (computerSelection === 'paper') {
        console.log('You Lose! Paper beats Rock')
        return -1;
      } else if (computerSelection === 'scissors') {
        console.log('You Win! Rock beats Scissors')
        return 1;
      } break;
    case 'paper':
      if (computerSelection === 'rock') { 
        console.log('You Win! Paper beats Rock')
        return 1;
      } else if (computerSelection === 'paper') {
        console.log('Tie! Try again')
        return 0;
      } else if (computerSelection === 'scissors') {
        console.log('You Lose! Scissors beats Paper')
        return -1;
      } break;
    case 'scissors':
      if (computerSelection === 'rock') { 
        console.log('You Lose! Rock beats Scissors')
        return -1;
      } else if (computerSelection === 'paper') {
        console.log('You Win! Scissors beat Paper')
        return 1;
      } else if (computerSelection === 'scissors') {
        console.log('Tie! Try again')
        return 0;
      } break;    
  }
}   


function game() {
  let playerScore = 0;
  let computerScore = 0;
  let playerLivesLeft = playerLifeCount.value;
  let monsterLivesLeft = monsterLifeCount.value;

  while (playerLivesLeft > 0 && monsterLivesLeft > 0) {

    let playerSelection = prompt('Please pick: rock/paper/scissors');
    let result = playRound(playerSelection);
    if (result>0) {
      playerScore+=result;
      monsterLivesLeft--;
    }
    else if (result<0) {
      computerScore+=(result*-1)
      playerLivesLeft--;
    }
  }

  if (playerScore === computerScore) { 
      console.log('No Winner! It\'s a tie!');
  } else {
      console.log(`Winner: ${(playerScore>computerScore)?'Player':'Computer'}`)
  }

}