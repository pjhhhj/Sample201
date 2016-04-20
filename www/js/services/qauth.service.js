define(['../app', '../factories/user.factory', '../factories/session.factory', '../constants/constant'], function(app){
  app.service('QAuth', function($http, $q, appConfig, User, Session){
    var headers;
    var token = function(httpMethod,clientName,email,password,refresh){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(httpMethod == 'POST'){
        var requestBody = {
          clientName : clientName,
          email : email,
          password : password
        }
        if(refresh){
          sendRequest(deferred,httpMethod,'Token/refresh',null);
        } else {
          sendRequest(deferred,httpMethod,'Token',requestBody);
        }
      } else {
        sendRequest(deferred,httpMethod,'Token',null);
      }

      return promise;
    }

    var session = function(httpMethod){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(httpMethod == 'GET'){
        sendRequest(deferred,httpMethod,'Session',null);
      } else {
        deferred.reject('Method not implemented')
      }

      return promise;
    }

    var vehicle = function(httpMethod){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(httpMethod == 'GET'){
        sendRequest(deferred,httpMethod,'Vehicle',null);
      } else {
        deferred.reject('Method not implemented')
      }

      return promise;
    }

    function setHeaders(){
      var token = Session.getToken();
      if(token){
        headers = {qToken: token};
      } else {
        headers = {}
      }
    }

    function sendRequest(q,httpMethod,serviceMethod,body){
      setHeaders();
      $http({
        method: httpMethod,
        url: appConfig.qAuthService + serviceMethod,
        headers: headers,
        data: body
      }).then(function success(response){
        // Refresh the token if a new token has been provided
        if(response.data.metaData != null &&  response.data.metaData != undefined){
          Session.setToken(response.data.metaData.qToken);
        }
        q.resolve(response.data);
      },function error(response){
        q.reject(response.data);
      });
    }

    return {
      token: token,
      session: session,
      vehicle: vehicle,
      test: 'test'
    }
  });
});