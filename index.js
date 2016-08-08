var express = require('express');
var app = express();
var swig = require('swig');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var models = require('./models');
var wikiRouter = require('./routes/wiki');

//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//morgan
app.use(morgan('dev'));

//send requests to router
app.use('/wiki', wikiRouter);


//swig
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

//setup gets to public folder
app.use(express.static('public'));

//start server
models.User.sync({}).then(function () {
	return models.Page.sync({});
}).then(function () {
	app.listen(3000, function () {
		console.log('Server is listening on port 3001');
	})
}).catch(console.error);

