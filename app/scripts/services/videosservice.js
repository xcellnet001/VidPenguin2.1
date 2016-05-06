'use strict';

/**
 * @ngdoc service
 * @name vidPenguin21App.VideosService
 * @description
 * # VideosService
 * Factory in the vidPenguin21App.
 */
angular.module('vidPenguin21App')
  .factory('VideosService', function ($http) {

    var key = 'AIzaSyCymvYkSlRTuDID-n1cmzxOor_lPh9SPGo';

    function getPlaylists(channelId) {
      return $http.get('https://www.googleapis.com/youtube/v3/channels', { part: 'snippet', channelId: channelId, key: key });
    }

    function getPlaylistVideos(id) {
      return $http.get('https://www.googleapis.com/youtube/v3/videos', { params: { part: 'snippet', id: id, key: key } });
    }

    return { getPlaylists: getPlaylists, getPlaylistVideos: getPlaylistVideos };

  });
