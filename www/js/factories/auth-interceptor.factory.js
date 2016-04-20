define(['../app'],function(app) {
  app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    var authInterceptorFactory = {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized
        }[response.status], response);
        return $q.reject(response);
      }
    }

    return authInterceptorFactory;
  })

  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
})
