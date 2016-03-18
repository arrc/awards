'use strict';

module.exports = function(app){
	var main = require('./controllers/main.controller.js');
	var test = require('./controllers/test.controller.js');
	var user = require('./controllers/user.controller.js');
	var editor = require('./controllers/editor.controller.js');
	var oscar = require('./helpers/oscar-scraper.js');

	// 'CORE' ----------------------------
	app.route('/').get(main.index);

	// 'TEST' ----------------------------
	app.route('/test').get(test.distinctAwardName);
	app.route('/year').get(test.distinctYearForAwardName);
	app.route('/awards').get(test.awardNamesAndYears);
	app.route('/polls').get(test.awardsPolls);

	// 'EDITOR' ----------------------------
	app.route('/editor').post(editor.editor);
	app.route('/oscar').get(oscar.oscar);

	// 'USER'
	app.route('/login').post(user.login);
	app.route('/signup').post(user.signup);
	app.route('/api/profile').get(user.profile);


};
