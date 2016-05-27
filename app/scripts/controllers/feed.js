'use strict';

/**
 * @ngdoc function
 * @name vidPenguin21App.controller:FeedCtrl
 * @description display individual feed
 * # FeedCtrl
 * Controller of the vidPenguin21App
 */
angular.module('vidPenguin21App')
  .controller('FeedCtrl', function ($scope, user, $firebaseObject,$firebaseArray, Ref, $routeParams) {

    $scope.user = user;

    $scope.fid = $routeParams.feedID;

    //$scope.feeds = $firebaseArray(Ref.child('feeds').child(user.uid).child($scope.fid));
    //$scope.f = $scope.feeds.$getRecord($scope.fid);

    var feed = $firebaseObject(Ref.child('feeds/'+user.uid+'/'+$scope.fid));
    feed.$bindTo($scope, 'feed');

    // synchronize a read-only, synchronized array
    $scope.links = $firebaseArray(Ref.child('links').child(user.uid));
    $scope.feeds = $firebaseArray(Ref.child('feeds').child(user.uid));
	  $scope.drips = $firebaseArray(Ref.child('drips').child(user.uid));

    $scope.updateTitle = function() {
      window.alert('You have updated' + feed.title);
    };

    $scope.updateDesc = function() {
      window.alert('You have updated' + feed.desc);
    };


  });
