'use strict';

describe('Controller: PasswordresetCtrl', function () {

  // load the controller's module
  beforeEach(module('vidPenguin21App'));

  var PasswordresetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PasswordresetCtrl = $controller('PasswordresetCtrl', {
      $scope: scope
    });
  }));


});
