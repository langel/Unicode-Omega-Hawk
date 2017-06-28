$(function() {
	engine.init();
});

var engine = {
	fps: 24,
	fps_max: 120,
	frame_last_time: 0,
	frame: {
		d: null,
		last: 0,
		next: 0,
	},

	init: function() {

		engine.frame.d = new Date();
		engine.frame.last = engine.frame.d.getTime();

		controls_init();
		audio_init();
		gamefield.init();

		engine.frame_handler();
	},


	frame_handler: function() {

		// decide when is the next frame
		engine.frame.next = engine.frame.last + Math.round((1 / engine.fps) * 1000);
		engine.frame.last = engine.frame.d.getTime();

		// handle all frame logic
		controls_read();

		gamefield.frame();

		// decide how long to wait for next frame
		var timeout = engine.frame.next - engine.frame.d.getTime();

		// optimize frame rate
		if (timeout * engine.fps < 333) engine.fps--
		else engine.fps++;
		engine.fps = Math.min(engine.fps, engine.fps_max);

		// loop it, fool
		setTimeout(engine.frame_handler, timeout);
	},

};
