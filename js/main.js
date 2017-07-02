$(function() {
	engine.init();
});

var engine = {
	fps: 30,
		fps_max: 120,
		frame_last_time: 0,
		frame: {
			d: null,
			last: 0,
			next: 0,
			processing: false,
			then: null,
			now: null,
			interval: null,
	  	},

	init: function() {

		engine.frame.d = new Date();
		engine.frame.last = engine.frame.d.getTime();

		controls_init();
		audio_init();
		gamefield.init();

		//engine.frame_handler();
		engine.then = performance.now();
		engine.frame.interval = 1000 / engine.fps;
		engine.frame();
	},


	frame: function() {
		 engine.now = performance.now();
		 var elapsed = engine.now - engine.then;
		 engine.fps = 1000 / elapsed;

		 gamefield.frame();

		 engine.then = engine.now;
		 requestAnimationFrame(engine.frame);
	},

};
