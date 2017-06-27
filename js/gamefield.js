$(function(){gamefield.init();});


var gamefield = {
	elem: null,
	oob: 10,
	player_margin: 1,
	unit_size: 0,
	width: 24,
	height: 32,

	init: function() {
		gamefield.elem = $("#gamefield");
		$(window).resize(function() {
			gamefield.update_size();
		});
		player.init();
		gamefield.update_size();
		player.reset_position();
	},

	frame: function() {
		player.frame();
		ents.frame();
	},

	update_size: function() {
		var body_width = $("body").width();
		var body_height = $("body").height();
		// set basic em unit
		gamefield.unit_size = body_height / gamefield.height;
	//	console.log(gamefield.unit_size);
		$("body").css("font-size", gamefield.unit_size + 'px');
		// set playfield to 4:3 ratio portrait mode
		gamefield.elem.width(Math.floor(body_height * 0.25 * 3));

		player.update_size();
	},
};

