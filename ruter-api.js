var rp = require('request-promise'),
	_ = require('lodash'),
	moment = require('moment'),
	TIME_FORMAT = 'HH:mm:ss';

moment.locale('nb');

rp({
	uri: 'http://reisapi.ruter.no/Favourites/GetFavourites?favouritesRequest=3010625-18-Ljabru,3010624-37-Helsfyr',
	json: true //3010625-18-Ljabru Stopid1-lineid1-destinationtext1
}).then(function(json) {
	var arrivals = _(json)
		.map(function(line) {
			var nextStops = _(line.MonitoredStopVisits)
				.map(function(stops){
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
	console.log(arrivals)
	var line = _.find(arrivals, ['line', 37]);
	console.log('line', line)
	var firstArrival = _.first(line.next);
	var now = moment();
	console.log('name', line.name)
	console.log('now', now.format(TIME_FORMAT))
	console.log('firstArrival', firstArrival.format(TIME_FORMAT));
	console.log('første: ', now.to(firstArrival));
	console.log('neste: ', now.to(_.first(arrivals).next[1]));
}).catch(function(err) {
	console.log(err)
});