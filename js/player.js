
var player = {
	elem: null,
	size: 2,
	height: 0,
	width: 0,
	speed: 0.4,
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
		$("#play_pos").text(JSON.stringify(player_pos));

		var direction = controls_direction();
		if (direction !== false) {
			var movement = u.trig_velocity(direction, player.speed);
			player.x += movement.x;
			player.x = Math.max(gamefield.player_margin, Math.min(player.x, gamefield.width - gamefield.player_margin - player.width));
			player.y += movement.y;
			player.y = Math.max(gamefield.player_margin, Math.min(player.y, gamefield.height - gamefield.player_margin - player.height));
			player.elem.css({
				left: player.x + 'em',
				top: player.y + 'em',
			});
		}
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
