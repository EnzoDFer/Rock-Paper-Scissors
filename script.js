"use strict";

const choices = ['rock','paper','scissors'];
const gameButton = document.querySelector('#gameButton');
const playerLifeCount = document.querySelector('#playerLives');
const monsterLifeCount = document.querySelector('#monsterLives');

const plDiv = document.querySelector('#playerHealthBar');
const monDiv = document.querySelector('#monsterHealthBar');
const scoreboard = document.querySelector('#board');
const rock = document.querySelector('#rockButton');
const paper = document.querySelector('#paperButton');
const scissors = document.querySelector('#scissorsButton');

const heartSVG = document.querySelector('#heartSvg');
const cartoonSkullSVG = document.querySelector('#cartoonSkull');


function lifeSet(playerLives,monsterLives) {
  const nodes = [plDiv,monDiv];
  nodes.forEach((node)=>{
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  });
  for (let i=1;i<=playerLives;i++) {
    const svg = heartSVG.cloneNode(true);
    plDiv.appendChild(svg);
  }
  for (let i=1;i<=monsterLives;i++) {
    const svg = cartoonSkullSVG.cloneNode(true);
    monDiv.appendChild(svg);
  }
}

gameButton.addEventListener('click', () => {
  gameStart(playerLifeCount.value,monsterLifeCount.value);
});

function gameStart(playerLives, monsterLives) {
  lifeSet(playerLives,monsterLives);
  game(playerLives, monsterLives);
}


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


async function game(playerLives,monsterLives) {
  scoreboard.textContent='Pick a hand!';
  while (playerLives > 0 && monsterLives > 0) {
    console.log(`player lives:${playerLives}`)
    console.log(`mon lives:${monsterLives}`)
    const playerSelection = await new Promise((resolve,reject) => {
      rock.addEventListener('click',()=> resolve('rock'));
      paper.addEventListener('click', ()=> resolve('paper'));
      scissors.addEventListener('click', ()=> resolve('scissors'));
    });
    const result = playRound(playerSelection);
    console.log(playerSelection);
    if (result>0) {
      monsterLives--;
      scoreboard.textContent = `Your ${playerSelection} won! Pick your next hand.`;
    }
    else if (result<0) {
      playerLives--;
      scoreboard.textContent = `Your ${playerSelection} lost! Pick your next hand.`;
    }
    else scoreboard.textContent = `Your ${playerSelection} tied! Pick your next hand.`;
    lifeSet(playerLives,monsterLives); 
  }
  let winner = (playerLives===0) ? 'monster': 'player';
  scoreboard.textContent = `The ${winner} wins! Set Lives and Play again!`;
}