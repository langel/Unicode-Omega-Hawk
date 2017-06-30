
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
		// setup npe's hitbox
		var hitbox = $('.hitbox', object.elem);
		hitbox.width(object.width * object.hitbox.w + 'em');
		hitbox.height(object.height * object.hitbox.h + 'em');
		hitbox.css('left', ((object.width - (1 - object.hitbox.w) * object.width) / 2 + object.hitbox.x) + 'em');
		hitbox.css('top', ((object.height - (1 - object.hitbox.h) * object.height) / 2 + object.hitbox.y) + 'em');
		object.hitbox.w = u.px2em(hitbox.width());
		object.hitbox.h = u.px2em(hitbox.height());
		var pos = hitbox.position();
		object.hitbox.x = u.px2em(pos.top) + object.x;
		object.hitbox.y = u.px2em(pos.left) + object.y;
		ents[type].push(object);
	},

	despawn: function(type, index) {
		ents[type][index].elem.remove();
		ents[type].splice(index, 1);
	},

	frame: function() {
		// UPDATE NPEs
		ents.npe.forEach(function(npe, index) {
			npe.frame(index);
			npe.elem.css({
				left: npe.x + 'em',
				top: npe.y + 'em',
			});
		});
		// PLAYER BULLETS
		ents.bullet.forEach(function(bullet, index) {
			if (ents.inside_gamefield(bullet)) {
				bullet.x += bullet.dx;
				bullet.y += bullet.dy;
				bullet.hitbox.x += bullet.dx;
				bullet.hitbox.y += bullet.dy;
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
	},

	inside_gamefield: function(ent) {
		if (ent.x < -ent.width) return false;
		if (ent.x > gamefield.width) return false;
		if (ent.y < -ent.height) return false;
		if (ent.y > gamefield.height) return false;
		return true;
	},

	check_for_hit: function(ent) {
		var hit = false;
		ents.bullet.forEach(function(bullet, index) {
			if (bullet.hitbox.x + bullet.hitbox.w > ent.hitbox.x &&
				bullet.hitbox.x < ent.hitbox.x + ent.hitbox.w &&
				bullet.hitbox.y + bullet.hitbox.h > ent.hitbox.y &&
				bullet.hitbox.y < ent.hitbox.y + ent.hitbox.w
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



