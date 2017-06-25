$(function() {
	controls_init();
	audio_init();
	game_init();
});

var engine = {
	fps: 24,
};

var player = {
	elem: null,
	speed: 10,
	bullets: [],
	bullet_speed: 25,
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
	var player_pos = player.elem.position();
	$("#play_pos").text(JSON.stringify(player_pos));
	if (controls.left == 1) {
		player.elem.css({left:player_pos.left - player.speed});
	}
	if (controls.right == 1) {
		player.elem.css({left:player_pos.left + player.speed});
	}
	if (controls.up == 1) {
		player.elem.css({top:player_pos.top - player.speed});
	}
	if (controls.down == 1) {
		player.elem.css({top:player_pos.top + player.speed});
	}
	if (controls.fire == 1) {
		player_fires();	
	}
	move_bullets();
	handle_frame(game_frame_logic);
};

var player_fires = function() {
	var player_pos = player.elem.position();
	var bullet = {
		elem: $("<div>",{"class": "player_bullet", style: "top:" + player_pos.top + "; left:" + player_pos.left}).text("•").appendTo("body"),
	};
	player.bullets.push(bullet);
};

var move_bullets = function() {
	player.bullets.forEach(function(bullet, i) {
		bullet_pos = bullet.elem.position();
		if (bullet_pos.top < 0) {
			bullet.elem.remove();
			player.bullets.splice(i, 1);
		}
		bullet.elem.css({top:bullet_pos.top - player.bullet_speed});
	});
};
