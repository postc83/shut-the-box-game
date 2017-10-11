var closedArr = [false, false, false, false, false, false, false, false, false];
var scoresArr = [];
var diceTotal = 0;
var userTotal = 0;
var numberMoves = 0;
var score = 45;
var numberRolls = 0;
var clickNumber = 0;
var playerName = "Player 1";

var diceOne = document.getElementById("diceOne");
var diceTwo = document.getElementById("diceTwo");
var rollDiceBtn = document.getElementById("rollBtn");
var rollTotal = document.getElementById("rollTotal");
var restart = document.getElementById("restart");
var modal = document.getElementById("rulesModal");
var modal2 = document.getElementById("scoreModal");
var modal3 = document.getElementById("alertModal");
var modal4 = document.getElementById("settingsModal");
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
var span3 = document.getElementsByClassName("close")[2];
var span4 = document.getElementsByClassName("close")[3];
var rules = document.getElementById("rules");
var highScore = document.getElementById("highScore");
var playerScore = document.getElementById("playerScore");
var noRolls = document.getElementById("noRolls");
var alert = document.getElementById("alert");
var alert2 = document.getElementById("alert2");
var startGame = document.getElementById("startGame");
var settings = document.getElementById("changeBg");

var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var five = document.getElementById("five");
var six = document.getElementById("six");
var seven = document.getElementById("seven");
var eight = document.getElementById("eight");
var nine = document.getElementById("nine");

function User(name, score, rolls) {
    this.name = name;
    this.score = score;
    this.rolls = rolls;
}

//starts the game
function init() {
    "use strict";
    restartGame();
    enterName();
}

//resets game to start
//sets score to 45
//sets roll count to 0
//resets all flaps to facing up
function restartGame() {
    "use strict";
    one.style.color = "white";
    two.style.color = "white";
    three.style.color = "white";
    four.style.color = "white";
    five.style.color = "white";
    six.style.color = "white";
    seven.style.color = "white";
    eight.style.color = "white";
    nine.style.color = "white";
    clickNumber = 0;
    numberRolls = 0;
    rollDiceBtn.disabled = false;
    score = 45;
    userTotal = 0;
    diceTotal = 0;
    playerScore.innerHTML = playerName + "'s Score: " + score;
    rollTotal.innerHTML = "Total: " + diceTotal;
    noRolls.innerHTML = "Number of Rolls: " + numberRolls;
    
    for (var i = 0; i < 9; i++){
        closedArr[i] = false;
    }
}
    
//called when game finishes
//checks local storage for saved scores
//adds new score to local storage
//sorts scores from lowest to highest
function gameOver() {
    //run when game over
    rollDiceBtn.disabled = true;
    var retrievedObject = JSON.parse(localStorage.getItem('scoresArr'));
    if(retrievedObject != null){
        scoresArr = retrievedObject;
    }
    var user = new User(playerName, score, numberRolls);
    scoresArr.push(user);
  
    scoresArr.sort(function (a, b ){
        if (a.score === b.score){
            return a.rolls - b.rolls;
        } else if (a.score > b.score) {
            return 1;
        } else if(a.score < b.score){
            return -1;
        }
    });
    
    localStorage.setItem('scoresArr', JSON.stringify(scoresArr));

}

function rulesModal() {
    "use strict";
    //modal - show game rules when rules button clicked
    modal.style.display = "block";
}

function alertModal(msg, msg2){
    //modal - show msg to user when needed.
    alert.innerHTML = msg;
    alert2.innerHTML = msg2;
    modal3.style.display = "block";
}

function enterName() {
    "use strict";
    //prompt - ask for user name.
    //keeping asking till user enters a name. Then add user
    //name to game score.
    playerName = "";
    
    
    while(playerName == "" || playerName == null){
        playerName = prompt("Please enter your name.");
    }
    
    playerScore.innerHTML = playerName + "'s Score: " + score; 
}

//displays settings modal
function changeBackGround() {
    "use strict";
    //let user change background color
    modal4.style.display = "block";
    
}
//adds clear button to best scores modal.
//gets best scores object from local storage
//displays scores in ordered list in html
function bestScores() {
    "use strict";
    var clear = document.getElementById("clear");
    clear.onclick = function(){ 
        localStorage.clear();
        scoreList.innerHTML = "";
    };
    
    var retrievedObject = JSON.parse(localStorage.getItem('scoresArr'));
    var scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = "";
    if(retrievedObject == null){
        modal2.style.display = "block";
    } else{
        for (var x = 0; x < 10; x++){
            var li = document.createElement("li");
            li.innerHTML = retrievedObject[x].name + " --- Score: " + retrievedObject[x].score + " --- Rolls: " + retrievedObject[x].rolls;
            scoreList.appendChild(li);
            modal2.style.display = "block";
        } 
    }      
}

//gets a random number between 1 and 6
function randomNum() {
    "use strict";
    return Math.floor((Math.random() * 6) + 1);
}

//checks if user selections adds up to dice total
//checks if user has score of 0 meaning they have won.
function checkTotal(){
    if(score === 0 && userTotal == diceTotal) {
        alertModal("You shut the Box.", "You Win");
        gameOver();
    } else if(score === 0 && userTotal != diceTotal) {
        score += userTotal;
        playerScore.innerHTML = playerName + "'s Score: " + score;
        alertModal("GAME OVER", "Those numbers dont add up to " + diceTotal + ". <br/>Your score is:  " + score + ". <br/><br/>New Game Starting."); 
        gameOver();
        restartGame();
    } else if(userTotal > diceTotal) {
        score += userTotal;
        playerScore.innerHTML = playerName + "'s Score: " + score;
        alertModal("GAME OVER", "Those numbers dont add up to " + diceTotal + ". <br/>Your score is:  " + score + ". <br/><br/>New Game Starting."); 
        gameOver();
        restartGame();
    } else if(userTotal == diceTotal){
        rollDiceBtn.disabled = false;
        userTotal = 0;
        clickNumber = 0;
        playerScore.innerHTML = playerName + "'s Score: " + score;
    } else if(clickNumber == 2 && userTotal != diceTotal){
        score += userTotal;
        playerScore.innerHTML = playerName + "'s Score: " + score;
        alertModal("GAME OVER"  ,"Those numbers dont add up to " + diceTotal + ".<br/>Your score is:  " + score + ". <br/><br/>New Game Starting."); 
        gameOver();
        restartGame();
    } else if (clickNumber == 2 && userTotal == diceTotal) { 
        playerScore.innerHTML = playerName + "'s Score: " + score;
        clickNumber = 0;
        userTotal = 0;
    }
}

//turns over flap if clicked by user.
//if all ready flipped ends game with message to user
function shutFlap(num, div) {
    "use strict";
    if (diceTotal === 0) {
        alertModal("Hint: ", "--- Roll the Dice first. ---");
    } else if (closedArr[num - 1]) {
        alertModal("GAME OVER", "That lever is already closed. New Game Starting");
        score += userTotal;
        gameOver();
        restartGame(); 
    } else {
        closedArr[num - 1] = true;
        div.style.color = "#663300";
        score -= num;
        userTotal += num;
        clickNumber += 1;
        checkTotal();
    }
    
}

//add click listeners to number flaps
function addListeners() {
    "use strict";
    one.addEventListener("click", function () {shutFlap(1, one); });
    two.addEventListener("click", function () {shutFlap(2, two); });
    three.addEventListener("click", function () {shutFlap(3, three); });
    four.addEventListener("click", function () {shutFlap(4, four); });
    five.addEventListener("click", function () {shutFlap(5, five); });
    six.addEventListener("click", function () {shutFlap(6, six); });
    seven.addEventListener("click", function () {shutFlap(7, seven); });
    eight.addEventListener("click", function () {shutFlap(8, eight); });
    nine.addEventListener("click", function () {shutFlap(9, nine); });
}

//Dice roll - two random numbers between 1 and 6
//Add numbers together and display total in html.
//Also increment the number of dice rolls and show count in html
function rollDice() {
    "use strict";
    var num1 = randomNum();
    var num2 = randomNum();
    
    numberRolls += 1;
    diceOne.innerHTML = num1;
    diceTwo.innerHTML = num2;
    
    diceTotal = num1 + num2;
    
    rollTotal.innerHTML = "Total: " + diceTotal;
    rollDiceBtn.disabled = true;
    noRolls.innerHTML = "Number of Rolls: " + numberRolls;
    
  
}


//start game and adds click listeners for menu buttons
init();
addListeners();
rollDiceBtn.onclick = function(){rollDice();};
restart.addEventListener("click", restartGame);
rules.addEventListener("click", rulesModal);
highScore.addEventListener("click", bestScores);
startGame.addEventListener("click", init);
settings.addEventListener("click", changeBackGround);



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
span2.onclick = function() {
    modal2.style.display = "none";
}
span3.onclick = function() {
    modal3.style.display = "none";
} 
span4.onclick = function() {
    modal4.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == modal2) {
        modal2.style.display = "none";
    } else if (event.target == modal3) {
        modal3.style.display = "none";
    } else if (event.target == modal4) {
        modal4.style.display = "none";
    }
}
