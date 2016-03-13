'use strict';

module.exports = function(app){
	var main = require('./controllers/main.controller.js');
	var test = require('./controllers/test.controller.js');
	var user = require('./controllers/user.controller.js');

	// 'CORE' ----------------------------
	app.route('/').get(main.index);

	// 'TEST' ----------------------------
	app.route('/test').post(test.create);
	app.route('/test').get(test.distinctAwardName);
	app.route('/year').get(test.distinctYearForAwardName);
	app.route('/awards').get(test.awardNamesAndYears);

	// 'USER'
	app.route('/login').post(user.login);
	app.route('/signup').post(user.signup);
	app.route('/api/profile').get(user.profile);


};
