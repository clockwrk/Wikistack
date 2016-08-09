var express = require('express');
var router = express();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function (req, res) {
	Page.findAll({}).then(function (pages) {
		res.render('index', {pages});
	})
});

router.post('/', function (req, res) {
	//name, email, title, content, status
	var name = req.body.name;
	var email = req.body.email;
	var title = req.body.title;
	var content = req.body.content;
	var status = req.body.status;

	User.findOrCreate({
		where: {
			name: name,
			email: email
		}
	}).then(function (values) {
		var user = values[0];
		var page = Page.build({
			title: title,
			content: content,
			status: status
		});
		return page.save().then(function (savedPage) {
			return page.setAuthor(user);
		})
	}).then(function (page) {
		res.redirect(page.route);
	}).catch(function (error) {
		console.log(error);
	});
});

router.get('/add', function (req, res) {
	res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		},
		include: [
			{model: User, as: 'author'}
		]
	})
		.then(function (page) {
			if (page === null) {
				res.status(404).send();
			} else {
				res.render('wikipage', {
					page: page
				});
			}
		})
		.catch(next);
});

module.exports = router;