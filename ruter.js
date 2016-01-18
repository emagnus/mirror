var api = require('./ruter-api'),
	_ = require('lodash'),
	moment = require('./moment-nb'),
	TIME_FORMAT = 'HH:mm';

var info = {
	isLoaded: false,
};

var avganger;

var hentAvganger = function() {
	api().then(function(resultat) {
		avganger = resultat;
		info.isLoaded = true;
		info.lastFetched = moment().format(TIME_FORMAT);
	})
};

hentAvganger();

var interval = setInterval(hentAvganger, 30000);



module.exports = {
	info: function() {
		return info;
	},
	avganger: function() {
		console.log("hentAvganger")
		return _(avganger)
			.map(function(linje) {
				return {
					name: linje.name,
					line: linje.line,
					next: _(linje.next)
						.filter(function(avgang) {
							return avgang.isBefore(moment().add(1, 'hours'));
						})
						.map(function(avgang) {
							return avgang.isBefore(moment().add(45, 'minute')) ?
								moment().to(avgang, true) :
								avgang.format(TIME_FORMAT);
						})
						.join(', ')
				};

			})
			.value();;
	}
}