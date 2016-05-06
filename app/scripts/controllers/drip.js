'use strict';

/**
 * @ngdoc function
 * @name vidPenguin21App.controller:DripCtrl
 * @description
 * # DripCtrl
 * Controller of the vidPenguin21App
 */
angular.module('vidPenguin21App')
  .controller('DripCtrl', function ($scope, user, Auth, $firebaseArray, $firebaseObject, Ref, $http) {
    //Get UID
    $scope.user = user;
    $scope.auth = Auth;
    $scope.uid = user.auth.uid;

    //Does anyone know what time it is?
    $scope.milliseconds = (new Date()).getTime();

    $scope.drips = $firebaseArray(Ref.child('drips').child(user.uid));

    // synchronize a read-only, synchronized array of of user videos
    $scope.feeds = $firebaseArray(Ref.child('feeds').child(user.uid));

    // links for each video
    $scope.links = $firebaseArray(Ref.child('links').child(user.uid));

    $scope.manualEX = function(linkID) {
      $scope.link = $firebaseObject(Ref.child('links').child(user.uid + '/' + linkID));

      $scope.link.$loaded()
        .then(function(data) {
          console.log(data === $scope.link); // true

          Ref.authWithOAuthPopup('google', function(error, authData) {
            if (error) {
              console.log('Login Failed!', error);
            } else {
              console.log('Authenticated successfully with payload:', authData);
            }
          });

          console.log( $scope.link.title, $scope.link.url + $scope.link.v, $scope.link.desc);

          $scope.json = JSON.stringify({
            'kind': 'blogger#post',
            'blog': {
            'id': '2906144303013687937'
          },
            'title': $scope.link.title,
            'content': $scope.link.desc
          });

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
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
