'use strict';
/**
 * @ngdoc function
 * @name vidP22App.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('vidPenguin21App')
  .controller('ChatCtrl', function ($scope, Ref, $firebaseArray, $timeout, user) {

    //Get UID
    $scope.user = user;

    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    //$scope.vid = '-KEHQIM1SxEg8yktXBVH';

    //Does anyone know what time it is?
    $scope.milliseconds = (new Date()).getTime();

    $scope.links = $firebaseArray(Ref.child('urls').limitToLast(100));

    // display any errors
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
