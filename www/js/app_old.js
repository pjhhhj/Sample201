define(['angularAMD', 'angular-route'], function (angularAMD) {
  var app = angular.module("webapp", ['ngRoute']);
//  var app = angular.module("webapp", ['ui.router']);
  app.config(function ($routeProvider) {
    $routeProvider
      .when("/home", angularAMD.route({
//        templateUrl: 'login.view.html', controller: 'LoginCtrl', controllerUrl: 'controllers/login.controller'
        templateUrl: 'view_home.html', controller: 'HomeCtrl', controllerUrl: 'controllers/controller_home'
      }))
      .when("/view1", angularAMD.route({
        templateUrl: 'view_view1.html', controller: 'View1Ctrl', controllerUrl: 'controllers/controller_view1'
      }))
      .when("/view2", angularAMD.route({
        templateUrl: 'view_view2.html', controller: 'View2Ctrl', controllerUrl: 'controllers/controller_view2'
      }))
      .otherwise({redirectTo: "/home"});

//    app.config(function ($stateProvider, $urlRouterProvider) {
//      $urlRouterProvider.otherwise('/home');
//      $stateProvider
//        .state('home', {
//          url: '/home',
//          templateUrl: 'view_home.html',
//          controller: 'HomeCtrl'
//        })
  });



  return angularAMD.bootstrap(app);
});
