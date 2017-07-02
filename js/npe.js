
// Non - Player Entities

var npe = {
	
	cack: {
		string: '8===D',
		size: 0.5,
		speed: 4,
		size_min: 0.5,
		size_max: 2,
		size_dir: 1,
		points: 10,
		hitbox: {
			w: 0.8,
			h: 0.6,
			x: 0.1,
			y: -0.1,
		},
		init: function(cack_firer) {
			// fire cack
			var spawn = $.extend(true, {}, npe.cack);
			spawn.x = cack_firer.hitbox.x;
			spawn.y = cack_firer.hitbox.y + cack_firer.height / 2;
			spawn.dx = (player.x - cack_firer.hitbox.x) / (spawn.speed * engine.fps);	
			spawn.dy = (player.y - cack_firer.hitbox.y) / (spawn.speed * engine.fps);
			spawn.elem = $('<div><div class="hitbox"></div><div class="vis" style="font-size:' + spawn.size + 'em; left:' + spawn.x + 'em; top:' + spawn.y + 'em;">' + spawn.string + '</div></div>');
			ents.spawn('npe', spawn);
		},
		frame: function(index) {
			if (ents.check_for_hit(this) === true || !ents.inside_gamefield(this)) {
				ents.despawn('npe', index);
			}
			else {
				this.x += this.dx;
				this.y += this.dy;
				this.hitbox.x += this.dx;
				this.hitbox.y += this.dy;
				this.size_dir += 0.15;
				this.size = Math.sin(this.size_dir)+1.1
				var red   = Math.sin(this.size_dir + 0) * 127 + 128;
				var green = Math.sin(this.size_dir + 2) * 127 + 128;
				var blue  = Math.sin(this.size_dir + 4) * 127 + 128;

				$('.vis', this.elem).css({
					'font-size': this.size + 'em',
					'color': u.rgb2color(red,green,blue),
				});
			}
		},
	},
	
	
	
	ghost_ass: {
		string: '༼ꉺɷꉺ༽',
		size: 2,
		speed: 2,
		rotate_size: 5,
		angle: 0,
		hitbox: {
			w: 0.5,
			h: 0.6,
			x: 0.1,
			y: -0.2,
		},
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
		points: 100,
		fire_count: 0.5,
		fire_rate: 1,

		init: function() {
			var spawn = $.extend(true, {}, npe.ghost_ass);
			spawn.elem = $('<div><div class="hitbox"></div><div class="vis" style="font-size:' + spawn.size + 'em">' + spawn.string + '</div></div>');
			
			spawn.y = 0;
			spawn.x = Math.random() * (gamefield.width * 0.7);
			return spawn;
		},

		frame: function(index) {
			if (ents.check_for_hit(this) === true || this.y > gamefield.height + gamefield.oob) {
				ents.despawn('npe', index);
			}
			if (this.fire_count <= 0) {
				this.fire_count = this.fire_rate;
				npe.cack.init(this);
			}
			this.fire_count -= this.fire_rate / engine.fps;
			var movement = u.trig_velocity(this.angle, this.rotate_size);
			this.dx = u.px2em(movement.x);
			this.dy = u.px2em(movement.y) + this.speed / engine.fps;
			this.angle += 5;
			if (this.angle >= 360) this.angle -= 360;
			this.x += this.dx;
			this.y += this.dy;
			this.hitbox.x += this.dx;
			this.hitbox.y += this.dy;
		}
	}, 


	chess_knight: {
		string: '&#9822;',
		size: 3,
		speed: 2,
		rotate_size: 5,
		angle: 0,
		hitbox: {
			w: 0.9,
			h: 0.6,
			x: 0.1,
			y: -0.2,
		},
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
		points: 100,
		fire_count: 0.5,
		fire_rate: 1,

		init: function() {
			var spawn = $.extend(true, {}, npe.chess_knight);
			spawn.elem = $('<div><div class="hitbox"></div><div class="vis" style="font-size:' + spawn.size + 'em">' + spawn.string + '</div></div>');
			
			spawn.y = 0;
			spawn.x = Math.random() * (gamefield.width * 0.7) + 1;
			return spawn;
		},

		frame: function(index) {
			if (ents.check_for_hit(this) === true || this.y > gamefield.height + gamefield.oob) {
				ents.despawn('npe', index);
			}
			if (this.fire_count <= 0) {
				this.fire_count = this.fire_rate;
				npe.cack.init(this);
			}
			this.fire_count -= this.fire_rate / engine.fps;
			var movement = u.trig_velocity(this.angle, this.rotate_size);
			this.dx = u.px2em(movement.x);
			this.dy = u.px2em(movement.y) + this.speed / engine.fps;
			this.angle += 5;
			if (this.angle >= 360) this.angle -= 360;
			this.x += this.dx;
			this.y += this.dy;
			this.hitbox.x += this.dx;
			this.hitbox.y += this.dy;
		}
	}, 

	helper: {
		string: '&#9787;',
		pattern: 0,
		speed: 10,
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
		// hitbox crap
		// set width, height %
		// set offsets em
		hitbox: {
			w: 0.5,
			h: 0.45,
			x: 0,
			y: 0.33,
		},
		points: 25,
		init: function() {
			this.x = (Math.random() < 0.5) ? (gamefield.width * 0.3) : (gamefield.width * 0.6);
			this.y = -gamefield.oob;
			var innards = '<div class="helper">' + this.string + '</div><div class="hitbox"></div>';
			this.elem = $('<div>', {
				"class": Math.random() < 0.5 ? "cyan" : "magenta",
			}).css({
				left: this.x + 'em',
				top: this.y + 'em',
			}).html(innards);

			return this;
		},
		frame: function(index) {	
			this.dy = this.speed / engine.fps;
			this.y += this.dy;
			this.hitbox.y += this.dy;
			if (ents.check_for_hit(this) === true || this.y > gamefield.height + gamefield.oob) {
				ents.despawn('npe', index);
			}
		},
		death: function() {
			npe.power_up.init(this);
		},
	},
	
	power_up: {
		string: '&#9851;',
		pattern: 0,
		speed: 10,
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
		damage: 0,
		// hitbox crap
		// set width, height %
		// set offsets em
		hitbox: {
			w: 0.5,
			h: 0.45,
			x: 0,
			y: 0.33,
		},
		points: 250,
		init: function(spawner) {
			// fire cack
			var spawn = $.extend(true, {}, npe.power_up);
			spawn.x = spawner.hitbox.x;
			spawn.y = spawner.hitbox.y + spawner.height / 2;
			spawn.dx = (player.x - spawner.hitbox.x) / (spawn.speed * engine.fps);	
			spawn.dy = (player.y - spawner.hitbox.y) / (spawn.speed * engine.fps);
			spawn.elem = $('<div><div class="hitbox"></div><div class="vis" style="font-size:' + spawn.size + 'em; left:' + spawn.x + 'em; top:' + spawn.y + 'em;">' + spawn.string + '</div></div>');
			ents.spawn('npe', spawn);
			return spawn;
		},
		frame: function(index) {	
			this.dy = this.speed / engine.fps;
			this.y += this.dy;
			this.hitbox.y += this.dy;
			if (ents.check_for_hit(this) === true || this.y > gamefield.height + gamefield.oob) {
				ents.despawn('npe', index);
			}
		},
		death: function() {
			gun.mode_max++;
		},
	},

};
