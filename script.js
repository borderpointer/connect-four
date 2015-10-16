 $(window).load(function () {

 	// player and computer vars need to be accessible from everywhere.
 	var player_1 = {

 		"mark_color" : "blue",

 		"data_name" : "Player 1"

 	};

 	var player_2 = {

 		"mark_color" : "red",

 		"data_name" : "Player 2"

 	};

 	var num_of_players = 0;


 	var player = {

 		"data_name" : "Player"

 	};

 	var computer = {

 		"data_name" : "Computer"

 	};


 	var winner = false; // this is used to stop the computer from making a move after there is a winner.

 	var moves = 0; // for checking if there is a draw.


 	// following columns and rows are needed for checking for win.

	////// columns

	var column_0 = document.getElementsByClassName("col-0");
	var column_1 = document.getElementsByClassName("col-1");
	var column_2 = document.getElementsByClassName("col-2");
	var column_3 = document.getElementsByClassName("col-3");
	var column_4 = document.getElementsByClassName("col-4");
	var column_5 = document.getElementsByClassName("col-5");
	var column_6 = document.getElementsByClassName("col-6");

	/////// column arrays

	var column_0_arr = jQuery.makeArray(column_0);
	var column_1_arr = jQuery.makeArray(column_1);
	var column_2_arr = jQuery.makeArray(column_2);
	var column_3_arr = jQuery.makeArray(column_3);
	var column_4_arr = jQuery.makeArray(column_4);
	var column_5_arr = jQuery.makeArray(column_5);
	var column_6_arr = jQuery.makeArray(column_6);

	/////// rows

	var row_0 = document.getElementsByClassName("row-0");
	var row_1 = document.getElementsByClassName("row-1");
	var row_2 = document.getElementsByClassName("row-2");
	var row_3 = document.getElementsByClassName("row-3");
	var row_4 = document.getElementsByClassName("row-4");
	var row_5 = document.getElementsByClassName("row-5");

	/////// row arrays

	var row_0_arr = jQuery.makeArray(row_0);
	var row_1_arr = jQuery.makeArray(row_1);
	var row_2_arr = jQuery.makeArray(row_2);
	var row_3_arr = jQuery.makeArray(row_3);
	var row_4_arr = jQuery.makeArray(row_4);
	var row_5_arr = jQuery.makeArray(row_5);


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

 			// remove everything, except the input (just hide) because we need the value from the input
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

	 		num_of_players = 2;

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

 			// remove everything, except the input (just hide) because we need the value from the input
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

 			player.mark_color = "red";
 			computer.mark_color = "blue";

 			$("h2").html("You are <span style='color: #C73D47;'>Red</span>.");

 			// make the board after this button is clicked.
 			make_board ();

 		});

 		// if the player chooses to be Blue.
 		$("#chose-blue").click(function () {

 			$("#chose-blue").remove();
 			$("#chose-red").remove();

 			player.mark_color = "blue";
 			computer.mark_color = "red";

 			$("h2").html("You are <span style='color: #4189C7;'>Blue</span>.");

 			// make the board after this button is clicked.
 			make_board ();

 		});

 	}


 	// make board with 7 columns and 6 rows.
 	function make_board () {

	 	for (var i = 0; i < 6; i++) {

	 		for (var j = 0; j < 7; j++) {

	 			// make a board with 7 columns and 6 rows, and assign them with the corresponding column and row numbers.
	 			var $circle = $("<div class = 'circle' data-name = 'nothing'></div>");
	 			$circle.addClass("col-" + j);
	 			$circle.addClass("row-" + i);
	 			$(".row").append($circle);
	 			$(".row").css("background-color", "#FFDF00");

	 		}

	 	}

	 	if (num_of_players === 2) {

	 		two_players_move ();

	 	} else {

	 		computer_move ();
	 		player_move ();

	 	}

 	}


	// this function checks to see if the most bottom spot and then on, for 7 columns, is taken or not, and if not, drops your coin
	// to the most bottom spot. This function is only invoked after a click.
 	function check_spot (column_name, new_classname, mark) { // column_name is the column number of the spot the user(s) clicked.
 		// new classname is the class that the spot should take to add background color, mark is which player.

 		for (var i = 0; i < 7; i++) {

	  		if (column_name === "col-" + i) {

	  			// local var with all of the classes with "col-" + i
	  			var column = document.getElementsByClassName("col-" + i);

	 			// make an array with the above elements (also local).
	 			var column_arr = jQuery.makeArray (column);

	 			for (var j = column_arr.length - 1; j > -1; j--) {

	 				if (column_arr[j].getAttribute("data-name") === "nothing"){

	 					make_move (column_arr[j], new_classname, mark);

	 					break;

	 				}

	 			}

	 		}

 		}

 	}


 	// invoke this function when having a turn, for either player or computer.
 	function make_move (position, new_classname, mark) {

 		$(position).addClass(new_classname);
 		$(position).attr("data-name", mark);

 	}


 	function two_players_move () {

 		// for alternating turns. First player always goes first.
 		var this_player_clicked = 1;

 		var $all_circles = $(".circle");

 		// for all of the boxes (divs) only make the ones that do not have children elements be able to be clicked.
 		$.each($all_circles, function (index, value) {

			$all_circles.eq(index).click(function () {

				if ( $(this).attr("data-name") === "nothing") {

					// only change the innerHTML value, add class, and change the data-value of the div that was clickable and is clicked.

					if (this_player_clicked === 1) {

						check_spot ($(this).attr("class").split(" ")[1], "circle-background-color-" + player_1.mark_color, player_1.data_name);
						this_player_clicked = 2;

			 			// later, if moves === 42, it will mean that there is a draw.
						moves ++;

						check_for_win ($(this).attr("class").split(" ")[1], $(this).attr("class").split(" ")[2], player_1.data_name);

					} else {

						check_spot ($(this).attr("class").split(" ")[1], "circle-background-color-" + player_2.mark_color, player_2.data_name);
						this_player_clicked = 1;

			 			// later, if moves === 42, it will mean that there is a draw.
						moves ++;

						check_for_win ($(this).attr("class").split(" ")[1], $(this).attr("class").split(" ")[2], player_2.data_name);

					}

			 	}

	 		});

 		});

 	}


 	function player_move () {

 		var $all_circles = $(".circle");

 		// for all of the boxes (divs) only make the ones that do not have children elements be able to be clicked.
 		$.each($all_circles, function (index, value) {

			$all_circles.eq(index).click(function () {

				if ($(this).attr("data-name") === "nothing") {

					check_spot ($(this).attr("class").split(" ")[1], "circle-background-color-" + player.mark_color, player.data_name);

	 				// later, if moves === 42, it will mean that there is a draw.
	 				moves ++;

	 				check_for_win ($(this).attr("class").split(" ")[1], $(this).attr("class").split(" ")[2], player.data_name);

				 	if (!winner) {

				 		setTimeout(function() {

				 			computer_move ();

				 		}, 1500);

				 	}

	 			}

	 		});

	 	});

 	}


 	function computer_move () {

 		var $all_circles = $(".circle");


 		// computer needs to choose a number between 0 and 41 in order to place their mark on a random spot that is not already taken.
 		var computer_choice = Math.floor(Math.random() * 42);

	  	if ($all_circles.eq(computer_choice).attr("data-name") === "nothing") {

	  		check_spot ($all_circles.eq(computer_choice).attr("class").split(" ")[1], "circle-background-color-" + computer.mark_color, computer.data_name);

	 		moves ++;

	 		check_for_win ($all_circles.eq(computer_choice).attr("class").split(" ")[1], $all_circles.eq(computer_choice).attr("class").split(" ")[2], computer.data_name);

		} else {

			computer_move ();

		}

 	}


 	function check_for_win (column_name, row_name, winning_mark) {

 		check_column (column_name, winning_mark);
 		check_row (row_name, winning_mark);

	 	if (moves === 42) {

	 		$("#pick-color").fadeOut();
 			$(".row").fadeOut();

	 		setTimeout(function () {

	 			$(".buttons-row").append("<h1 style='font-size: 6em; margin: 13vh 0 25px 0'>It's a Draw!</h1>");

	 		// invoke the play again function after there is a winner.
	 			play_again ();

	 		}, 1000);

 		}

	}


	function check_column (column_name, winning_mark) {

  		for (var i = 0; i < 7; i++) {

	  		if (column_name === "col-" + i) {

	  			// local var with all of the classes with "col-" + i
	  			var column = document.getElementsByClassName("col-" + i);

	 			// make an array with the above elements (also local).
	 			var column_arr = jQuery.makeArray (column);

	 			for (var j = column_arr.length - 1; j > -1; j--) {

	 				if (column_arr[j].getAttribute("data-name") === winning_mark &&
	 					column_arr[j-1].getAttribute("data-name") === winning_mark &&
	 					column_arr[j-2].getAttribute("data-name") === winning_mark &&
	 					column_arr[j-3].getAttribute("data-name") === winning_mark) {

	 					setTimeout(function () {

	 						announce_winner (winning_mark);

	 					}, 500);

	 					break;

	 				}

	 			}

	 		}

	 	}

	}


	function check_row (row_name, winning_mark) {

		console.log("check row called");

		var count = 0;

  		for (var i = 0; i < 7; i++) {

  			var count = 0;

	  		if (row_name === "row-" + i) {

	  			// local var with all of the classes with "col-" + i
	  			var row = document.getElementsByClassName("row-" + i);

	 			// make an array with the above elements (also local).
	 			var row_arr = jQuery.makeArray (row);
	 			for (var j = row_arr.length - 1; j >= 0; j--) {

	 				if (row_arr[j-1].previousSibling.getAttribute("data-name") === winning_mark &&
	 					row_arr[j].previousSibling.getAttribute("data-name") === winning_mark &&
	 					row_arr[j].nextSibling.getAttribute("data-name") === winning_mark &&
	 					row_arr[j+1].nextSibling.getAttribute("data-name") === winning_mark ) {

	 					console.log("yes");

	 					setTimeout(function () {

	 						announce_winner (winning_mark);

	 					}, 500);

	 				}

	 			}

	 		}

	 	}

	}


	// announce who won.
	function announce_winner (winning_mark) {

	 	if (winning_mark === player_1.data_name) {

	 		winning_mark = $("#player-1").val();

 			$("#pick-color").fadeOut();
 			$(".row").fadeOut();

			setTimeout(function () {

				$(".buttons-row").append("<h1 style='font-size: 6em; margin: 13vh 0 25px 0'>"+ winning_mark + " wins!</h1>").fadeIn();
				play_again ();

			}, 500);

 			winner = true;

 		} else if (winning_mark === player_2.data_name) {

	 		winning_mark = $("#player-2").val();

 			$("#pick-color").fadeOut();
 			$(".row").fadeOut();

			setTimeout(function () {

		 		$(".buttons-row").append("<h1 style='font-size: 6em; margin: 13vh 0 25px 0'>"+ winning_mark + " wins!</h1>");
		 		play_again ();

		 	}, 500);

	 		winner = true;

	 	} else if (winning_mark === player.data_name) {

	 		winning_mark = $("input").val();

 			$("#pick-color").fadeOut();
 			$(".row").fadeOut();

			setTimeout(function () {

		 		$(".buttons-row").append("<h1 style='font-size: 6em; margin: 13vh 0 25px 0'>"+ winning_mark + " wins!</h1>");
		 		play_again ();

		 	}, 500);

	 		winner = true;

	 	} else {

 			$("#pick-color").fadeOut();
 			$(".row").fadeOut();

			setTimeout(function () {

		 		$(".buttons-row").append("<h1 style='font-size: 6em; margin: 13vh 0 25px 0'>Computer wins!</h1>").fadeIn();
		 		play_again ();

		 	}, 500);

	 		winner = true;

	 	}

	}


	// create a reset button.
 	function play_again () {

 		setTimeout(function () {

 			$(".buttons-row").append("<button id = 'play-again'>Play Again?</button>");

 		 	// onclick, reload the window.
 			$("#play-again").click(function () {
 			console.log("clicked");
 			location.reload();

 		});

 		}, 950);

 	}

 	// this is where it all begins.
 	start_game ();


 });