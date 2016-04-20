define(['../app'],function(app) {
// Device factory - all information pertaining to data retrieved from the mobile device should be factored into here.
  app.factory('Device', function ($q, $cordovaGeolocation) {

    var deviceFactory = {};
    var device;
    device = {
      location: null
    }

    var getDevice = function () {
      return device;
    }

    var getLocation = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var thisDevice = device;

      if (thisDevice.location == null) {
        setLocation().then(
          function (response) {
            deferred.resolve(device.location);
          }, function (response) {
            deferred.reject(response);
          }
        )
      } else {
        deferred.resolve(device.location);
      }

      return promise;
    }

    var setLocation = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var thisDevice = device;
      var posOptions = { timeout: 10000, enableHighAccuracy: false };
      var currentLat = null;
      var currentLong = null;

      $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(function (position) {

          thisDevice.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          deferred.resolve('Success!')
        },
        function (response) {
          deferred.reject('Error getting location');
        });

      return promise;
    }

    deviceFactory = {
      // Properties
      device: device,

      // Setter / Getter functions
      getDevice: getDevice,
      setLocation: setLocation,
      getLocation: getLocation
    }

    return deviceFactory;
  })
})