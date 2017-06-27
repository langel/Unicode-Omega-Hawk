
var u = {
	
	angle2rads: function(angle) {
		return angle * (Math.PI / 180);
	},

	px2em: function(px) {
		return px / gamefield.unit_size;
	},

	trig_velocity: function(angle, distance) {
		return {
			x: Math.cos(angle * Math.PI/180) * distance,
			y: -Math.sin(angle * Math.PI/180) * distance,
		};
	}

}
