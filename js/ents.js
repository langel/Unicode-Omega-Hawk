

var ents = {
	enemy: [],
	player_bullet: [],
	types: [
		'player_bullet',
		'enemy',
		'enemy_bullet',
	],

	spawn: function(type, enemy_object) {
		enemy_object.elem.appendTo(gamefield.elem);	
		ents[type].push(enemy_object);
	},

	despawn: function(type, index) {
		ents[type][index].elem.remove();
		ents[type].splice(index, 1);
	},

	frame: function() {
		// PLAYER BULLETS
		ents.player_bullet.forEach(function(bullet, index) {
			bullet_pos = bullet.elem.position();
			if (bullet_pos.top < -gamefield.player_margin) {
				ents.despawn('player_bullet', index);
			}
			else {
				var distance = gamefield.px2em(bullet_pos.top) + bullet.speed_y;
				bullet.elem.css({top: distance + 'em'});
			}
		});
		// ENEMY MOVEMENT
		// ENEMY BULLETS
	},

};



