var api = require('./ruter-api'),
	_ = require('lodash'),
	moment = require('moment'),
	TIME_FORMAT = 'HH:mm:ss';

var info = {
	isLoaded: false,
};

var avganger;
var interval = setInterval(function(){
	api().then(function(resultat) {
		avganger = _(resultat)
			.map(function(linje) {
				return {
					name: linje.name,
					line: linje.line,
					next: _(linje.next)
						.map(function(avgang) {
							return moment().to(avgang);
						}).value()
				};

			})
			.value();
		info.isLoaded = true;
		info.lastFetched = moment().format(TIME_FORMAT);
	})}, 30000);



module.exports = {
	info: function() {
		return info;
	},
	avganger: function() {
		return avganger;
	}
}