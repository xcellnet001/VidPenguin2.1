'use strict';

describe('Controller: DripCtrl', function () {

  // load the controller's module
  beforeEach(module('vidPenguin21App'));

  var DripCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DripCtrl = $controller('DripCtrl', {
      $scope: scope
    });
  }));

});
