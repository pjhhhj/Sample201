define(['../app'], function(app){
  app.factory('Session', function($q){
    var sessionFactory = {};

    var sessionToken;
    var sessionInfo;
    var mobileDeviceToken;
    var sessionObject;
    var loading;

    var setIsLoading = function(value){
      if(value){
        this.loading = true;
      } else {
        this.loading = false;
      }
    }

    var isLoading = function(){
      return this.loading;
    }

    var setToken = function(token){
      this.sessionToken = token;
    }

    var getToken = function(){
      return this.sessionToken;
    }

    var setSessionInfo = function(session){
      this.sessionInfo = session;
    }

    var getSessionInfo = function(){
      return this.sessionInfo;
    }

    var setMobileDeviceToken = function(token){
      this.mobileDeviceToken = token;
    }

    var getMobileDeviceToken = function(){
      return this.mobileDeviceToken;
    }

    var setSessionobject = function(newSessionObject){
      var deferred = $q.defer();
      var promise = deferred.promise;

      deferred.resolve(this.sessionObject = newSessionObject);

      return promise;
    }

    var getSessionObject = function(){
      return this.sessionObject;
    }

    sessionFactory = {
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      setToken: setToken,
      getToken: getToken,
      setSessionInfo: setSessionInfo,
      getSessionInfo: getSessionInfo,
      setSessionObject: setSessionobject,
      getSessionObject: getSessionObject,
      setMobileDeviceToken: setMobileDeviceToken,
      getMobileDeviceToken: getMobileDeviceToken,
      test: 'testSession'
    };

    return sessionFactory;
  })
});