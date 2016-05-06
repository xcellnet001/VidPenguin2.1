'use strict';

/**
 * @ngdoc service
 * @name vidPenguin21App.link
 * @description
 * # link
 * Service in the vidPenguin21App.
 */
angular.module('vidPenguin21App')
  .service('link', function ($scope, user, $firebaseObject,$firebaseArray, Ref) {

    var feed = $firebaseObject(Ref.child('feeds/'+user.uid+'/'+$scope.fid));
    feed.$bindTo($scope, 'feed');


  });
