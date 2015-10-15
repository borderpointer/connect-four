 $(window).load(function () {

 	// player and computer vars need to be accessible from everywhere.
 	var player = "player";

 	var player_2 = "player 2";

 	var num_of_players = 0;

 	var computer = "computer";

 	var winner = false; // this is used to stop the computer from making a move after there is a winner.

 	var moves = 0; // for checking if there is a draw.

 	// the user has to choose either to play with another person or with the computer.
 	function start_game () {

 		var $button_two_players = $("#chose-two-players");
 		var $button_one_player = $("#chose-one-player");

  		$button_two_players.click(function () {

 			$button_two_players.remove();
 			$button_one_player.remove();

 			$("#question").html("What are your names?");

 			// invote two_players only when the user chooses to play with another person.
 			two_players ();

 		});

   		$button_one_player.click(function () {

 			$button_two_players.remove();
 			$button_one_player.remove();

 			$("#question").html("What is your name?");


 			// invote one_player only when the user chooses to play with the computer.
 			one_player ();

 		});


 	}

 	function two_players () {

 		// create two input tags and a submit button after the h2 tag within the buttons-row div.
 		$("#question").css("margin", "30px 0");
 		$(".buttons-row :first-child").after("<button id = 'submit' style = 'width: 290px; margin: 10px 0 30px 0;'>Here're Our Names</button>").after("<input id = 'player-1' style = 'display: block;' placeholder='Player 1 First Name'</input>" + "<input id = 'player-2' style = 'display: block;' placeholder='Player 2 First Name'</input>");

 		// when the user submit's their name do the following.
 		$("#submit").click(function() {

 			// remove everything, except the input (just hide)
 			$("#question").remove();
 			$("input").css("display", "none");
 			$("#submit").remove();

 			// populate the pick-color h2 with the name of the user and with the question of what color they want to be.
 			$("#pick-color").html(

 				"Hello, " + $("#player-1").val() + " and " + $("#player-2").val() + "! " + "</br></br>" +
 				$("#player-1").val() + " is <span style='color: #4189C7;'>Blue</span>, and " + $("#player-2").val() + " is <span style='color: #C73D47;'>Red</span>.</br>" +
 				$("#player-1").val() + ", go first!"

 				);

 			// previously, the pick-color h2's display is "none", so change that to show.
	 		$("#pick-color").css("display", "block");
	 		$("#pick-color").css("margin", "25px 0");


	 		num_of_players += 2;
	 		// for two players, don't ask which colors they want to be, just assign them. So the make_board gets invoked automatically
	 		// after the two players' names are submitted.
	 		make_board ();

 		});

 	}

 	function one_player () {

 		// create an input tag and a submit button after the h2 tag within the buttons-row div.
 		$(".buttons-row :first-child").after("<button id = 'submit'>Here's My Name</button>").after("<input placeholder='First Name'</input>");

 		// when the user submit's their name do the following.
 		$("#submit").click(function() {

 			// remove everything, except the input (just hide)
 			$("#question").remove();
 			$("input").css("display", "none");
 			$("#submit").remove();

 			// populate the pick-color h2 with the name of the user and with the question of what color they want to be.
 			$("#pick-color").html("Hello, " + $("input").val() + "! " + "Are you feeling Hot or Cool?")

 			// previously, the pick-color h2's display is "none", so change that to show.
	 		$("#pick-color").css("display", "block");
	 		$("#pick-color").css("margin", "25px 0");

	 		// previously, the two buttons' display is "none", so change that to show.
	 		$("#chose-red").css("display", "initial");
	 		$("#chose-blue").css("display", "initial");

 		});

 		// if the player chooses to be Red.
 		$("#chose-red").click(function () {

 			$("#chose-blue").remove();
 			$("#chose-red").remove();

 			player = "red";
 			computer = "blue";

 			$("h2").html("You are <span style='color: #C73D47;'>Red</span>.");

 			// invote make_board only when this button is clicked
 			make_board();

 		});

 		// if the player chooses to be Blue.
 		$("#chose-blue").click(function () {

 			$("#chose-blue").remove();
 			$("#chose-red").remove();

 			player = "blue";
 			computer = "red";

 			$("h2").html("You are <span style='color: #4189C7;'>Blue</span>.");

 			// invote make_board only when this button is clicked
 			make_board();

 		});

 	}

 	// make an array of 9 divs.
 	function make_board () {

	 	for (i = 0; i < 42; i++) {

	 		// for each div that is getting appended, make the class "box", data-value "nothing",
	 		// and put an empty p tag into the div.
	 		$(".row").append("<div class = 'circle'" + "data-value = " + i + " data-name = 'nothing'></div>");

	 	}

	 	// fix so that there are multiple arrays, each containing 7 divs. and that another array is holding onto all arrays

	 	assign_class_names ();

 	}

 	function assign_class_names () {

 		var $all_circles = $(".circle");

 		for (k = 1; k < 7; k++) {

	 		for (i = 0; i < 36; i += 7) {

	 			var j = 0;

	 			$all_circles.eq(i*k).addClass("col-" + j);

	 		}

 			j++;

 		}

	 	if (num_of_players === 2) {

	 		two_players_move ();

	 	} else {

	 		player_move ();

	 	}

 	}

 	function check_spot (index, classname, mark) {

 		//if

 		var $all_circles = $(".circle");

 		var position = $all_circles.eq(index).attr("data-value");

 		var i = 1;

 		var j = 7;

 		//for (i = 1, j = 7; i < 8, j > 0; i++, j--){

 			// if ( position - (7 * i) < position < position + (7 * j) ) {

 			// 	console.log(position);

 			// 	console.log(position + (7 * j));
 			// 	make_move ((position + (7 * j)), classname, mark);

 			// 	i++;
 			// 	j--;

 			// }

 		//}

 		make_move (index, classname, mark);

 	}
 	// invoke this function when having a turn, for either player or computer.
 	function make_move (position, classname, mark) {

 		var $all_circles = $(".circle");

 		$all_circles.eq(position).addClass(classname);
 		$all_circles.eq(position).attr("data-name", mark);

 	}

 	function player_move () {

 		var $all_circles = $(".circle");

 		// for all of the boxes (divs) only make the ones that do not have children elements be able to be clicked.
 		$.each($all_circles, function (index, value) {

			$all_circles.eq(index).click(function () {

				if ($(this).attr("data-name") === "nothing") {

					// only change the innerHTML value, add class, and change the data-value of the div that was clickable and is clicked.
					check_spot (index, ("circle-background-color-" + player), "player");

	 				// later, if moves === 9, it will mean that there is a draw.
	 				moves ++;

 					// after making a move, check for win with the player's mark as argument.
	 				//check_for_win (player);

	 				// only invoke the computer to make a move if there is no winner.
	 				// if (!winner) {
	 				// 	console.log("called inside player move");
	 				// 	setTimeout(computer_move, 1500);

	 				// }

	 				if (!winner) {

	 					player_2_move ();

	 				}

	 			}

	 		});

	 	});

 	}

 	 function two_players_move () {

 		var $all_circles = $(".circle");

 		var this_player_clicked = 1;

 		// for all of the boxes (divs) only make the ones that do not have children elements be able to be clicked.
 		$.each($all_circles, function (index, value) {

			$all_circles.eq(index).click(function () {

				if ( $(this).attr("data-name") === "nothing") {

					// only change the innerHTML value, add class, and change the data-value of the div that was clickable and is clicked.

					if (this_player_clicked === 1) {

						check_spot (index, "circle-background-color-blue", "player-1");
						this_player_clicked = 2;

					} else {

						check_spot (index, "circle-background-color-red", "player-2");
						this_player_clicked = 1;

					}

			 		// later, if moves === 9, it will mean that there is a draw.
			 		moves ++;

			 	}

	 		});

 		});

 	}

 // 	function computer_move () {

 // 		console.log("called inside computer move");

 // 		var $all_circles = $(".box");

 // 		// computer needs to choose a number between 0 and 8 in order to place their mark on a random spot that is not already taken.
 // 		//var computer_choice = Math.floor(Math.random() * 42);
 // 		var computer_choice = 1;

 //  		if ($all_circles.eq(computer_choice).attr("data-name") === "nothing") {

 //  			console.log("called inside computer move before making move");
 //  			// only change the innerHTML value, add class, and change the data-value of the div if that div is empty.
 //  			check_spot (computer_choice, ("circle-background-color-" + computer), "computer");
 //  			player_move ();

 // 			moves ++; // global var


 // 			// after making a move, check for win with the computer's mark as argument.
 // 			//check_for_win (computer);

 // 			// only invoke the player to make a move if there is no winner.
 // 			// if (!winner) {

	// 			// player_move ();

	//  		// }

	// 		} else {

	// 		//computer_move ();
	// 	}



 // 	}

 // 	function check_for_win (winning_mark) {

 // 		var $all_circles = $(".box");

	//  	if (

	//  		// there must be a better way of checking for a winner, but this works.
	//  		( ( $all_circles.eq(0).data("value") === $all_circles.eq(3).data("value") ) && ( $all_circles.eq(0).data("value") === $all_circles.eq(6).data("value") ) && ( $all_circles.eq(0).data("value") === winning_mark) ) ||
	//  		( ( $all_circles.eq(1).data("value") === $all_circles.eq(4).data("value") ) && ( $all_circles.eq(1).data("value") === $all_circles.eq(7).data("value") ) && ( $all_circles.eq(1).data("value") === winning_mark) ) ||
	//  		( ( $all_circles.eq(2).data("value") === $all_circles.eq(5).data("value") ) && ( $all_circles.eq(2).data("value") === $all_circles.eq(8).data("value") ) && ( $all_circles.eq(2).data("value") === winning_mark) ) ||
	//  		( ( $all_circles.eq(0).data("value") === $all_circles.eq(1).data("value") ) && ( $all_circles.eq(0).data("value") === $all_circles.eq(2).data("value") ) && ( $all_circles.eq(0).data("value") === winning_mark) ) ||
	//  		( ( $all_circles.eq(3).data("value") === $all_circles.eq(4).data("value") ) && ( $all_circles.eq(3).data("value") === $all_circles.eq(5).data("value") ) && ( $all_circles.eq(3).data("value") === winning_mark) ) ||
	//  		( ( $all_circles.eq(6).data("value") === $all_circles.eq(7).data("value") ) && ( $all_circles.eq(6).data("value") === $all_circles.eq(8).data("value") ) && ( $all_circles.eq(6).data("value") === winning_mark) ) ||
	//  		( ( $all_circles.eq(0).data("value") === $all_circles.eq(4).data("value") ) && ( $all_circles.eq(0).data("value") === $all_circles.eq(8).data("value") ) && ( $all_circles.eq(0).data("value") === winning_mark) ) ||
	//  		( ( $all_circles.eq(2).data("value") === $all_circles.eq(4).data("value") ) && ( $all_circles.eq(2).data("value") === $all_circles.eq(6).data("value") ) && ( $all_circles.eq(2).data("value") === winning_mark) )

	//  		)

	//  		{

	//  			$("h2").html(winning_mark + " Wins!");

	//  			// invoke the play again function after there is a winner.
	//  			play_again ();

	//  			winner = true;

	//  		} else if (moves === 9) {

	//  			$("h2").html("It's a Draw!");

	//  			// invoke the play again function after there is a winner.
	//  			play_again ();

	//  		}

	// }

	// // create a reset button.
 // 	function play_again () {

 // 		if (player === "X") {

 // 			$("#chose-blue").remove();

 // 		} else if (player === "O") {

 // 			$("#chose-red").remove();

 // 		}

 // 		$(".buttons-row").append("<button id = 'play-again'>Play Again</button>");


 // 		// onclick, reload the window.
 // 		$("#play-again").click(function () {

 // 			location.reload();

 // 		});

 // 	}

 	// this is where it all begins.
 	start_game ();


 });