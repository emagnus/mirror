var rp = require('request-promise'),
	_ = require('lodash'),
	moment = require('moment'),
	TIME_FORMAT = 'HH:mm:ss';

moment.locale('nb');

rp({
	uri: 'http://reisapi.ruter.no/Favourites/GetFavourites?favouritesRequest=3010625-18-Ljabru',
	json: true //3010625-18-Ljabru Stopid1-lineid1-destinationtext1
}).then(function(json) {
	var arrivals = _(json)
		.map(function(line) {
			return _.first(line.MonitoredStopVisits)
		})
		.map(function(visit) {
			return visit.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;
		})
		.map(function(expectedArrivalTime) {
			console.log(expectedArrivalTime)
			return moment(expectedArrivalTime);
		})
		.value();
	var firstArrival = _.first(arrivals);
	var now = moment();
	console.log('now', now.format(TIME_FORMAT))
	console.log('firstArrival', firstArrival.format(TIME_FORMAT));
	console.log('går: ', now.to(firstArrival));
}).catch(function(err) {
	console.log(err)
});