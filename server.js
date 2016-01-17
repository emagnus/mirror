var express = require('express');
var exphbs = require('express-handlebars');
var moment = require('moment');
var ruter = require('./ruter');
var spawn = require('child_process').spawn;
var bodyParser = require('body-parser');

var app = express();

app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	res.render('home', {
		time: moment().format('HH:mm:ss'),
		ruter: {
			info: ruter.info(),
			avganger: ruter.avganger()
		}
	});
});

app.post('/gotourl', function(req, res) {
	var theUrl = req.body.url;
	console.log('sending browser to ' + theUrl);
	res.send(theUrl);
	spawn('sh', ['scripts/gotourl.sh', theUrl]);
});

app.listen(3000);