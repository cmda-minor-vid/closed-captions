var player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('video-placeholder', {
		width: 600,
		height: 400,
		videoId: 'vrP-_T-h9YM',
		playerVars: {
			color: 'white'
			//autoplay: '1'
			//playlist: 'taJ60kskkns,FG0fTKAqZ5g'
		},
		events: {
			onReady: initialize
		}
	});
}

function initialize(){
	// Update the controls on load
	addSpans();
}
function addSpans(){
	var ps = document.querySelectorAll('#closed-captions p');
	var i = 0;
	var regex = /\S+/g;
	while ( i < ps.length ) {
		var str = ps[i].innerText;
		var result = str.replace(regex, function(a) {
			return "<span>" + a + "</span>";
		});
		ps[i].innerHTML = result;
		ps[i].classList.add('p' + i);
		i++;
	}
	updateTimerDisplay();
}

function updateTimerDisplay(){
	var t = player.getCurrentTime();
	t = Math.floor10(t,-1);
	// for each paragraph we want to know:
	// (paragraph number, start time, end time, current time)

	//Officer K D 6 - 3 . 7. Let’s begin. Ready?
	pTimes(0,3.8,8.1,t);
	pTimes(1,8.1,10,t);
	pTimes(2,10.8,12.5,t);
	//And blood-black nothingness began to spin
	pTimes(3,12.5,15.6,t);
	pTimes(4,17.369,20,t);
	pTimes(5,20.1,23.3,t);
	//Fuck off, skin-job!
	pTimes(6,23.3,25.2,t);
	
	pTimes(7,26.8,31.6,t);
	pTimes(8,32.7,33,t);
	pTimes(9,33.2,34,t);
	//Have you ever been in an institution?
	pTimes(10,34,36,t);
	pTimes(11,36,36.3,t);
	pTimes(12,36.5,37.3,t);
	//Do they keep you in a cell?
	pTimes(13,37.3,38.6,t);
	pTimes(14,38.6,38.9,t);
	pTimes(15,39.1,39.9,t);
	//When you're not performing your duties, do they keep you in a little box?
	pTimes(16,39.9,42.8,t);
	pTimes(17,42.8,43.1,t);
	pTimes(18,43.3,44.1,t);
	//Interlinked
	pTimes(19,44,44.5,t);
	pTimes(20,45,45.7,t);
	//What's it like to hold the hand of someone you love?
	pTimes(21,45.7,47.6,t);
	pTimes(22,47.6,48.1,t);
	pTimes(23,48.3,49,t);
	//Did they teach you how to feel, finger to finger?
	pTimes(24,49.1,50.9,t);
	pTimes(25,50.9,51.4,t);
	pTimes(26,51.6,52.3,t);
	//Do you long for having your heart interlinked?
	pTimes(27,52.3,54,t);
	pTimes(28,54,54.5,t);
	pTimes(29,54.7,55.4,t);
	//Do you dream about being interlinked?
	pTimes(30,55.4,57.2,t);
	pTimes(31,57.2,58,t);
	//What's it like to hold your child in your arms?
	pTimes(32,58,59.8,t);
	pTimes(33,59.8,60.3,t);
	pTimes(34,60.3,61,t);
	//Do you feel that there's a part of you that's missing?
	pTimes(35,61,62.7,t);
	pTimes(36,62.7,63.2,t);
	pTimes(37,63.2,63.9,t);
	//Within cells interlinked.
	pTimes(38,63.9,65.2,t);
	pTimes(39,65.2,66.6,t);
	//Why don't you say that three times: "within cells interlinked".
	pTimes(40,66.6,69.1,t);

	pTimes(41,69.1,70.6,t);
	pTimes(42,70.6,72.2,t);
	pTimes(43,72.2,74.2,t);
	// We're done.
	pTimes(44,77.1,78.7,t);
	pTimes(45,80,81.738,t);
	pTimes(46,82.2,84.3,t);
	pTimes(47,85.4,87,t);


	if ( t < 136.1) {
		setTimeout(() => {
			updateTimerDisplay();
		}, 100);
	}
	
}
function pTimes(num,startT,endT,curT) {
	var curP = document.querySelector('.p' + num);
	if(curT > endT && !curP.classList.contains('off')) {
		curP.classList.add('off');
	}
	if(curT < endT && curP.classList.contains('off')) {
		curP.classList.remove('off');
	}
	if( curT > startT && !curP.classList.contains('on')) {
		curP.classList.add('on');
	}
	if( curT < startT && curP.classList.contains('on')) {
		curP.classList.remove('on');
	}
}

(function() {
	/**
	 * Decimal adjustment of a number.
	 *
	 * @param {String}  type  The type of adjustment.
	 * @param {Number}  value The number.
	 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
	 * @returns {Number} The adjusted value.
	 */
	function decimalAdjust(type, value, exp) {
	// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function(value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}
	// Decimal floor
	if (!Math.floor10) {
		Math.floor10 = function(value, exp) {
			return decimalAdjust('floor', value, exp);
		};
	}
	// Decimal ceil
	if (!Math.ceil10) {
		Math.ceil10 = function(value, exp) {
			return decimalAdjust('ceil', value, exp);
		};
	}
})();