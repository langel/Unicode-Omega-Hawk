
var player = {
	elem: null,
	size: 2,
	height: 0,
	width: 0,
	speed: 10,
	acceleration: 0.25,
	x: 0,
	y: 0,
	dx: 0,
	dy: 0,
	points: 0,
	life: 10,
	life_start: 10,


	init: function() {
		console.log("player init");
		console.trace();
		player.elem = $("#player");
		player.reset_position();
		player.points_add(0);
		player.lifebar_reset();
	},


	frame: function() {

		player.hitbox = {
			x: player.x + player.width * 0.1,
			y: player.y + player.height * 0.3,
			w: player.width * 0.8,
			h: player.height * 0.4,
		};
		ents['npe'].forEach(function(ent, index) {
		//console.log(player);
			if (player.hitbox.x + player.hitbox.w > ent.hitbox.x &&
				player.hitbox.x < ent.hitbox.x + ent.hitbox.w &&
				player.hitbox.y + player.hitbox.h > ent.hitbox.y &&
				player.hitbox.y < ent.hitbox.y + ent.hitbox.w
			) {
				player.hit(ent);
				ents.despawn('npe', index);
			}

		});
		var player_pos = player.elem.position();
		$("#play_pos").text(engine.fps + "fps " + JSON.stringify(player_pos));

		var direction = controls_direction();
		var movement;
		if (direction === false) {
			movement = u.trig_velocity(0, 0);
		}
		else {
			movement = u.trig_velocity(direction, player.speed / engine.fps);
		}

		var frame_acceleration = player.acceleration / engine.fps;
		if (player.dx > movement.x) {
			player.dx -= frame_acceleration;
			if (player.dx <= movement.x) player.dx = movement.x;
		}
		else if (player.dx < movement.x) {
			player.dx += frame_acceleration;
			if (player.dx >= movement.x) player.dx = movement.x;
		}
		if (player.dy > movement.y) {
			player.dy -= frame_acceleration;
			if (player.dy <= movement.y) player.dy = movement.y;
		}
		else if (player.dy < movement.y) {
			player.dy += frame_acceleration;
			if (player.dy >= movement.y) player.dy = movement.y;
		}

		player.x += player.dx;
		player.x = Math.max(gamefield.player_margin, Math.min(player.x, gamefield.width - gamefield.player_margin - player.width));
		player.y += player.dy;
		player.y = Math.max(gamefield.player_margin, Math.min(player.y, gamefield.height - gamefield.player_margin - player.height));
		player.elem.css({
			left: player.x + 'em',
			top: player.y + 'em',
		});
		if (controls.fire == 1) {
			gun.fire();	
		}
		gun.frame();
	},

	points_add: function(amount) {
		console.log(amount);
		this.points += amount;
		$('#points').text(this.points);
	},

	hit: function(ent) {
		if (typeof ent.damage == 'undefined') {
			ent.damage = 1;
		}
		player.life -= ent.damage;
		player.lifebar_update();
	},

	lifebar_reset: function() {
		player.life = player.life_start;

		$('#life #bar').html('&#x2593;');
		player.lifebar_update();
	},

	lifebar_update: function() {
		var life_not = player.life_start - player.life;
		var text = '';
		for (var i = 0; i < player.life; i++) {
			text += '&#x2593;';
		}
		for (var i = 0; i < life_not; i++) {
			text += '&#x2591;';
		}
		$('#life #bar').html(text);
//		console.log(life_not + ' ' + player.life + ' ' + text);
	},


	reset_position: function() {
		player.update_size();
		player.x = gamefield.width * 0.5;
		player.y = gamefield.height * 0.8;
		player.elem.css({
			left: player.x + 'em',
			top: player.y + 'em',
		});
	},


	update_size: function() {
		player.height = u.px2em(player.elem.height());
		player.width = u.px2em(player.elem.width());
	},
};
