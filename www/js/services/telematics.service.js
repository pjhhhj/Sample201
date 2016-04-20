define(['../app'], function(app){
  // Service for connecting to the Telematics API.
  app.service('Telematics', function($http, $q, appConfig, QAuth, User, Session){
    var headers;

    var diagnostics = function(func,httpMethod,payload){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(['dtc','battery'].indexOf(func)!=-1){
        func = "/" + func;
      } else {
        deferred.reject("Function: " + func + "Not Implemented");
      }

      if(httpMethod == 'POST'){
        var requestBody = {"IMEIs":payload};
        sendRequest(deferred,httpMethod,'Diagnostics' + func,requestBody);
      } else {
        sendRequest(deferred,httpMethod,'Diagnostics' + func,null);
      }

      return promise;
    }

    /**
     * Fuel Economy - function to retrieve vehicle efficiency data
     * @httpMethod - GET,POST
     * @Period - Daily,Weekly,Monthly
     * @Devices - array of IMEI devices ex: ["353816050926213","35381605000000"]
     * @StartDate - Get fuel economy starting from this date MM/DD/YY ex: 01/15/15
     * @EndDate - Get fuel economy ending on this date MM/DD/YY ex: 01/15/16
     */
    var fuelEconomy = function(httpMethod,Period,Devices,StartDate,EndDate){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(httpMethod == 'POST'){

        var requestBody = {
          "Period":Period,
          "IMEIs":Devices,
          "startDate":StartDate
          //TODO:  Figure out why specifying end date returns no results
          //"endDate":EndDate
        };

        sendRequest(deferred,httpMethod,'FuelEconomy',requestBody);
      } else {
        sendRequest(deferred,httpMethod,'FuelEconomy',null);
      }

      return promise;
    }

    var journeys = function(func,httpMethod,payload,startDate,endDate){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(['lastest'].indexOf(func)!=-1){
        func = "/" + func;
      } else if(func == null || func == '') {
        func = '';
      } else {
        deferred.reject("Function: " + func + "Not Implemented");
      }

      if(httpMethod == 'POST'){
        var requestBody = {"IMEIs":payload,"startDate":startDate,"endDate":endDate};
        sendRequest(deferred,httpMethod,'Journeys'+func,requestBody);
      } else {
        sendRequest(deferred,httpMethod,'Journeys'+func,null);
      }

      return promise;
    }

    var location = function(httpMethod,payload){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(httpMethod == 'POST'){
        var requestBody = {"IMEIs":payload};
        sendRequest(deferred,httpMethod,'Location',requestBody);
      } else {
        sendRequest(deferred,httpMethod,'Location',null);
      }

      return promise;
    }

    var poi = function(httpMethod,payload){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(httpMethod == 'POST'){
        var requestBody = {"IMEIs":payload};
        sendRequest(deferred,httpMethod,'Poi',requestBody);
      } else {
        sendRequest(deferred,httpMethod,'Poi',null);
      }

      return promise;
    }

    var score = function(func,httpMethod,payload){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(['Summary'].indexOf(func)!=-1){
        func = "/" + func;
      } else {
        deferred.reject("Function: " + func + "Not Implemented");
      }

      if(httpMethod == 'POST'){
        var requestBody = {"IMEIs":payload};
        sendRequest(deferred,httpMethod,'Score'+func,requestBody);
      } else {
        sendRequest(deferred,httpMethod,'Score'+func,null);
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
      //Refresh token before calling telematics API:
      QAuth.token('POST',null,null,null,true).then(function success(response){
        setHeaders();
        $http({
          method: httpMethod,
          url: appConfig.telematicsService + serviceMethod,
          headers: headers,
          data: body
        }).then(function success(response){
          q.resolve(response.data);
        },function error(response){
          q.reject(response.data);
        });
      }, function error(response){
        q.reject(response);
      });
    }

    return {
      diagnostics: diagnostics,
      fuelEconomy: fuelEconomy,
      journeys: journeys,
      location: location,
      poi: poi,
      score: score
    }
  })
})
