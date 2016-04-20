define(['app'], function (app) {

//  function1('tom');
    app.controller('View1Ctrl', function ($scope) {
      $scope.title = "from other";
      $scope.message = "Message from View1Ctrl";
    });
}); 
