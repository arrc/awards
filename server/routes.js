'use strict';

module.exports = function(app){
	var main = require('./controllers/main.controller.js');
	var award = require('./controllers/award.controller.js');
	var user = require('./controllers/user.controller.js');
	var editor = require('./controllers/editor.controller.js');
	var oscar = require('./helpers/oscar-scraper.js');

	// 'CORE' ----------------------------
	app.route('/').get(main.index);

	// 'EDITOR' ----------------------------
	app.route('/editor').post(editor.editor);
	app.route('/oscar').get(oscar.oscar);

	// 'USER'
	app.route('/login').post(user.login);
	app.route('/signup').post(user.signup);
	app.route('/api/profile').get(user.profile);

	// 'AWARD' ----------------------------
	app.route('/api/awards/ceremonies').get(award.ceremonies);
	app.route('/api/awards/nominations').get(award.nominations);
	app.route('/api/awards/vote').put(award.vote);

};
