'use strict';

/**
 * @ngdoc service
 * @name vidPenguin21App.feeds
 * @description
 * # feeds
 * Factory in the vidPenguin21App.
 */
angular.module('vidPenguin21App')
  .factory('feeds', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
