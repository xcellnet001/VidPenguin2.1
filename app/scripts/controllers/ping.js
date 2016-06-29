'use strict';

/**
 * @ngdoc function
 * @name vidPenguin21App.controller:PingCtrl
 * @description
 * # PingCtrl
 * Controller of the vidPenguin21App
 */
angular.module('vidPenguin21App')

    .controller('PingCtrl', function ($scope, $http, $timeout, user, Auth, $firebaseArray, $firebaseObject, Ref, $location, $filter) {

      //Get UID
      $scope.user = user;
      $scope.auth = Auth;
      $scope.uid = user.auth.uid;

      //Does anyone know what time it is?
      $scope.milliseconds = (new Date()).getTime();

      $scope.aurl = false;
      $scope.loaded = false;

      //watch form to add feed
      $scope.$watch('search', function() {
        $scope.getVid();
     });


      //Can add YouTube url to display on first view
      //$scope.search = 'https://www.youtube.com/watch?v=3oY2MpZKAa4';
      //$scope.search = 'https://www.youtube.com/watch?v=F4gJsKZvqE4';
      //$scope.search = 'https://www.youtube.com/watch?v=Qim29B8ZBKg';
      //$scope.search = 'https://www.youtube.com/watch?v=pPH45dXZxaM';
      $scope.search = '';

      $scope.err = 'you have an error searching for a video';

      //Get JSON from YouTube API
      $scope.getVid = function() {
        $scope.preLinks = [];
        $scope.v = $filter('videoid')($scope.search);
        $http({
          method: 'GET',
         url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=' + $scope.v + '&fields=items&key=AIzaSyCymvYkSlRTuDID-n1cmzxOor_lPh9SPGo&prettyprint=true'

        }).then(function pingSuccess(response) {
          $scope.ping = angular.fromJson(response);

          //variables broken out of json
          $scope.ping.title = $scope.ping.data.items[0].snippet.title;
          $scope.ping.vidId = $scope.ping.data.items[0].id;
          $scope.ping.thumb = $scope.ping.data.items[0].snippet.thumbnails.medium.url;
          $scope.ping.published = $scope.ping.data.items[0].snippet.publishedAt;
          $scope.ping.description = $scope.ping.data.items[0].snippet.description;
          $scope.ping.dur = $scope.ping.data.items[0].contentDetails.duration;
          //console.log('duration ' + $scope.ping.dur);

            //convert ISO 8601 to seconds.
            var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
            var hours = 0, minutes = 0, seconds = 0, totalseconds;

            if (reptms.test($scope.ping.dur)) {
              var matches = reptms.exec($scope.ping.dur);
              if (matches[1]) {hours = Number(matches[1]);}
              if (matches[2]) {minutes = Number(matches[2]);}
              if (matches[3]) {seconds = Number(matches[3]);}
            totalseconds = hours * 3600  + minutes * 60 + seconds;
          }

          $scope.vtime = totalseconds;
          //console.log($scope.vtime);

          // pull tags for later use
          $scope.ping.tags = $scope.ping.data.items[0].snippet.tags;

        },function() {
          //base load of preLinks with data

          angular.forEach($scope.urls,function(url){
            var newpreLink ={};
            newpreLink.active = 'true';
            newpreLink.title = $scope.ping.title;
            newpreLink.desc = $scope.ping.description;
            newpreLink.v = $scope.v;
            newpreLink.thumb = $scope.ping.thumb;
            $scope.preLinks.push({id: url.id, url: url.display, title: newpreLink.title, desc: newpreLink.desc, v:newpreLink.v, active: true,thumb: newpreLink.thumb});
            console.log($scope.preLinks);
          });
        });
      };

      // synchronize a read-only, synchronized array.
      $scope.feeds = $firebaseArray(Ref.child('feeds').child(user.uid));
      $scope.links = $firebaseArray(Ref.child('links').child(user.uid).limitToLast(1));
      $scope.profile = $firebaseObject(Ref.child('users').child(user.uid));
      $scope.urls = $firebaseArray(Ref.child('urls').limitToLast(100));


      // display any errors
      $scope.feeds.$loaded().catch(alert);
      $scope.links.$loaded().catch(alert);
      $scope.profile.$loaded().catch(alert);
      $scope.urls.$loaded().catch(alert);

      // provide a method for adding a vid to feed
      $scope.addFeed = function(search) {

        if( search ){
           // push a vid to the end of the array
          $scope.feeds.$add({user: $scope.user.uid, url: $scope.search, title: $scope.ping.title, desc: $scope.ping.description, thumb: $scope.ping.thumb, date: $scope.milliseconds, v:$scope.ping.vidId, t:$scope.vidtime.value})
          .then(function(Ref){
            var id = Ref.key();
            $scope.feeds.$indexFor(id); // returns location in the array
              console.log('the id is' + id);

             angular.forEach($scope.preLinks,function(preLink){
               if (preLink.active === true){
                $scope.links.$add({id: preLink.id, url: preLink.url, title: preLink.title, desc: preLink.desc, v:$scope.ping.vidId,  date: $scope.milliseconds, active: true, vid: id,user: $scope.user.uid,thumb: $scope.ping.thumb });
                var lid = Ref.key();
                console.log('added record with id ' + lid);
             }
              });

            console.log('added record with id ' + id);
            $timeout(function() { $scope.loaded = true; }, 5000);
              $location.path('/feeds');
            })

            // display any errors
             .catch(alert);
        }
      };

      //core spintax javascript.
      var SPINTAX_PATTERN = /\{[^"\r\n\}]*\}/;
      var spin = function (spun) {
        var match;
        while ((match = spun.match(SPINTAX_PATTERN)) !==null) {
          match = match[0];
          var candidates = match.substring(1, match.length - 1).split('|');
          spun = spun.replace(match, candidates[Math.floor(Math.random() * candidates.length)]);
        }
        return spun;
      };

      // the below caused problems with spintax and didn't need in final, left for ref.

      //var spin_countVariations = function (spun) {
       // spun = spun.replace(/[^{|}]+/g, '1');
       // spun = spun.replace(/\{/g, '(');
       // spun = spun.replace(/\|/g, '+');
       // spun = spun.replace(/\}/g, ')');
       // spun = spun.replace(/\)\(/g, ')*(');
       // spun = spun.replace(/\)1/g, ')*1');
       // spun = spun.replace(/1\(/g, '1*(');
       // return eval(spun);
      //};

      $scope.spin = function() {
        angular.forEach($scope.preLinks, function () {
          var ct = document.getElementById('sindesc');
          console.log('preLink.desc' + ct);
          ct.value = spin(ct.value);
          console.log('sindesc ' + ct.value);
          var ct1 = document.getElementById('sintitle');
          ct1.value = spin(ct1.value);
          console.log('sintitle ' + ct1.value);
        });
      };
      
      //add links to temp array prior to to adding them to the FB list.
      $scope.addpreLinks = function() {
        //base load of preLinks with data
        $scope.preLinks.title = $scope.ping.title;
        $scope.preLinks.desc = $scope.ping.description;
        $scope.orderProp = '$index + 1';
        var newpreLink = {};
        newpreLink.active = true;
        newpreLink.title = $scope.ping.title;
        // why is desc not going at top of xml?
        newpreLink.desc = $scope.ping.description;
        newpreLink.v = $scope.v;
        newpreLink.thumb = $scope.ping.thumb;

        angular.forEach($scope.urls, function (url) {
          if ($scope.preLinks.length >= $scope.val.value) {
            $scope.preLinks.push({
              id: url.id,
              url: url.display,
              title: newpreLink.title,
              desc: newpreLink.desc,
              v: newpreLink.v,
              active: false,
              thumb: newpreLink.thumb
            });
          } else {
            $scope.preLinks.push({
              id: url.id,
              url: url.display,
              title: newpreLink.title,
              desc: newpreLink.desc,
              v: newpreLink.v,
              active: true,
              thumb: newpreLink.thumb
            });
          }
            console.log($scope.preLinks);
          });
        };

      $scope.resetpreLinks = function(){

        // angular.forEach($scope.preLinks, function (preLink) {
        //  preLink.active = false;
        // });
        $scope.preLinks.length = 0;

      };
      //Set YouTube video for feed list ng-show
      $scope.url = $scope.search;

      // Set vid time slider init value
      $scope.vidtime = {
        value: 0,
        options: {
          ceil: 1000,
          floor: 0,
          step: 1
        }
      };


      // Set vid time slider init value ** Need to investigate why scope variable will not work. Need to use url.length here **
      $scope.val = {
        value: 1,
        maxValue: $scope.urls.length,
        options: {
          floor: 1,
          ceil: 32,
          step: 1,
          showTicks: true

        }
      };

      $scope.updateTD = function() {

        angular.forEach($scope.preLinks, function (preLink) {
          console.log(preLink);
          var title = document.getElementById('sintitle').value;
          var desc = document.getElementById('sindesc').value;
          console.log(title);
          console.log(desc);

          console.log('made it 0');
          preLink.title = title;
          console.log('made it 1');
          preLink.desc = desc;
          console.log('made it 2');

        });

        $scope.$apply();


      };


      $scope.spin = function() {

        angular.forEach($scope.preLinks, function (preLink) {
          console.log(preLink);
          var title = document.getElementById('sintitle').value;
          var desc = document.getElementById('sindesc').value;
          console.log(title);
          console.log(desc);

          console.log('made it 0');
          preLink.title = title;
          preLink.title = spin(preLink.title);
          console.log('made it 1');
          preLink.desc = desc;
          preLink.desc = spin(preLink.desc);
          console.log('made it 2');

        });

        $scope.$apply();


      };


      $scope.toggleDetail = function($index) {
        //$scope.isVisible = $scope.isVisible == 0 ? true : false;
        $scope.activePosition = $scope.activePosition === $index ? -1 : $index;
      };



      function alert(msg) {
        $scope.err = msg;
        $timeout(function() {
          $scope.err = null;
        }, 5000);
      }

    });
