'use strict';

describe('Filter: videoid', function () {

  // load the filter's module
  beforeEach(module('vidPenguin21App'));

  // initialize a new instance of the filter before each test
  var videoid;
  beforeEach(inject(function ($filter) {
    videoid = $filter('videoid');
  }));



});
