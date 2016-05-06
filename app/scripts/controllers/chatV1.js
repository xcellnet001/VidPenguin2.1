'use strict';
/**
 * @ngdoc function
 * @name vidPenguin21App.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('vidPenguin21App')
  .controller('ChatCtrl', function ($scope, Ref, $http, user, $firebaseArray, $firebaseObject,$timeout) {

    //Does anyone know what time it is?
    $scope.milliseconds = (new Date()).getTime();

    // Get user
    $scope.user = user;

    $scope.profile = $firebaseObject(Ref.child('users').child(user.uid));

    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = $firebaseArray(Ref.child('feeds').child(user.uid).limitToLast(3));

    // display any errors
    $scope.messages.$loaded().catch(alert);

    // provide a method for adding a vid
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {

        $http({
          method: 'GET',
          url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + newMessage + '&fields=items(id%2Csnippet)&key=AIzaSyCymvYkSlRTuDID-n1cmzxOor_lPh9SPGo'

           }).then(function pingSuccess(response) {
              $scope.ping = angular.fromJson(response);

              $scope.ping.title = $scope.ping.data.items[0].snippet.title;
              $scope.ping.vidId = $scope.ping.data.items[0].id.videoId;
              $scope.ping.thumb = $scope.ping.data.items[0].snippet.thumbnails.medium.url;
              $scope.ping.published = $scope.ping.data.items[0].snippet.publishedAt;
              $scope.ping.desc = $scope.ping.data.items[0].snippet.description;

        }, function pingError(response) {
          $scope.ping = $scope.err + response;
        });

        // push a vid to the end of the array
        $scope.messages.$add({user: $scope.user, url: newMessage, title: $scope.ping.title, count: '1', thumb: $scope.ping.thumb, date: $scope.milliseconds })

        // add feed info to user data
        // $scope.profile.$add({title: $scope.ping.title, date: $scope.milliseconds, id: $scope.messages.$id })

          // display any errors
          .catch(alert);


    }


    };

    $scope.getVid = function() {

      $scope.msg = 'clicked';
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
