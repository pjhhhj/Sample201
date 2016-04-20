define(['app', 'function1', 'moment'], function (app, function1, moment ) {
  alert(moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));
  function1('tom');
  app.controller('View2Ctrl', function ($scope) {
    $scope.message = "Message from View1Ctrl";
  });
});
