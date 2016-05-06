'use strict';

describe('Controller: ChannelmasterCtrl', function () {

  // load the controller's module
  beforeEach(module('vidPenguin21App'));

  var ChannelmasterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChannelmasterCtrl = $controller('ChannelmasterCtrl', {
      $scope: scope
    });
  }));


});
