$(function() {
	controls_init();
	audio_init();
	game_init();
});

var engine = {
	fps: 24,
};


game_init = function() {
	player.elem = $("#player");
	game_frame_logic();
};

handle_frame = function(callback) {
	controls_last_frame = JSON.parse(JSON.stringify(controls));
	setTimeout(function() {
		callback();
	}, Math.round((1 / engine.fps) * 1000));
};

game_frame_logic = function() {
	controls_read();
	gamefield.frame();
	handle_frame(game_frame_logic);
};

