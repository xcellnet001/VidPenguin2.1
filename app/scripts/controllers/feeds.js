'use strict';

/**
 * @ngdoc function
 * @name vidPenguin21App.controller:FeedsCtrl
 * @description List out user feeds and provide tools to add urls.
 * # FeedsCtrl
 * Controller of the vidPenguin21App
 */
angular.module('vidPenguin21App')
  .controller('FeedsCtrl', function ($scope, user, Auth, $filter, Ref, $sce, $firebaseArray, $firebaseObject, $uibModal, $timeout) {

    //Get UID
    $scope.user = user;
    $scope.auth = Auth;

    //Does anyone know what time it is?
    $scope.milliseconds = (new Date()).getTime();

    $scope.isCollapsed = true;

    $scope.sortType     = 'title'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFeeds   = '';     // set the default search/filter term
    $scope.currentPage = 0;       //set pagantion start point
    $scope.pageSize = 10;         // set size of return of records
    $scope.data = [];

    // connecting to user profile
    $scope.profile = $firebaseObject(Ref.child('users').child(user.uid));

    // synchronize a read-only, synchronized array of of user videos
    $scope.feeds = $firebaseArray(Ref.child('feeds').child(user.uid));

    // links for each video
    $scope.links = $firebaseArray(Ref.child('links').child(user.uid));

    //Set YouTube video for feed list ng-show
    $scope.url = $scope.feeds.url;

    // display any errors
    $scope.feeds.$loaded().catch(alert);

    $scope.drips = $firebaseArray(Ref.child('drips').child(user.uid));
    $scope.addDrip = function(link) {
      $scope.drips.$add({user: $scope.user.uid, SubmitDate: $scope.milliseconds, linkID: link.$id, v: link.v});
      console.log(link);
      window.alert('Adding Social Starter');
    };
    $scope.addDrips = function() {
      angular.forEach($scope.links,function(link) {
        $scope.drips.$add({user: $scope.user.uid, SubmitDate: $scope.milliseconds, linkID: link.$id, v: link.v,Frequency: 'frequency' ,target: 'target' });
        console.log(link);
      });
    };

    $scope.frequency = [
      'right now bitches',
      '6 hours',
      '12 hours',
      'once a day',
      'once every 3 days',
      'once a week'
    ];

    $scope.target = [
      'Blogger',
      'Wordpress',
      'Google +'
    ];

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.toggleDetail = function($index) {
      //$scope.isVisible = $scope.isVisible == 0 ? true : false;
      $scope.activePosition = $scope.activePosition === $index ? -1 : $index;
    };

    //ng-show for video on page
    $scope.selectOrder = function (order) {
      order.IsCurrentOrder = false;
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

  });
