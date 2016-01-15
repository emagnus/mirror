var express = require('express');
var exphbs = require('express-handlebars');
var moment = require('moment');
var ruter = require('./ruter');

var app = express();

app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
	res.render('home', {
		time: moment().format('HH:mm:ss'),
		ruter: {
			info: ruter.info(),
			avganger: ruter.avganger()
		}
	});
});

app.listen(3000);