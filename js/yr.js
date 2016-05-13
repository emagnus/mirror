(function() {

	$.get('partials/yr.handlebars')
		.then(function(source) {
			var template = Handlebars.compile(source)

			var renderApiData = function() {
				$.getJSON('api/yr').then(function(data) {
					console.log(data)
					$('.yr').html(template({yr: data}))
				})
			};

			renderApiData();
			var interval = setInterval(renderApiData, 18000);

		});

})();