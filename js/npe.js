
// Non - Player Entities

var npe = {

	helper: {
		string: '&#9787;',
		pattern: 0,
		speed: 10,
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
		init: function() {
			this.x = (Math.random() < 0.5) ? (gamefield.width * 0.3) : (gamefield.width * 0.6);
			this.y = -gamefield.oob;
			this.dy = this.speed / engine.fps;
			this.elem = $('<div>', {
				"class": Math.random() < 0.5 ? "cyan" : "magenta",
			}).css({
				left: this.x + 'em',
				top: this.y + 'em',
			}).html(
				'<div class="helper">' + this.string + '</div>'
			);

			return this;
		},
		frame: function(index) {
			this.y += this.dy;
			if (ents.check_for_hit(this) === true || this.y > gamefield.height + gamefield.oob) {
				ents.despawn('npe', index);
			}
			console.log(ents.check_for_hit(this));
		},
	},

};
