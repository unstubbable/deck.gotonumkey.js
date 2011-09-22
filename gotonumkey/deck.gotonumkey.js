/*!
Deck JS - deck.gotonumkey - v1.0
Copyright (c) 2011 Hendrik Liebau
*/

/*
This module adds the necessary methods and key bindings to jump to any slide 
in the deck by pressing the corresponding number key(s).
*/
(function($, deck, undefined) {
	var $d = $(document),
	keyqueue = [],
	delay, // defined via options (see below)
	timeoutID = null,
	// The numeric keycodes of the number keys (including numpad keys):
	numkeys = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105],
	
	numkeypressed = function(number) {
		clearTimeout(timeoutID);
		keyqueue.push(number);
		timeoutID = setTimeout(timedout, delay);
	},
	
	timedout = function() {
		var number = parseInt(keyqueue.toString().replace(',',''), 10);
		$[deck]('go', number - 1);
		keyqueue = [];
	};
	
	/*
	Extends defaults/options.
	
	options.gotodelay
		The time in milliseconds to wait between key presses before jumping to a slide.
	*/
	$.extend(true, $[deck].defaults, {
		gotodelay: 300
	});
	
	$d.bind('deck.init', function() {
		// Bind key events
		$d.unbind('keydown.gotonumkey').bind('keydown.gotonumkey', function(e) {
			delay = $[deck]('getOptions').gotodelay;
			
			if ($.inArray(e.which, numkeys) > -1) {
				e.preventDefault();
				var number = (e.which < 58) ? e.which - 48 : e.which - 96;
				numkeypressed(number);
			}
		});
	});
})(jQuery, 'deck');

