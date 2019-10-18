/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

//hide the dice in the begining of the game
document.querySelector(".dice").style.display = "none";
//set the global scores of both players to 0 at first
document.getElementById("score-0").textContent = 0;
document.getElementById("score-1").textContent = 0;
document.getElementById("current-0").textContent = 0;
document.getElementById("current-1").textContent = 0;

//Roll the the dice and if the value if the rolled dice is one reset the score in round  and set active player as the other player
document.querySelector(".btn-roll").addEventListener("click", function() {
  //1. Get a randome number for dice value between 1 and 6
  var dice = Math.floor(Math.random() * 6) + 1;
  console.log("dice value : " + dice);
  //2. Display the result
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "../images/dice-" + dice + ".png";
  //3. Update round score if the rolled number is not one
  if (dice !== 1) {
    //add score
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    //set nextplayer after resetting round score
    roundScore = 0;
    document.getElementById("current-0").textContent = roundScore;
    document.getElementById("current-1").textContent = roundScore;
    // document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    diceDOM.style.display = "none";
  }
});

// var x = document.querySelector("#score-0").textContent;
// console.log(x);
//  document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector('#current-'+ activePlayer).innerHTML= '<strong>'+ dice+'</strong>'
