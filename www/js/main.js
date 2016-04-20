require.config({
  baseUrl: "js",

  // alias libraries paths.  Must set 'angular'
  paths: {
    'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min',
    'angular-route': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min',
    'angularAMD': '//cdn.jsdelivr.net/angular.amd/0.2.0/angularAMD.min',
//    'uiRouter': '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.18/angular-ui-router.js',
    'uiRouter': '//angular-ui.github.io/ui-router/release/angular-ui-router.min',
    'moment': 'moment',
    "View1Ctrl": 'controllers/controller_view1',
    "LoginCtrl": 'controllers/login.controller',
    "HomeCtrl": 'controllers/controller_home',
    "View2Ctrl": 'controllers/controller_view2'

  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'uiRouter': ['angular']
  },

  // kick start application
  deps: ['app']
});
