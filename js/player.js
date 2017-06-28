
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


	init: function() {
		console.log("player init");
		player.elem = $("#player");
	},


	frame: function() {
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
