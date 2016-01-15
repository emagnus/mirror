var rp = require('request-promise'),
	_ = require('lodash'),
	moment = require('moment');

moment.locale('nb');

rp({
	uri: 'http://reisapi.ruter.no/Favourites/GetFavourites?favouritesRequest=3010625-18-Ljabru',
	json: true //3010625-18-Ljabru Stopid1-lineid1-destinationtext1
}).then(function(json) {
	var ljabru = _.first(json);
	var firstStop = _.first(ljabru.MonitoredStopVisits);
	expectedArrivalTime = firstStop.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;
	var arrival = moment(expectedArrivalTime);
	console.log(moment().format('HH:mm:ss'));
	console.log(arrival.format('HH:mm:ss'));
	console.log(moment().to(arrival));
}).catch(function(err) {
	console.log(err)
});