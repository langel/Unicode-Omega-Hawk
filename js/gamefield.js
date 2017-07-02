
var gamefield = {
	elem: null,
	oob: 2,
	player_margin: 1,
	unit_size: 0,
	width: 24,
	height: 32,

	helper_count: 0,
	helper_rate: 180,
	ass_count: 300,
	ass_rate: 3000,
	knight_count: 50,
	knight_rate: 750,

	init: function() {
		gamefield.elem = $("#gamefield");
		$(window).resize(function() {
			gamefield.update_size();
		});
		player.init();
		gamefield.update_size();
		player.reset_position();
		var knight = $.extend(true, {}, npe.chess_knight);
		ents.spawn('npe', knight.init());
	},

	frame: function() {
		if (this.helper_count <= 0) {
			this.helper_count = 180;
		//	console.log('launch helper');
			var helper = $.extend(true, {}, npe.helper);
		//	console.log(helper);
			ents.spawn('npe', helper.init());
		}
		this.helper_count--;
		if (this.ass_count <= 0) {
			this.ass_count = 120;
			var helper = $.extend(true, {}, npe.ghost_ass);
			ents.spawn('npe', helper.init());
		}
		this.ass_count--;
		if (this.knight_count <= 0) {
			this.knight_count = this.knight_rate;
			var helper = $.extend(true, {}, npe.chess_knight);
			ents.spawn('npe', helper.init());
		}
		this.knight_count--;

		controls_read();
		player.frame();
		ents.frame();

		return false;
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

