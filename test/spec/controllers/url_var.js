'use strict';

describe('Controller: UrlVarCtrl', function () {

  // load the controller's module
  beforeEach(module('vidPenguin21App'));

  var UrlVarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UrlVarCtrl = $controller('UrlVarCtrl', {
      $scope: scope
    });
  }));

});
