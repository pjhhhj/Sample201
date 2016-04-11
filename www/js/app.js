define(['angularAMD', 'angular-route'], function (angularAMD) {
  var app = angular.module("webapp", ['ngRoute']);
  app.config(function ($routeProvider) {
    $routeProvider
      .when("/home", angularAMD.route({
        templateUrl: 'view_home.html', controller: 'HomeCtrl', controllerUrl: 'controller/controller_home'
      }))
      .when("/view1", angularAMD.route({
        templateUrl: 'view_view1.html', controller: 'View1Ctrl', controllerUrl: 'controller/controller_view1'
      }))
      .otherwise({redirectTo: "/home"});
  });



  return angularAMD.bootstrap(app);
});
