define(['../app'],function(app){
  app.factory('Login', function($q, appConfig, QAuth, User, Session, Vehicles){
    var loginFactory = {};

    var LOCAL_TOKEN_KEY = '';
    var username = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;

    var serverLogin = function(name, password) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      QAuth.token('POST',appConfig.clientName,name,password,false).then(function authSuccess(response){
        User.setUser(response.data);
        Session.setSessionInfo(response.data.identity.sessionInfo);
        QAuth.session('GET').then(function sessionSuccess(response) {
          Session.setSessionObject(response.data).then(function success(response){
            // Initialize Data Factories
            Vehicles.init();
            User.init();
            deferred.resolve('Login Successful!')
          })

        },function sessionFailed(response){
          deferred.reject(response.metaData.messages[0].text);
        })
      },function authFailed(response){
        deferred.reject(response.metaData.messages[0].text);
      })

      return promise;
    }

    var logout = function() {
      username = '';
      isAutheticated = false;
      //$http.defaults.headers.common['qToken'] = undefined;
      window.localStorage.removeItem('LOCAL_TOKEN_KEY');
    }


    loginFactory = {
      qAuth: serverLogin,
      logout: logout,
      test: 'test',
      isAuthenticated : isAuthenticated,
      username: function() {return username;}
    };

    return loginFactory;
  })
});