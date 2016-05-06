'use strict';

describe('Controller: IntegrationsCtrl', function () {

  // load the controller's module
  beforeEach(module('vidPenguin21App'));

  var IntegrationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntegrationsCtrl = $controller('IntegrationsCtrl', {
      $scope: scope
    });
  }));

});
