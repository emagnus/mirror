//var api = require('./ruter-api')
var moment = require('moment'),
TIME_FORMAT = 'HH:mm:ss';

module.exports = {
	info: function() {
		return {
			isLoaded: true,
			lastFetched: moment().format(TIME_FORMAT)
		}
	},
	avganger: function() {
		return [{
			name: 'Ljabru',
			line: 18,
			next: ['om 4 minutter']
		}, {
			name: 'Helsfyr',
			line: 37,
			next: ['om 5 minutter', 'om 15 minutter']
		}];
	}
}