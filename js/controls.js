var controls_zero = {
	left: 0,
	up: 0,
	right: 0,
	down: 0,
	start: 0,
	fire: 0,
	bomb: 0,
	upgrade: 0,
	any_key: 0,
};
var controls = {};
var controls_last_frame = {};

var key_map = {};

var keyboard_table_old = {
	32: 'start',
	65: 'left',
	87: 'up',
	68: 'right',
	83: 'down',
	74: 'fire',
	75: 'bomb',
	76: 'upgrade'
};

var keyboard_table = {
	start: 32,
	left: 65,
	up: 87,
	right: 68,
	down: 83,
	fire: 74,
	bomb: 75,
	upgrade: 76,
};

// default gamepad info
var gamepad_info = {
	axes: [0, 0],
	buttons: [
		{pressed: false},
		{pressed: false},
		{pressed: false},
		{pressed: false},
		{pressed: false},
		{pressed: false},
		{pressed: false},
	],
};

var controls_init = function() {

	// initialize controls reader
	$(document).keydown(function(e) {
		controls.any_key = 1;
		key_map[e.which] = true;
		if (e.which == 32) e.preventDefault();
		controls_debug();
	});
	$(document).keyup(function(e) {
		controls.any_key = 0;
		key_map[e.which] = false;
		controls_debug();
	});

	window.addEventListener("gamepadconnected", function(e) {
		console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
		e.gamepad.index, e.gamepad.id,
		e.gamepad.buttons.length, e.gamepad.axes.length);
	});

};

controls_debug = function() {
};

var controls_read = function() {
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	for (var i = 0; i < gamepads.length; i++) {
		var gp = gamepads[i];
		if (gp !== null && typeof gp === 'object') {
			gamepad_info = gp;
			var text = '';
			for (var j=0; j < gp.axes.length; j++) {
				text += "axes" + j + ": " + JSON.stringify(gp.axes);
			}
			for (var j=0; j < gp.buttons.length; j++) {
				text += "button" + j + ": " + gp.buttons[j].pressed + " ";
			}
			$("#controller_obj").text(text);
		}
		if (!gamepad_info) gamepad_info = {};
	}
	// reset controls
	controls = JSON.parse(JSON.stringify(controls_zero));
	if (gamepad_info.axes[0] < 0 || key_map[keyboard_table.left]) controls.left = 1;
	if (gamepad_info.axes[0] > 0 || key_map[keyboard_table.right]) controls.right = 1;
	if (gamepad_info.axes[1] < 0 || key_map[keyboard_table.up]) controls.up = 1;
	if (gamepad_info.axes[1] > 0 || key_map[keyboard_table.down]) controls.down = 1;
	if (gamepad_info.buttons[2].pressed || key_map[keyboard_table.fire]) controls.fire = 1;
	$("#controls_display").text(JSON.stringify(controls));
};


var controls_direction = function() {

	var dx = dy = deg = 0;

	if (controls.left) dx = -1;
	if (controls.right) dx = 1;
	if (controls.left && controls.right) dx = 0;
	if (controls.up) dy = -1;
	if (controls.down) dy = 1;
	if (controls.up && controls.down) dy = 0;

	if (dx == 0 && dy == 0) return false;
	
	if (dx == 1) {
		if (dy == -1) deg = 30;
		else if (dy == 1) deg = 330;
		else deg = 0;
	}
	else if (dx == -1) {
		if (dy == 1) deg = 210;
		else if (dy == -1) deg = 150;
		else deg = 180;
	}
	else if (dy == -1) deg = 90;
	else if (dy == 1) deg = 270;

	return deg;

};
