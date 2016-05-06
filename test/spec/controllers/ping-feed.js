'use strict';

describe('Controller: PingFeedCtrl', function () {

  // load the controller's module
  beforeEach(module('vidPenguin21App'));

  var PingFeedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PingFeedCtrl = $controller('PingFeedCtrl', {
      $scope: scope
    });
  }));


});
