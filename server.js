var express = require('express');
var exphbs = require('express-handlebars');
var moment = require('moment');

var app = express();

app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
	res.render('home', {
		time: moment().format('HH:mm:ss')
	});
});

app.listen(3000);