'use strict';

describe('Controller: HelpCtrl', function () {

  // load the controller's module
  beforeEach(module('vidPenguin21App'));

  var HelpCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HelpCtrl = $controller('HelpCtrl', {
      $scope: scope
    });
  }));


});
