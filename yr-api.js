var rp = require('request-promise'),
	_ = require('lodash'),
	moment = require('./moment-nb')
	parser = require('xml2js').parseString;

module.exports = function() {
	return rp({
		uri: 'http://www.yr.no/sted/Norge/Oslo/Oslo/Oslo/varsel.xml'
	}).then(function(r) {
		return new Promise(function(resolve, reject){
			parser(r, function(err, result){
				if(err){
					reject(err)
				}
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
				resolve(todaysForecast)

			})
		});
	})
}