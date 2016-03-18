'use strict';

angular.module('awards').config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('editor', {
    url: '/editor',
    templateUrl: 'app/views/test/editor.html'
  });
}]);
