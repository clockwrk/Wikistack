var express = require('express');
var router = express();
var models = require('../models');
var Promise = require('bluebird');
var Page = models.Page;
var User = models.User;

router.get('/', function (req, res, next) {
	User.findAll({}).then(function (users) {
		res.render('users', {users: users});
	}).catch(next);
});

router.get('/:userId', function (req, res, next) {
	var userPromise = User.findById(req.params.userId);
	var pagesPromise = Page.findAll({
		where: {
			authorId: req.params.userId
		}
	});

	Promise.all([userPromise, pagesPromise]).then(function (values) {
		var user = values[0];
		var pages = values[1];
		res.render('user.html', {
			user: user,
			pages: pages
		});
	}).catch(next);
});

module.exports = router;