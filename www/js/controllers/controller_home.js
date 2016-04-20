define(['app', 'moment','function1', 'services/calc.service', 'factories/user.factory',
  'factories/session.factory', 'factories/login.factory', 'services/qauth.service', 'factories/vehicles.factory', 'constants/constant'],
  function (app, moment, function1, QAuth ) {

  app.controller('HomeCtrl', function ($scope, CalcService, appConfig, User, QAuth, Login) {
//    $scope.date = new moment();
//    alert(moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));

    $scope.title = "from home";

    $scope.message = "Message from HomeCtrl";
    $scope.message2 = CalcService.square(3);
    $scope.message3 = appConfig.clientName;
    $scope.message4 = User.user.Grade;
//    var response = Login.qAuth('test.user+1@hubio.com', 'password');
  });
}); 
