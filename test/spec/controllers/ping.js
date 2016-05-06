'use strict';

describe('Controller: PingCtrl', function () {

  // load the controller's module
  beforeEach(module('vidPenguin21App'));

  var PingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PingCtrl = $controller('PingCtrl', {
      $scope: scope
    });
  }));


});
