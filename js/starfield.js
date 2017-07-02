
var starfield = {

	max: 25,
	speed: 0.01,
	speed_mod : 2,
	stars: [],

	init: function() {
		for (var i = 0; i < starfield.max; i++) {
			starfield.new_star();
		}
	},

	frame: function() {
		starfield.stars.forEach(function(star, index) {
		console.log((starfield.speed + Math.random() * starfield.speed_mod) / engine.fps);
			star.y += (starfield.speed + Math.random() * starfield.speed_mod) / engine.fps;
			star.y += star.dy;
			if (!ents.inside_gamefield(star)) {
				starfield.stars[index].elem.remove();
				starfield.stars.splice(index, 1);	
				starfield.new_star();
			};
			star.elem.css({
				top: star.y + 'em',
				color: u.rgb2color(Math.random() * 255, Math.random() * 255, Math.random() * 255),
			});
			//console.log(star);
		});
		
	},

	new_star: function() {
		var star = {
			x: Math.random() * gamefield.width,
			y: -gamefield.oob,
			width: 1,
			height: 1,
			dy: (starfield.speed + Math.random() * starfield.speed_mod) / engine.fps,
			elem: $('<div class="star">.</div>'),
		};
		//console.log(star.x + ',' + star.y);
		star.elem.css({
			'left': star.x + 'em',
			'top': star.y + 'em',
		});
		star.elem.appendTo(gamefield.elem);
		starfield.stars.push(star);
	},

};
