
// Entity Engine

var ents = {

	// player bullets
	bullet: [],
	// non-player entities
	npe: [],
	
	types: [
		'player_bullet',
		'enemy',
		'enemy_bullet',
	],

	spawn: function(type, object) {
		object.elem.addClass('ent').appendTo(gamefield.elem);	
		object.width = u.px2em(object.elem.width());
		object.height = u.px2em(object.elem.height());
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
		// UPDATE NPEs
		ents.npe.forEach(function(npe, index) {
			npe.frame(index);
			npe.elem.css({
				left: npe.x + 'em',
				top: npe.y + 'em',
			});
		});
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

	check_for_hit: function(ent) {
		var hit = false;
		ents.bullet.forEach(function(bullet, index) {
			if (bullet.x + bullet.width > ent.x &&
				bullet.x < ent.x + ent.width &&
				bullet.y + bullet.height > ent.y &&
				bullet.y < ent.y + ent.width
			) {
				console.log('hit!');
				ents.despawn('bullet', index);
				hit = true;
				return;
			}
		});
		return hit;
	},

};



