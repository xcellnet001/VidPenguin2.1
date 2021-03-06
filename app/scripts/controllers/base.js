'use strict';
/**
 * @ngdoc function
 * @name vidP22App.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('vidPenguin21App')
  .controller('BaseCtrl', function ($scope, Ref, $firebaseArray, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = $firebaseArray(Ref.child('links').limitToLast(10));

    // display any errors
    $scope.messages.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        // push a message to the end of the array
        $scope.messages.$add({text: newMessage})
          // display any errors
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
