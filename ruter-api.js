var rp = require('request-promise'),
	_ = require('lodash'),
	moment = require('moment');
	
moment.locale('nb');

module.exports = function() {
	return rp({
		uri: 'http://reisapi.ruter.no/Favourites/GetFavourites?favouritesRequest=3010625-18-Ljabru,3010624-37-Helsfyr',
		json: true //3010625-18-Ljabru Stopid1-lineid1-destinationtext1
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