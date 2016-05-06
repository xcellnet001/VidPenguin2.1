'use strict';

/**
 * @ngdoc function
 * @name vidPenguin21App.controller:FeedCtrl
 * @description
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

    $scope.links = $firebaseArray(Ref.child('links').child(user.uid).limitToLast(100));

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
