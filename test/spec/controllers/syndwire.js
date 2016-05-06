'use strict';

describe('Controller: SyndwireCtrl', function () {

  // load the controller's module
  beforeEach(module('vidPenguin21App'));

  var SyndwireCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SyndwireCtrl = $controller('SyndwireCtrl', {
      $scope: scope
    });
  }));

});
