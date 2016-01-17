var moment = require('moment');

moment.locale('nb');

moment.locale('nb', {
	relativeTime: {
		future: 'om %s',
		past: 'for %s siden',
		s: 'nå',
		m: '1 min',
		mm: '%d min',
		h: 'en time',
		hh: '%d timer',
		d: 'en dag',
		dd: '%d dager',
		M: 'en måned',
		MM: '%d måneder',
		y: 'ett år',
		yy: '%d år'
	}
});


module.exports = moment;