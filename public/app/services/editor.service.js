(function(){
	'use strict';

	var Editor = function($http, $q, $window, jwtHelper, Auth){
    var o = {};

    // signup
    o.editor = function(payload) {
      console.log(payload);
			var dfd = $q.defer();
			$http.post('/editor', payload)
				.success(function(res){
					Auth.setToken(res.token);
					dfd.resolve(res);
				})
				.error(function(error){
					Auth.clearToken();
					dfd.reject(error);
				});
			return dfd.promise;
		};


    return o;
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('awards').factory('Editor',[
    '$http',
		'$q',
		'$window',
		'jwtHelper',
    'Auth',
		Editor
	]);
})();
