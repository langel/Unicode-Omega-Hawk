$(function(){player.init();});


var player = {
	elem: null,
	size: 2,
	height: 0,
	width: 0,
	speed: 0.2,
	bullet_speed_x: 0,
	bullet_speed_y: -0.3,
	bullet_throttle_count: 0,
	bullet_throttle_rate: 4,

	init: function() {
		player.update_size();
	},

	frame: function() {
		var player_pos = player.elem.position();
		$("#play_pos").text(JSON.stringify(player_pos));
		var em_left = gamefield.px2em(player_pos.left);
		var em_top = gamefield.px2em(player_pos.top);
		if (controls.left == 1 && player_pos.left > gamefield.player_margin) {
			var distance = em_left - player.speed;
			player.elem.css({left: distance + 'em'});
		}
		if (controls.right == 1 && player_pos.left + player.width < gamefield.width - gamefield.player_margin) {
			var distance = em_left + player.speed;
			player.elem.css({left: distance + 'em'});
		}
		if (controls.up == 1 && player_pos.top > gamefield.player_margin) {
			var distance = em_top - player.speed;
			player.elem.css({top: distance + 'em'});
		}
		if (controls.down == 1 && player_pos.top + player.height < gamefield.height - gamefield.player_margin) {
			var distance = em_top + player.speed;
			player.elem.css({top: distance + 'em'});
		}
		if (player.bullet_throttle_count == 0) {
			if (controls.fire == 1) {
				player.fire_bullet();	
			}
		}
		else player.bullet_throttle_count--;
	},

	fire_bullet: function() {
		player.bullet_throttle_count = player.bullet_throttle_rate;
		var player_pos = player.elem.position();
		var bullet = {
			speed_x: player.bullet_speed_x,
			speed_y: player.bullet_speed_y,
			elem: $("<div>",{"class": "player_bullet", style: "top:" + player_pos.top + "; left:" + player_pos.left}).html("&#8226;").appendTo(gamefield.elem),
		};
		ents.spawn('player_bullet', bullet);
	},

	update_size: function() {
		player.height = player.elem.height();
		player.width = player.elem.width();
	},
};
