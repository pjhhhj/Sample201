define(['../app', 'moment', '../services/telematics.service'],function(app, moment) {
// Vehicle factory - all information relating to vehicle should be factored into here.
  app.factory('Vehicles', function ($q, Telematics, QAuth, Session, User) {
//    app.factory('Vehicles', function ($q, moment, Telematics, QAuth, Session, User) {
//    alert(moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));

    // All Vehicles
    var vehicles = null;
//
    // Selected Vehicle Properties
    var selectedVehicleIndex = null;
    var selectedVehicle = null
    var dtc_codes = null;
    var battery_health = null;
    var fuel_economy_period = null;
    var fuel_economy_interval = null;
    var fuel_economy = null;
    var journeys = null;


    // Initialize the Vehicles data factory
    var init = function () {
      vehicles = Session.getSessionObject().vehicles;
      setVehicle(0);
      setBattery();
      setDTC();
      // TODO:  Make this selectable
      setFuelEconomy(12);
      setFuelEconomyPeriod('Daily');
      setJourneys();
    }

    /** Set / Get functions for Vehicle - all functions should return pointers for selected vehicle only **/

    // Call Telematics service and Refresh the battery_health property
    var setBattery = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;

      vehicle_imei = selectedVehicle.imei;

      Telematics.diagnostics('battery', 'POST', [vehicle_imei]).then(
        function (response) {
          battery_health = response.data;
          deferred.resolve("Set battery health for: " + vehicle_imei + " success!");
        }, function (response) {
          deferred.reject(response);
        }
      )
      return promise;
    }

    // Get battery_health property for selected vehicle
    var getBattery = function () {
      return battery_health;
    }

    // Call Telematics service and Refresh the dtc_codes property
    var setDTC = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;

      vehicle_imei = selectedVehicle.imei;

      Telematics.diagnostics('dtc', 'POST', [vehicle_imei]).then(
        function (response) {
          dtc_codes = response.data;
          deferred.resolve("Set DTC codes for: " + vehicle_imei + " success!");
        }, function (response) {
          deferred.reject(response);
        }
      )
      return promise;
    }

    // Get dtc_codes property for selected vehicle
    var getDTC = function () {
      return dtc_codes;
    }

    // Set the selected vehicle to the specified index of the vehicles object
    var setVehicle = function (index) {
      selectedVehicleIndex = index;
      selectedVehicle = vehicles[index]
    }

    // Returns vehicle by either vehicleId, vin or IMEI
    var getVehicle = function () {
      return selectedVehicle;
    }

    // Returns the currently selected fuel economy interval
    var getFuelEconomyInterval = function () {
      return fuel_economy_interval;
    }

    var getFuelEconomyPeriod = function () {
      return fuel_economy_period;
    }

    var setFuelEconomyPeriod = function (Period) {
      if (['Daily', 'Weekly', 'Monthly'].indexOf(Period) != -1) {
        fuel_economy_period = Period;
      } else {
        fuel_economy_period = null;
      }
    }

    // Call Telematics service and Refresh the fuel_economy properties
    // @interval in months- 1, 3 or 12
    var setFuelEconomy = function (interval) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var startDate;
      var endDate = moment();

      fuel_economy_interval = interval;

      if (interval == 1) {
        startDate = endDate.subtract(1, 'months');
      } else if (interval == 3) {
        startDate = endDate.subtract(3, 'months');
      } else if (interval == 12) {
        startDate = endDate.subtract(1, 'years');
      } else {
        fuel_economy_interval = null;
        deferred.reject('Invalid Interval.');
      }

      vehicle_fuel_econ = fuel_economy = [];
      vehicle_imei = selectedVehicle.imei;

      Telematics.fuelEconomy('POST', 'Daily', [vehicle_imei], startDate.format('MM/DD/YY'), endDate.format('MM/DD/YY')).then(function (response) {
        vehicle_fuel_econ.push({"Period": "Daily", "Data": response.data[0]});
        Telematics.fuelEconomy('POST', 'Weekly', [vehicle_imei], startDate.format('MM/DD/YY'), endDate.format('MM/DD/YY')).then(function (response) {
          vehicle_fuel_econ.push({"Period": "Weekly", "Data": response.data[0]});
          Telematics.fuelEconomy('POST', 'Monthly', [vehicle_imei], startDate.format('MM/DD/YY'), endDate.format('MM/DD/YY')).then(function (response) {
            vehicle_fuel_econ.push({"Period": "Monthly", "Data": response.data[0]});
            deferred.resolve("Set Fuel Economy Success!");
          }, function (response) {
            deferred.reject(response);
          })
        }, function (response) {
          deferred.reject(response);
        })
      }, function (response) {
        deferred.reject(response);
      });

      return promise;
    }

    // Get Fuel Economy
    var getFuelEconomy = function () {
      return fuel_economy;
    }

    // Set the Vehicle Journeys
    var setJourneys = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;

      vehicle_imei = selectedVehicle.imei;

      Telematics.journeys('', 'POST', [vehicle_imei], "2016-01-01T11:10:25.6973379-04:00", "2016-04-01T11:10:25.6973379-04:00").then(
        function (response) {
          if (response.data.length > 0) {
            journeys = response.data[0].journeys;
          }
          deferred.resolve("Set journeys for: " + vehicle_imei + " success!");
        }, function (response) {
          deferred.reject(response);
        }
      )
      return promise;
    }

    // Returns vehicle by either vehicleId, vin or IMEI
    var getJourneys = function () {
      return journeys;
    }

    // Get the vehicle english name by vehicle ID, VIN or IMEI device
    var getVehicleName = function () {
      return selectedVehicle.year + ' ' + selectedVehicle.make + ' ' + selectedVehicle.model;
    }

    var vehiclesFactory = {
      // Initialize Vehicle Function
      init: init,

      // Vehicle Factory Properties
      vehicles: vehicles,
      selectedVehicle: selectedVehicle,
      selectedVehicleIndex: selectedVehicleIndex,
      battery_health: battery_health,
      dtc_codes: dtc_codes,
      fuel_economy_period: fuel_economy_period,
      fuel_economy_interval: fuel_economy_interval,
      fuel_economy: fuel_economy,
      journeys: journeys,

      // Setter / Getter Functions
      setBattery: setBattery,
      getBattery: getBattery,
      setDTC: setDTC,
      getDTC: getDTC,
      setFuelEconomy: setFuelEconomy,
      getFuelEconomy: getFuelEconomy,
      getFuelEconomyPeriod: getFuelEconomyPeriod,
      setFuelEconomyPeriod: setFuelEconomyPeriod,
      getFuelEconomyInterval: getFuelEconomyInterval,
      setJourneys: setJourneys,
      getJourneys: getJourneys,
      setVehicle: setVehicle,
      getVehicle: getVehicle,
      getVehicleName: getVehicleName
    };

    return vehiclesFactory;
  })
})