var express = require('express');
var router = express();

router.get('/', function (req, res) {
	res.redirect('/');
});

router.post('/', function (req, res) {
	res.send('ur posting in /wiki/');
});

router.get('/add', function (req, res) {
	res.render('addpage');
});

module.exports = router;