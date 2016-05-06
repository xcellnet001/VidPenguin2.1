'use strict';

/**
 * @ngdoc function
 * @name vidPenguin21App.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the vidPenguin21App
 */
angular.module('vidPenguin21App')
  .controller('AdminCtrl', function ($scope, Ref, $firebaseArray, $firebaseObject,$timeout) {
  
      $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  
    //Does anyone know what time it is?
    $scope.milliseconds = (new Date()).getTime();

    // synchronize a read-only, synchronized array of messages, limit to most recent 50
    $scope.users = $firebaseArray(Ref.child('users').limitToLast(50));

    // display any errors
    $scope.users.$loaded().catch(alert);


    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

  });
