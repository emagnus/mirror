(function() {

	$.get('partials/ruter.handlebars')
		.then(function(source) {
			var template = Handlebars.compile(source)

			var renderApiData = function() {
				$.getJSON('api/ruter').then(function(data) {
					$('.ruter').html(template(data))
				})
			};

			var interval = setInterval(renderApiData, 10000);

		});

})();