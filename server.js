var logger = require('./logger');
var express = require('express');
var exphbs = require('express-handlebars');
var moment = require('./moment-nb');
var ruter = require('./ruter');
var yr = require('./yr-api');
var spawn = require('child_process').spawn;
var bodyParser = require('body-parser');

var app = express();

app.engine('handlebars', exphbs({
	defaultLayout: 'mirror'
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

app.get('/mirror-controls', function(req, res) {
	res.render('mirror-controls', { layout: 'mobile' })

});

app.get('/api/ruter', function(req, res) {
	res.json({
		ruter: {
			info: ruter.info(),
			avganger: ruter.avganger()
		}
	});
});

app.get('/api/yr', function(req, res) {
	logger.info('Henter data fra yr');
	yr()
	.then(function(forecast){
		res.json(forecast);
	}).catch(function(err) {
		 res.status(500).send('Something broke!');
	});	
	
});

app.get('/controls/home', function(req, res) {
	var theUrl = 'http://localhost:' + app.get('port');
	logger.info('sending browser to ' + theUrl);
	res.redirect('/mirror-controls?home=OK');
	spawn('sh', [ process.env.PWD + '/scripts/goToUrl.sh', theUrl]);
});

app.get('/controls/scroll/up', function(req, res) {
	logger.info('scrollUp');
	res.redirect('/mirror-controls');
	spawn('sh', [ process.env.PWD + '/scripts/scrollUp.sh']);
});

app.get('/controls/scroll/down', function(req, res) {
	logger.info('scrollDown');
	res.redirect('/mirror-controls');
	spawn('sh', [ process.env.PWD + '/scripts/scrollDown.sh']);
});


app.post('/controls/url', function(req, res) {
	var theUrl = req.body.url;
	logger.info('sending mirror-browser to ' + theUrl);
	res.redirect('/mirror-controls?url=OK');
	var goToUrl = spawn('sh', [ process.env.PWD + '/scripts/goToUrl.sh', theUrl]);
	goToUrl.stdout.on('data', function(data) {
		logger.info('stdout: ' + data);
	});
	goToUrl.stderr.on('data', function(data) {
		logger.error('stderr: ' + data);
	});
	goToUrl.on('exit', function(code) {
		if (code != 0) {
			logger.info('go to url (' + theUrl + ') failed with exit code ' + code);
		}
	});
});

app.listen(app.get('port'));
logger.info('Server running!')