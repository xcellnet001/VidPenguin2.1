'use strict';

/**
 * @ngdoc function
 * @name vidPenguin21App.controller:LinksCtrl
 * @description
 * # LinksCtrl
 * Controller of the vidPenguin21App
 */
angular.module('vidPenguin21App')
  .controller('LinksCtrl', function ($scope, user, Auth, $firebaseArray, Ref,$timeout) {

    //Get UID
    $scope.user = user;
    $scope.auth = Auth;

    // synchronize a read-only, synchronized array of messages, only grabbing on as placeholder.
    $scope.links = $firebaseArray(Ref.child('links').child(user.uid).limitToLast(50));

    $scope.links.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addLink = function(newLink) {
      if( newLink ) {
        // push a message to the end of the array
        $scope.links.$add({display: newLink, id: '2' , string:newLink , active: '1',tags:'http',created:$scope.milliseconds })
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
