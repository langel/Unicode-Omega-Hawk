$(function(){gamefield.init();});


var gamefield = {
	elem: null,
	player_margin: 25,
	unit_size: 0,

	init: function() {
		gamefield.elem = $("#gamefield");
		gamefield.update_size();
		$(window).resize(function() {
			gamefield.update_size();
		});
	},

	frame: function() {
		player.frame();
		ents.frame();
	},

	px2em: function(px) {
		return px / gamefield.unit_size / 2;
	},

	update_size: function() {
		var body_height = $("body").height();
		var body_width = $("body").width();
		gamefield.elem.width(Math.floor(body_height * 0.25 * 3));
		gamefield.height = gamefield.elem.height();
		gamefield.width = gamefield.elem.width();
		gamefield.unit_size = body_height / 32;
		$("body").css("font-size", gamefield.unit_size + 'px');

		player.update_size();
	},
};

