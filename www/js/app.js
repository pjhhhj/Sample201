define(['angularAMD', 'angular-route', 'uiRouter'], function (angularAMD) {
  var app = angular.module("webapp", ['ngRoute', 'ui.router']);
//  var app = angular.module("webapp", ['ui.router']);

  var controllerNameByParams = function($stateParams)
  {
    // naive example of dynamic controller name mining
    // from incoming state params

    var controller = "HomeCtrl";

    if ($stateParams.id == "login") {
      controller = "HomeCtrl";
    }
    else if ($stateParams.id != null) {
      controller = $stateParams.id + "Ctrl";
    }

    return controller;
  }

  app.config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider)
    {
      $stateProvider
        .state("default", angularAMD.route({
          url: "/{id}",
            templateUrl: function($stateParams){
            return $stateParams.id + '.view.html';
          },
          resolve: {
            loadController: ['$q', '$stateParams',
              function ($q, $stateParams)
              {
                // get the controller name === here as a path to Controller_Name.js
                // which is set in main.js path {}
                var controllerName = controllerNameByParams($stateParams);

                var deferred = $q.defer();
                require([controllerName], function () { deferred.resolve(); });
                return deferred.promise;
              }]
          },
          controllerProvider: function ($stateParams)
          {
            // get the controller name === here as a dynamic controller Name
            var controllerName = controllerNameByParams($stateParams);
            return controllerName;
          },
        }));

      $urlRouterProvider
        .otherwise("/Home");
    }
  ]);


  return angularAMD.bootstrap(app);
});
