'use strict';

/**
 * @ngdoc filter
 * @name vidPenguin21App.filter:videoid
 * @function
 * @description
 * # videoid
 * Filter in the vidPenguin21App.
 */
angular.module('vidPenguin21App')
  .filter('videoid', function () {
    return function (text) {
      var videoid = text.split('v=')[1].split('&')[0];
      return videoid;
    };
  });

