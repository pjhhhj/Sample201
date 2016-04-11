define(['../app','../function1', '../service/UserService'], function (app, function1, CalcService) {

  app.controller('HomeCtrl', function ($scope, CalcService) {
    $scope.message = "Message from HomeCtrl";
    $scope.message2 = CalcService.square(3);
  });
}); 
