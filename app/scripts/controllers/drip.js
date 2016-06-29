'use strict';

/**
 * @ngdoc function
 * @name vidPenguin21App.controller:DripCtrl
 * @description - base social starter logic, controls timing and posting via api's provided
 * # DripCtrl
 * Controller of the vidPenguin21App
 */
angular.module('vidPenguin21App')
  .controller('DripCtrl', function ($scope, user, Auth, $firebaseArray, $firebaseObject, Ref, $http) {
    //Get UID and test if user has premission
    $scope.user = user;
    $scope.auth = Auth;
    $scope.uid = user.auth.uid;

    //Does anyone know what time it is?
    $scope.milliseconds = (new Date()).getTime();

    // synchronize social starters
    $scope.drips = $firebaseArray(Ref.child('drips').child(user.uid));

    // synchronize feeds
    $scope.feeds = $firebaseArray(Ref.child('feeds').child(user.uid));

    // links for each links
    $scope.links = $firebaseArray(Ref.child('links').child(user.uid));


    //set up to fire manual executition of posting to blogger - used for testing
    $scope.manualEX = function(linkID) {
      console.log('1');
      $scope.link = $firebaseObject(Ref.child('links').child(user.uid + '/' + linkID));

      console.log('2');

      $scope.link.$loaded()
        .then(function(data) {
          console.log(data === $scope.link); // true

          Ref.authWithOAuthPopup('google', function(error, authData) {
            if (error) {
              console.log('Login Failed!', error);
              console.log(authData);
            } else {
              console.log('Authenticated successfully with payload:', authData);
            }
          });

          console.log( $scope.link.title, $scope.link.url + $scope.link.v, $scope.link.desc);

        }).then(function bloggerpost(){

        $http({
          method: 'post',
          url:'https://www.googleapis.com/blogger/v3/blogs/2906144303013687937/posts?fields=blog%2Ccontent%2Ckind%2Ctitle&key=AIzaSyCymvYkSlRTuDID-n1cmzxOor_lPh9SPGo',
          data: {
            'kind': 'blogger#post',
            'blog': {
              'id': '2906144303013687937'
            },
            'title': $scope.link.title,
            'content': $scope.link.desc
          }
        });
          console.log( bloggerpost );
        window.alert( 'You have posted the blogger' );
      })
        .catch(function(error) {
          console.error('Error:', error);
        });
      console.log( 'Do you want fries with that?' );
    };

    $scope.isActive = function() {

    };

    $scope.twitManualEX = function(drip) {

      $scope.drip = drip;
      console.log($scope.drip.linkID);

      $scope.link = $firebaseObject(Ref.child('links').child(user.uid + '/' + drip.linkID));

      console.log($scope.link);
      console.log($scope.link.$id);

      $scope.link.$loaded()
        .then(function(l) {
          console.log(l === $scope.link);
          console.log(l.vid);
          $scope.feed = $firebaseObject(Ref.child('feeds').child(user.uid + '/' + l.vid));
          console.log($scope.feed);

          $scope.drip.triggered = '2';

          Ref.authWithOAuthToken('twitter', {
            'user_id': 'fearlessnet'
          }, function(error, authData) {
            if (error) {
              console.log('Login Failed!', error);
            } else {
              console.log('Authenticated successfully with payload:', authData);
            }
          });


        })

    };

    //add together time together for future excutation
    $scope.Math = window.Math;
    //$scope.ext = $scope.Math.min($scope.drip.SubmitDate + $scope.drip.frequency.t)

  });
