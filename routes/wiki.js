var express = require('express');
var router = express();
var models = require('../models');
var Page = models.Page;
var User = models.User;
router.get('/', function (req, res) {
	res.redirect('/');
});

router.post('/', function (req, res) {
	//name, email, title, content, status
});

router.get('/add', function (req, res) {
	res.render('addpage');
});

module.exports = router;