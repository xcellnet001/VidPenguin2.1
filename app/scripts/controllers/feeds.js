'use strict';

/**
 * @ngdoc function
 * @name vidPenguin21App.controller:FeedsCtrl
 * @description List out user feeds and provide tools to add urls.
 * # FeedsCtrl
 * Controller of the vidPenguin21App
 */
angular.module('vidPenguin21App')
  .controller('FeedsCtrl', function ($scope, user, Auth, $filter, Ref, $sce, $firebaseArray, $firebaseObject, $timeout, $window) {

    //Get UID
    $scope.user = user;
    $scope.auth = Auth;

    //Does anyone know what time it is?
    $scope.milliseconds = (new Date()).getTime();

    $scope.isCollapsed = true;

    $scope.sortType     = 'date'; // set the default sort type
    $scope.sortReverse  = true;  // set the default sort order
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
      $scope.drips.$add({user: $scope.user.uid, SubmitDate: $scope.milliseconds, linkID: link.$id, v: link.v,vid: link.vid, frequency: $scope.frequency ,target: $scope.target });
      console.log(link);
      window.alert('Adding Social Starter');
    };

    $scope.addDrips = function(feed) {
      console.log(feed);
      console.log($scope.frequency.selected.id);
      console.log($scope.frequency.selected.id.t);
      console.log($scope.target.selected.id);

      angular.forEach($scope.links,function(link) {
        if (feed.$id === link.vid) {

          console.log(link);
          //var extime = $scope.frequency.selected.id.t * link.$id;
          //var extime = 86400 * link.$id;
          //console.log(extime);
          //var count = 0;
          //$scope.extime = $scope.feed.$Ref();

          console.log($scope.drips.length);
          console.log(feed.$id);

          console.log(feed);
          $scope.drips.$add({
            user: $scope.user.uid,
            SubmitDate: $scope.milliseconds,
            linkID: link.$id,
            v: link.v,
            vid: link.vid,
            type: 'a',
            ix: link.id * $scope.frequency.selected.id.t,
            frequency: $scope.frequency.selected.id,
            target: $scope.target.selected.id,
            scheduled: $scope.milliseconds,
            triggered: '0'
          }).then(console.log('drip added'));

        }
        });

      $window.location.href = '/#/drip';

    };

    //set time freq trigger
    $scope.frequency = [
      {id: 1, name: '6 Hours', t: '21600000'},
      {id: 2, name: '12 Hours', t: '43200000'},
      {id: 3, name: 'Daily', t:'86400000'},
      {id: 4, name: 'Weekly', t:'604800000'},
      {id: 5, name: 'Monthly', t:'2629743000'}
    ];

    //set target for post
    $scope.target = [
      {id: 1, name: 'Blogger'},
      {id: 2, name: 'Twitter'},
      {id: 3, name: 'Google'},
      {id: 4, name: 'WordPress'},
      {id: 5, name: 'Tumblr'}
    ];


    $scope.selected = { value: $scope.target[0] };

    $scope.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      readOnly: 'nocursor',
      mode: 'xml'
    };

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
