"use strict";

const choices = ['rock','paper','scissors'];


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


function game(counter=5) {
  let playerScore = 0;
  let computerScore = 0;

  console.log(`You are now playing ${counter} rounds:`)

  for (let i = 0; i < counter; i++) {
    console.log('Current Score:')
    console.log(`Player: ${playerScore}   Computer: ${computerScore}`)
      
    let playerSelection = prompt('Please pick: rock/paper/scissors');
    let result = playRound(playerSelection);
    if (result>0) {playerScore+=result}
    else {computerScore+=(result*-1)}
  }

  console.log(`\nFinal Score:`);
  console.log(`Player: ${playerScore}   Computer: ${computerScore}`)  
  if (playerScore === computerScore) { 
      console.log('No Winner! It\'s a tie!');
  } else {
      console.log(`Winner: ${(playerScore>computerScore)?'Player':'Computer'}`)
  }

}