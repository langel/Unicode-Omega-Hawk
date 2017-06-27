

var ents = {

	// player bullets
	bullet: [],
	// bad guys
	enemy: [],
	// good guys
	helper: [],
	
	types: [
		'player_bullet',
		'enemy',
		'enemy_bullet',
	],

	spawn: function(type, object) {
		object.elem.appendTo(gamefield.elem);	
		ents[type].push(object);
	},

	despawn: function(type, index) {
		ents[type][index].elem.remove();
		ents[type].splice(index, 1);
	},

	frame: function() {
		// PLAYER BULLETS
		ents.bullet.forEach(function(bullet, index) {
			if (ents.inside_gamefield(bullet)) {
				bullet.x = bullet.x + bullet.dx;
				bullet.y = bullet.y + bullet.dy;
//				console.log(bullet.x + ' , ' + bullet.y);
				bullet.elem.css({
					left: bullet.x + 'em',
					top: bullet.y + 'em',
				});
			}
			else {	
				ents.despawn('bullet', index);
			}
		});
		// ENEMY MOVEMENT
		// ENEMY BULLETS
	},

	inside_gamefield: function(ent) {
	//console.log(ent);
	//console.log(gamefield);
		if (ent.x < -gamefield.oob) return false;
		if (ent.x > gamefield.width + gamefield.oob) return false;
		if (ent.y < -gamefield.oob) return false;
		if (ent.y > gamefield.height + gamefield.oob) return false;
		return true;
	},

};



