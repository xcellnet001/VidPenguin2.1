'use strict';

describe('Controller: BoostCtrl', function () {

  // load the controller's module
  beforeEach(module('vidPenguin21App'));

  var BoostCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BoostCtrl = $controller('BoostCtrl', {
      $scope: scope
    });
  }));


});
