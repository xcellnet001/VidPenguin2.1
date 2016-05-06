'use strict';

describe('Filter: ytDur', function () {

  // load the filter's module
  beforeEach(module('vidPenguin21App'));

  // initialize a new instance of the filter before each test
  var ytDur;
  beforeEach(inject(function ($filter) {
    ytDur = $filter('ytDur');
  }));


});
