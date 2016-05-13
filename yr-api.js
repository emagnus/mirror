var rp = require('request-promise'),
	_ = require('lodash'),
	moment = require('./moment-nb')
	parser = require('xml2js').parseString;

rp({
	uri: 'http://www.yr.no/sted/Norge/Oslo/Oslo/Oslo/varsel.xml'
}).then(function(r) {
	parser(r, function(err, result){
		var periodicData = result.weatherdata.forecast[0].tabular;
		var today = moment().add(1, 'day');
		var todaysForecast =  _(periodicData[0].time)
			.filter(function(forecast) {
				return moment(forecast.$.from).isSame(today, 'day')
			})
			.sortBy(function(forecast) { return forecast.$.period;})
			.map(function(forecast) { 
				var p = forecast.precipitation[0].$ 
				return {
					temperatur: forecast.temperature[0].$.value ,
					nedbor: {
						min: p.minvalue,
						max: p.maxvalue, 
						value: p.value
					}
					
				}
			})
			.value();
		console.log(todaysForecast);
	})
	
}).catch(function(err) {
	console.log(err)
});