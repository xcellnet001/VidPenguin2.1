// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2016-02-15 using
// generator-karma 1.0.1

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/firebase/firebase.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-modal-service/dst/angular-modal-service.js',
      'bower_components/ng-csv/build/ng-csv.min.js',
      'bower_components/x2js/xml2json.min.js',
      'bower_components/angular-x2js/dist/x2js.min.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/angular-ui-sortable/sortable.js',
      'bower_components/angular-toggle-switch/angular-toggle-switch.js',
      'bower_components/angularjs-slider/dist/rzslider.js',
      'bower_components/codemirror/lib/codemirror.js',
      'bower_components/angular-ui-codemirror/ui-codemirror.js',
      'bower_components/angular-carousel/dist/angular-carousel.js',
      'bower_components/slick-carousel/slick/slick.min.js',
      'bower_components/angular-slick/dist/slick.js',
      'bower_components/angular-ui-select/dist/select.js',
      'bower_components/sifter/sifter.js',
      'bower_components/microplugin/src/microplugin.js',
      'bower_components/selectize/dist/js/selectize.js',
      'bower_components/angular-elastic/elastic.js',
      'bower_components/clipboard/dist/clipboard.js',
      'bower_components/ngclipboard/dist/ngclipboard.js',
      'bower_components/jsSHA/src/sha.js',
      'bower_components/ng-twitter-api/dist/ng-twitter-api.js',
      'bower_components/query-string/query-string.js',
      'bower_components/angular-oauth2/dist/angular-oauth2.js',
      'bower_components/mockfirebase/browser/mockfirebase.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 9999,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
