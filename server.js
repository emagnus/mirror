var express = require('express');
var exphbs = require('express-handlebars');
var moment = require('./moment-nb');
var ruter = require('./ruter');
var spawn = require('child_process').spawn;
var bodyParser = require('body-parser');

var app = express();

app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('node_modules/moment'));
app.use('/font', express.static('font'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	res.render('home', {
		now: {
			time: moment().format('HH:mm:ss'),
			date: moment().format('dddd, D MMMM YYYY'),
			week: moment().format('w'),
		},
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