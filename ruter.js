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
			console.log(line)
			return {
				name: line.Destination,
				line: line.LineID,
				next: moment(_.first(line.MonitoredStopVisits).MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime) };
		})
		.value();
	console.log(arrivals)
	var firstArrival = _.first(arrivals).next;
	var now = moment();
	console.log('now', now.format(TIME_FORMAT))
	console.log('firstArrival', firstArrival.format(TIME_FORMAT));
	console.log('går: ', now.to(firstArrival));
}).catch(function(err) {
	console.log(err)
});