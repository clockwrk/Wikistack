var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

var Page = db.define('page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING,
		isUrl: true,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	status: {
		type: Sequelize.ENUM('open', 'closed')
	},
	tags: {
		type: Sequelize.ARRAY(Sequelize.TEXT)
	}
}, {
	getterMethods: {
		route: function () {
			return '/wiki/' + this.urlTitle;
		}
	}
});

Page.hook('beforeValidate', function (page) {
	function generateUrlTitle (title) {
		if (title) {
			return title.replace(/\s+/g, '_').replace(/\W/g, '');
		} else {
			return Math.random().toString(36).substring(2, 7);
		}
	}

	page.urlTitle = generateUrlTitle(page.title);
});

var User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		isEmail: true,
		allowNull: false
	}
});

Page.belongsTo(User, {as: 'author'});

module.exports = {
	Page: Page,
	User: User
};