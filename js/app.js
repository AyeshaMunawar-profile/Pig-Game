/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

EXTRA RULES:
-A player looses a game when he rolls two sixes in a row all score global present previous 
-input field to set limit from html
-second dice player looses current score if only one of them is a one 

*/
var scores,
  roundScore,
  previousRoll,
  currentRoll,
  previousRoll2,
  currentRoll2,
  activePlayer,
  winningLimit,
  isGamePlaying;

init();

/*
function to reset global score as well as round scores 
*/
function init() {
  //hide the dice in the begining of the game
 
  activePlayer = 0;
  scores = [0, 0];
  toggleErrorMessage('',0);
  resetPreviousCurrentRoundScore();
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("name-0").textContent = "PLAYER 1";
  document.getElementById("name-1").textContent = "PLAYER 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("active");
}

document.getElementById("btn-limit").addEventListener("click", function() {
  let value = document.getElementById("limit-score").value;
  if (value >= 0) {
    winningLimit = Math.ceil(value);
    document.querySelector(".limit-form").classList.add('hide');
    console.log(winningLimit);
    isGamePlaying = true;
  }
 
}, false);

//Roll the the two dices and if the value if atleast one rolled dice is one reset the score in round  and set active player as the other player
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isGamePlaying) {
    //1. Get a randome number for dice value between 1 and 6
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    //2. Display the result
    var diceDOM = document.querySelector(".dice");
    var diceDOM2 = document.querySelector(".dice2");
    diceDOM.style.display = "block";
    diceDOM2.style.display = "block";
    diceDOM.src = "../images/dice-" + dice + ".png";
    diceDOM2.src = "../images/dice-" + dice2 + ".png";
    //3. Update round score if the rolled number is not one
    if (dice !== 1 && dice2 !== 1) {
      if (
        (dice === 6 && currentRoll === 6) ||
        (dice2 === 6 && currentRoll2 === 6)
      ) {
        let message =
          "Oops ! two consecutive sixes for player no." +
          (activePlayer + 1) +
          " looses";
        toggleErrorMessage(message, 1);
        previousRoll = currentRoll;
        previousRoll2= currentRoll2;
        currentRoll = dice;
        currentRoll2 = dice2;
        printCurrentAndPreviousDiceValuesForActivePlayer();
        makeActivePlayerLoose();
      } else {
        previousRoll = currentRoll;
        previousRoll2 = currentRoll2;
        currentRoll = dice;
        currentRoll2 = dice2;
        //add dice values for both dices into round score
        roundScore += (dice + dice2);
        //update Ui score of active player to round score as current score
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
        printCurrentAndPreviousDiceValuesForActivePlayer();
      }
    } else {
      //set nextplayer after resetting round score
      nextPlayer();
      printCurrentAndPreviousDiceValuesForActivePlayer();
    }
  }
});

/*
Make the active user lose 
*/
function makeActivePlayerLoose() {
  isGamePlaying = false;
  resetPreviousCurrentRoundScore();
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.getElementById("name-" + activePlayer).textContent = "Winner !";
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("winner");
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}

/* 
Store the round score in the global score for the current active user 
*/
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isGamePlaying) {
    //1. Add current score to global score
    scores[activePlayer] += roundScore;
    //2. Update the UI scores
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    //3. Check if player won the game
    if (scores[activePlayer] >= winningLimit) {
      isGamePlaying = false;
      resetPreviousCurrentRoundScore();
      document.getElementById("name-" + activePlayer).textContent = "Winner !";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
    } else {
      //4. Change the active player
      nextPlayer();
    }
  }
});

/*
set round score of both players to 0 and toggle activeplayer hide the dice 
*/
function nextPlayer() {
  var diceDOM = document.querySelector(".dice");
  var diceDOM2 = document.querySelector(".dice2");
  resetPreviousCurrentRoundScore();
  document.getElementById("current-0").textContent = roundScore;
  document.getElementById("current-1").textContent = roundScore;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  diceDOM.style.display = "none";
  diceDOM2.style.display = "none";
}

function printCurrentAndPreviousDiceValuesForActivePlayer() {
  if (currentRoll === 6 && previousRoll === 6) {
    console.log(
      "Active user failed as current and previous roll is 6   : " + currentRoll,currentRoll2,
      previousRoll, previousRoll2
    );
  
  } else {
    console.log(
      "dice value for player " + (activePlayer + 1) + " is  :   " + currentRoll, currentRoll2,
      previousRoll,previousRoll2
    );
  }
}
function toggleErrorMessage(message, show){
  if(show && message.length>0){
document.getElementById("close-messgage").style.display = "block";
document.getElementById("close-btn").textContent = message;
  }
  else{
 document.getElementById("close-messgage").style.display = "none";
  }
}

function resetPreviousCurrentRoundScore() {
  previousRoll = 0;
  currentRoll = 0;
  roundScore = 0;
  currentRoll2 = 0;
  previousRoll2 = 0;
}

document.querySelector(".btn-new").addEventListener("click", function() {
   document.querySelector(".limit-form").classList.remove("hide");
  isGamePlaying=false;
  init();
});
