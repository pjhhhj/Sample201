define(['app', 'moment','function1', 'services/calc.service', 'factories/user.factory',
    'factories/session.factory', 'factories/login.factory', 'services/qauth.service', 'factories/vehicles.factory', 'constants/constant'],
  function (app, moment, function1, QAuth ) {
    app.controller('LoginCtrl', function ($scope, Login, $q, $state, $location) {
//      app.controller('LoginCtrl', function ($scope, Login, $ionicPopup, $state, $ionicSideMenuDelegate, $q) {
//    $scope.date = new moment();
//    alert(moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));

      //Disable opening of side menu
//      $ionicSideMenuDelegate.canDragContent(false);

      $scope.data = {};

      $scope.qauth = function() {
        Login.qAuth($scope.data.username, $scope.data.password).then(function(data) {
//          $ionicSideMenuDelegate.canDragContent(true);
//          $state.go('default');
          $location.path('/View1');
          alert('success');
        },function(data) {
            alert('fail');
//          var alertPopup = $ionicPopup.alert({
//            title: 'Login failed!',
//            template: 'Please check your credentials!'
//          });
        });
      }
    });
  });
