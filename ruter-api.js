var rp = require('request-promise'),
	_ = require('lodash'),
	moment = require('./moment-nb');

module.exports = function() {
	return rp({
		uri: 'http://reisapi.ruter.no/Favourites/GetFavourites?favouritesRequest=3010625-18-Rikshospitalet,3010625-19-Majorstuen,3010625-74-Vika,3010624-37-Nydalen',
		json: true 
	}).then(function(json) {
		console.log('ruter called successfully')
		return _(json)
			.map(function(line) {
				var nextStops = _(line.MonitoredStopVisits)
					.map(function(stops) {
						return moment(stops.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime);
					})
					.value();
				return {
					name: line.Destination,
					line: line.LineID,
					next: nextStops
				};
			})
			.value();
	}).catch(function(err) {
		console.log(err)
	});
};