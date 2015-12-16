/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready(function() {

var playersGuess;
var winningNumber = generateWinningNumber();
var guessArray = [];
var maxGuesses = 5;

/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateWinningNumber(){
	return Math.floor(100 * Math.random() + 1);
}

// Fetch the Players Guess
function playersGuessSubmission(){
	//Grab player's guess and assign it to variable playersGuess
	//convert to number using +
	playersGuess = +$("#Guess").val();

	//invoke checkGuess function
	checkGuess();

	//push guess into array
	guessArray.push(playersGuess);

	//Remove player's guess from DOM
	$("#Guess").val("");
}

// Determine if the next guess should be a lower or higher number
function lowerOrHigher() {
  if(playersGuess>winningNumber) {
    return "Pick lower.";
  }
  else {
  	return "Pick higher.";
  }
}

//Create guess message
function guessMessage() {
	var msg1 = lowerOrHigher();
	var msg2;
	var diff = Math.abs(playersGuess - winningNumber);
	
	if (diff > 20) {
		msg2 = "Your guess is more than 20 digits from winning number. "
	}
	else if (diff >= 10 && diff <= 20) {
		msg2 = "Your guess is between 10-20 digits from winning number. "
	}
	else if (diff => 5 && diff < 10) {
		msg2 = "Your guess is between 5-10 digits from winning number. "
	}
	else {
		msg2 = "CLOSE! Your guess is less than 5 digits from winning number. "		
	}

	$("#guessmessage").text(msg1 + msg2);
}

//Check for repeats
function checkRepeat(num) {
	for (var i = 0; i < guessArray.length; i++) {
		if (num === guessArray[i]) {
			// guessArray.splice(i,1);
			return true;
		}
	}
	return false;
}

// Check if the Player's Guess is the winning number 
function checkGuess(){
	if (playersGuess === winningNumber) {
		$("#Notification").text("WOOHOO! You won!");
		$("#Notification").css("font-size", "30px");
		$("body").css("background-color", "green");
	}

	else if(checkRepeat(playersGuess) === true) {
		$("#Notification").text("Submitted a duplicate guess! Pick another one!");
		$("body").css("background-color", "orange");
	}

	else if(maxGuesses > 0) {
		maxGuesses--;
		$("#Notification").text("Wrong guess! Try again!" + maxGuesses + " guesses left!");
		guessMessage();
    }

    else {
    	$("#Notification").text("No more guesses left. Play again by hitting reset button");
    	$("#Notification").css("font-size", "30px");
		$("body").css("background-color", "red");
    }
  }

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
	$("#Notification").text("The answer is " + $winningNumber);
}

// Allow the "Player" to Play Again

function playAgain(){
	location.reload();
}

/* **** Event Listeners/Handlers ****  */
$("#Submit").click(playersGuessSubmission);
$("#Hint").click(provideHint);
$("#Reset").click(playAgain);

$(document).keypress(function(event) {
    if(event.which == 13) {
    	playersGuessSubmission();
    }
});

});
