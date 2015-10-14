// refactor vanilla to jquery
// submit css

 $(window).load(function () {

 	// player and computer vars need to be accessible from everywhere.
 	var player;

 	var computer;

 	var winner = false; // this is used to stop the computer from making a move after there is a winner.

 	var moves = 0; // for checking if there is a draw.

 	// the user has to choose either O or X to start the game.
 	function start_game () {

 		var $button_two_players = $("#chose-two-players");
 		var $button_one_player = $("#chose-one-player");

  		$button_two_players.click(function () {

 			player = "O";
 			computer = "X";

 			$button_one_player.remove();
 			$("h2").html("You are");
 			$(this).html("Playing with Two Players");

 			// invote two_players only when this button is clicked
 			two_players ();

 		});

   		$button_one_player.click(function () {

 			player = "O";
 			computer = "X";

 			$button_two_players.remove();
 			$button_one_player.remove();
 			$("#question").html("What is your name?");


 			// invote two_players only when this button is clicked
 			one_player ();

 		});


 	}

 	function two_players () {



 	}

 	function one_player () {


 		$(".buttons-row :first-child").after("<button id = 'submit'>Here's My Name</button>").after("<input type='text' name='fname' placeholder='First Name'</input>");

 		$("#submit").click(function() {

 			$("#question").remove();
 			$("input").css("display", "none");
 			$("#submit").remove();

 			$("#pick-color").html("Hello " + $("input").val() + "! " + "Are you feeling Hot or Cool?")

	 		$("#pick-color").css("display", "block");

	 		$("#chose-red").css("display", "initial");
	 		$("#chose-blue").css("display", "initial");

 		});

 		// if the player chooses to be "O"
 		$("#chose-red").click(function () {

 			player = "O";
 			computer = "X";

 			$("#chose-blue").remove();
 			$("h2").html("You are");
 			$("#chose-red").html("Red");

 			// invote make_board only when this button is clicked
 			make_board();

 		});

 		// if the player chooses to be "X"
 		$("#chose-blue").click(function () {

 			player = "X";
 			computer = "O";

 			$("#chose-red").remove();
 			$("h2").html("You are");
 			$("#chose-blue").html("Blue");

 			// invote make_board only when this button is clicked
 			make_board();
 		});

 	}

 	// make an array of 9 divs.
 	function make_board () {

	 	for (i = 0; i < 42; i++) {

	 		// for each div that is getting appended, make the class "box", data-value "nothing",
	 		// and put an empty p tag into the div.
	 		$(".row").append("<div class = 'circle' data-value = 'nothing'><p></p></div>");

	 	}

	 	// after the board is made, the computer goes first.
 		//computer_move ();

 	}


 	// invoke this function when having a turn, for either player or computer.
 	function make_move (index, classname, mark) {

 		var $all_boxes = $(".box");

 		$all_boxes.eq(index).children("p").text(mark);

 		$all_boxes.eq(index).addClass(classname);
 		$all_boxes.eq(index).data("value", mark);

 	}

 	// all of the divs made from make_board need to be out in the global scope (within onload) so that it can be accessed
 	// in all functions.


 	function player_move () {

 		var $all_boxes = $(".box");

 		// for all of the boxes (divs) only make the ones that do not have children elements be able to be clicked.
 		$.each($all_boxes, function (index, value) {

			$all_boxes.eq(index).click(function () {

				if ($(this).children("p").text() === "") {

					// only change the innerHTML value, add class, and change the data-value of the div that was clickable and is clicked.
					make_move (index, "box-background-color-one", player);

	 				// later, if moves === 9, it will mean that there is a draw.
	 				moves ++;

 					// after making a move, check for win with the player's mark as argument.
	 				check_for_win (player);

	 				// only invoke the computer to make a move if there is no winner.
	 				if (!winner) {

	 					setTimeout(computer_move, 1500);

	 				}

	 			}

	 		});

	 	});

 	}

 	function computer_move () {

 		var $all_boxes = $(".box");

 		// computer needs to choose a number between 0 and 8 in order to place their mark on a random spot that is not already taken.
 		var computer_choice = Math.floor(Math.random() * 9);

  		if ($all_boxes.eq(computer_choice).children("p").text() === "") {

  			// only change the innerHTML value, add class, and change the data-value of the div if that div is empty.
  			make_move (computer_choice, "box-background-color-two", computer);
  			player_move ();

 			moves ++; // global var


 			// after making a move, check for win with the computer's mark as argument.
 			check_for_win (computer);

 			// only invoke the player to make a move if there is no winner.
 			// if (!winner) {

				// player_move ();

	 		// }

			} else {

			computer_move ();
		}



 	}

 	function check_for_win (winning_mark) {

 		var $all_boxes = $(".box");

	 	if (

	 		// there must be a better way of checking for a winner, but this works.
	 		( ( $all_boxes.eq(0).data("value") === $all_boxes.eq(3).data("value") ) && ( $all_boxes.eq(0).data("value") === $all_boxes.eq(6).data("value") ) && ( $all_boxes.eq(0).data("value") === winning_mark) ) ||
	 		( ( $all_boxes.eq(1).data("value") === $all_boxes.eq(4).data("value") ) && ( $all_boxes.eq(1).data("value") === $all_boxes.eq(7).data("value") ) && ( $all_boxes.eq(1).data("value") === winning_mark) ) ||
	 		( ( $all_boxes.eq(2).data("value") === $all_boxes.eq(5).data("value") ) && ( $all_boxes.eq(2).data("value") === $all_boxes.eq(8).data("value") ) && ( $all_boxes.eq(2).data("value") === winning_mark) ) ||
	 		( ( $all_boxes.eq(0).data("value") === $all_boxes.eq(1).data("value") ) && ( $all_boxes.eq(0).data("value") === $all_boxes.eq(2).data("value") ) && ( $all_boxes.eq(0).data("value") === winning_mark) ) ||
	 		( ( $all_boxes.eq(3).data("value") === $all_boxes.eq(4).data("value") ) && ( $all_boxes.eq(3).data("value") === $all_boxes.eq(5).data("value") ) && ( $all_boxes.eq(3).data("value") === winning_mark) ) ||
	 		( ( $all_boxes.eq(6).data("value") === $all_boxes.eq(7).data("value") ) && ( $all_boxes.eq(6).data("value") === $all_boxes.eq(8).data("value") ) && ( $all_boxes.eq(6).data("value") === winning_mark) ) ||
	 		( ( $all_boxes.eq(0).data("value") === $all_boxes.eq(4).data("value") ) && ( $all_boxes.eq(0).data("value") === $all_boxes.eq(8).data("value") ) && ( $all_boxes.eq(0).data("value") === winning_mark) ) ||
	 		( ( $all_boxes.eq(2).data("value") === $all_boxes.eq(4).data("value") ) && ( $all_boxes.eq(2).data("value") === $all_boxes.eq(6).data("value") ) && ( $all_boxes.eq(2).data("value") === winning_mark) )

	 		)

	 		{

	 			$("h2").html(winning_mark + " Wins!");

	 			// invoke the play again function after there is a winner.
	 			play_again ();

	 			winner = true;

	 		} else if (moves === 9) {

	 			$("h2").html("It's a Draw!");

	 			// invoke the play again function after there is a winner.
	 			play_again ();

	 		}

	}

	// create a reset button.
 	function play_again () {

 		if (player === "X") {

 			$("#chose-blue").remove();

 		} else if (player === "O") {

 			$("#chose-red").remove();

 		}

 		$(".buttons-row").append("<button id = 'play-again'>Play Again</button>");


 		// onclick, reload the window.
 		$("#play-again").click(function () {

 			location.reload();

 		});

 	}

 	// this is where it all begins.
 	start_game ();


 });