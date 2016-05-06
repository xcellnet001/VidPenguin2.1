'use strict';

describe('Controller: LinksCtrl', function () {

  // load the controller's module
  beforeEach(module('vidPenguin21App'));

  var LinksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LinksCtrl = $controller('LinksCtrl', {
      $scope: scope
    });
  }));

});
