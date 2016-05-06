'use strict';

/**
 * @ngdoc service
 * @name vidPenguin21App.yt
 * @description
 * # yt
 * Service in the vidPenguin21App.
 */
angular.module('vidPenguin21App')
  .service('yt', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var promise;
    var yt = {
      async: function() {
        if ( !promise ) {
          // $http returns a promise, which has a then function, which also returns a promise
          promise = $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=https://www.youtube.com/watch?v=afhMMcAHlKw&fields=items(id%2Csnippet)&key=AIzaSyCymvYkSlRTuDID-n1cmzxOor_lPh9SPGo').then(function (response) {
            // The then function here is an opportunity to modify the response
            console.log(response);
            // The return value gets picked up by the then in the controller.
            return response.data;
          });
        }
        // Return the promise to the controller
        return promise;
      }
    };
    return yt;

  });
