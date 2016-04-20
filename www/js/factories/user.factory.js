define(['../app'],function(app){
  app.factory('User', function(Session){
    var userFactory = {};

    var user = {
      DrivenKM: 0,
      Grade: 'A+',
      Percentile: '25%',
      Devices: null,
      qauthUser: null
    };

    // TODO - this is stubbed - get this from telematics web service
    var userDrivingScores = {
      score: '100%',
      points: '103982',
      AccelerationScore: null,
      DistanceScore: null,
      BrakingScore: null,
      SpeedScore: null,
      UrbanScore: null,
      Grade: null,
      Discount: null,
      TotalScore: null
    }

    // Initialize the User data factory
    var init = function(){
      //TODO: Grabbing from session data for now - until we figure out where score data is coming from
      var scores = Session.getSessionObject().vehicles[0].extensionData.avivaScore
      userDrivingScores.AccelerationScore = scores.ACCELERATION_GRADE;
      userDrivingScores.SpeedScore = scores.SPEED_GRADE;
      userDrivingScores.BrakingScore = scores.BRAKING_GRADE;
      userDrivingScores.DistanceScore = scores.DISTANCE_GRADE;
      userDrivingScores.Grade = scores.SCORE_GRADE;
      userDrivingScores.TotalScore = scores.CURRENT_DRIVING_SCORE;
      userDrivingScores.Discount = scores.TOTAL_DRIVING_SCORE_DISCOUNT;

      // Set the user's devices
      user.Devices = Session.getSessionObject().devices;
    }

    // Set the current user in context to 'user' object
    var setUser = function(newUser){
      user.qauthUser = newUser;
    }

    // Get all the devices belonging to user
    var getDevices = function(deviceIdOnly){
      if(deviceIdOnly){
        var devicesArray = [];
        for (i=0;i<user.Devices.length;i++){
          devicesArray.push(user.Devices[i].imei);
        }
        return devicesArray;
      } else {
        return user.Devices;
      }
    }

    // Get the current user in context
    var getUser = function(){
      return user;
    }

    // Get the current users driving score data
    var getUserDrivingScores = function(){
      return userDrivingScores;
    }

    userFactory = {
      // Initialize User Factory
      init: init,

      // Properties
      user: user,
      userDrivingScores: userDrivingScores,

      // Setter / Getter functions
      setUser: setUser,
      getUser: getUser,
      getDevices: getDevices,
      getUserDrivingScores: getUserDrivingScores
    };

    return userFactory;
  })
});