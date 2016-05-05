(function() {

	var showTime = function() {
		var now = moment().format('HH:mm');
		$('.time').html(now);
	};
	showTime();

	var interval = setInterval(showTime, 1000);

})()