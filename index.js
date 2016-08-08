var express = require('express');
var app = express();
var swig = require('swig');
var bodyParser = require('body-parser');
var morgan = require('morgan');

//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);

app.use('/', function (req, res) {
	console.log('receiving');
});
//morgan
app.use(morgan('dev'));

//swig
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

//setup gets to public folder
app.use(express.static('views'));

//start server
var server = app.listen(1337, function () {
	console.log('listening on port 1337');
});

