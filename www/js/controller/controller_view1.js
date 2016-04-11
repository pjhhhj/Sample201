define(['../app', '../function1'], function (app, function1) {

  function1('tom');
    app.controller('View1Ctrl', function ($scope) {
        $scope.message = "Message from View1Ctrl"; 
    });
}); 
