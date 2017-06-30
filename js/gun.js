
var gun = {

	mode: 0,
	modes: [
	  [90],
	  [70, 110],
	  [50, 90, 130],
	  [80, 100, 150, 30],
	  [60, 90, 120, 160, 20],
	],
	speed: 25,
	str: "&#8226;",

	throttle: {
		count: 0,
		rate: 0.10,
	},

	fire: function() {
		if (this.throttle.count) return;
		this.throttle.count = Math.round(this.throttle.rate * engine.fps);
		this.modes[this.mode].forEach(function(angle) {
			gun.spawn_bullet(angle);
		});
		this.mode++;
		if (this.mode >= this.modes.length) this.mode = 0;
	},

	spawn_bullet: function(angle) {
		var movement = u.trig_velocity(angle, this.speed / engine.fps);
		var start_x = player.x + (player.width * 0.25);
		var start_y = player.y + (player.height * 0.25);
		var innards = '<div class="player_bullet"><div class="sprite">' + this.str + '</div><div class="hitbox"></div></div>';
		var bullet = {
			x: start_x,
			y: start_y,
			dx: movement.x,
			dy: movement.y,
			hitbox: {
				w: 0.5,
				h: 0.2,
				x: 0,
				y: 0.6,
			},
			elem: $(innards),
		};
		bullet.elem.css({
			top: start_x + 'em',
			left: start_y + 'em'
		});
		ents.spawn('bullet', bullet);
	},

	fire_12_oclock: function() {
	},

	frame: function() {
		if (this.throttle.count > 0) {
			this.throttle.count--;
		}
	},

}
