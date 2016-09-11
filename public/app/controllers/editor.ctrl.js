(function() {
  'use strict';
	var EditorCtrl = function($http, User, Editor){
		var _this = this;

    _this.editor = function(){
      var payload = {};
      payload.name = _this.editorForm.name;
      payload.year = _this.editorForm.year;
      payload.text = _this.editorForm.text;

      Editor.editor(payload).then(function(data){
        console.log(data);
      }, function(error){
        console.error(error);
      });
    };

	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('awards').controller('EditorCtrl',[
		'$http',
    'User',
    'Editor',
		EditorCtrl
	]);
})();
