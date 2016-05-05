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
app.use(express.static('views'));
app.use(express.static('node_modules/moment'));
app.use(express.static('node_modules/handlebars'));
app.use('/font', express.static('font'));

app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('port', 3000);

app.get('/', function(req, res) {
	res.render('home', {
		now: {
			date: moment().format('dddd D MMMM YYYY')
		},
		ruter: {
			info: ruter.info(),
			avganger: ruter.avganger()
		}
	});
});

app.get('/api/ruter', function(req, res) {
	res.json({
		ruter: {
			info: ruter.info(),
			avganger: ruter.avganger()
		}
	});
});

app.get('/gohome', function(req, res) {
	var theUrl = 'http://localhost:' + app.get('port');
	console.log('sending browser to ' + theUrl);
	res.send(theUrl);
	spawn('sh', [ process.env.PWD + '/scripts/goToUrl.sh', theUrl]);
});

app.post('/gotourl', function(req, res) {
	var theUrl = req.body.url;
	console.log('sending browser to ' + theUrl);
	res.send(theUrl);
	var goToUrl = spawn('sh', [ process.env.PWD + '/scripts/goToUrl.sh', theUrl]);
	goToUrl.stdout.on('data', function(data) {
		console.log('stdout: ' + data);
	});
	goToUrl.stderr.on('data', function(data) {
		console.log('stderr: ' + data);
	});
	goToUrl.on('exit', function(code) {
		if (code != 0) {
			console.log('go to url (' + theUrl + ') failed with exit code ' + code);
		}
	});
});

app.listen(app.get('port'));