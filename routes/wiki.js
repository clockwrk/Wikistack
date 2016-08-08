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
	var name = req.body.name;
	var email = req.body.email;
	var title = req.body.title;
	var content = req.body.content;
	var status = req.body.status;
	var page = Page.build({
		title: title,
		content: content,
		status: status
	});
	page.save().then(function (result) {
		res.json(result);
	});
});

router.get('/add', function (req, res) {
	res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	}).then(function (foundPage) {
		res.render(foundPage);
	}).catch(next);
});

module.exports = router;