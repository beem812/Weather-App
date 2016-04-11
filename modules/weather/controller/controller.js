var app = angular.module('Weather',[]);

app.factory('WeatherGetter', function($http, $q, $rootScope){

	var obj = {};
	
	obj.getLoc = function(){
		//options for navigator.geolocation.getCurrentPosition
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};
		
		// creating a $q defer to allow the use of a call back once getLoc is returned to the controller
		var deferred = $q.defer();
		
		//call back from httpPost, saves the received city name in to 
		// the deferred promise for use back in the controller.
		function successCallback(response){
			var cityName=response.data;
			console.log("this is the top end"+cityName);
			deferred.resolve(cityName);
		};//end successCallback
		
		//error call back from httpPost
		function errCallback(response){
			console.log('my api call failed');
		};//end errCallback
		
		//post function called to get the city name from google reverse geocoding api
		//goes through our server first to get google api key.
		function httpPost(data) {
			$http.post('/key',data).then(successCallback, errCallback);
		};
		
		//success function called when navigator.geolocation.getCurrentPosition resolves
		//the pos variable is the geolocation data from the browser.
		function success(pos){
			var crd=pos.coords;
			console.log("logging in getLoc"+crd);
			var data = {
				longitude: crd.longitude,
				latitude: crd.latitude
			};
			
			httpPost(data);//sending the coordinate data to an http post request
		};//end success function
		
		//error function called if navigator.geolocation.getCurrentPosition fails
		function error(err) {
			return console.warn('ERROR(' + err.code + '): ' + err.message);
		};//end error function
		
		//checking if there's access to browser location information
		//if successful navigator.geolocation.getCurrentPosition gets the coordinates
		//and sets off the chain of call backs, this is the first step.
		//calls function success if the coordinates are available
		if (navigator.geolocation) {
			var geoLoc=navigator.geolocation.getCurrentPosition(success, error, options);
			console.log("logging geoLoc "+geoLoc)
			
		}//end navigator.geolocation if statement
		else { //else statement reports if geolocation is not supported
			return console.log('Geolocation is not supported for this Browser/OS version yet.');
		}//end navigator.geolocation else statement
		
		//returns an asynchronus promise that can be dealt with when the above
		//callback chain is done.
		return deferred.promise;
	};//end obj.getLoc
	
	return obj;
});

app.controller('WeatherCtrl',['$scope','$http','WeatherGetter', function($scope,$http, WeatherGetter){
	//mapping weather icons from https://erikflowers.github.io/weather-icons/ to 
	//the weather icon names coming in from weather underground JSON
	var iconVals={
		chanceflurries: "wi-day-snow",
		chancerain: "wi-day-showers",
		chancesleet: "wi-day-sleet",
		chancesnow: "wi-day-snow-wind",
		chancetstorms: "wi-day-storm-showers",
		clear: "wi-day-sunny",
		cloudy: "wi-cloudy",
		flurries: "wi-snow",
		fog: "wi-fog",
		hazy: "wi-day-haze",
		mostlycloudy: "wi-day-cloudy",
		mostlysunny: "wi-day-cloudy",
		partlycloudy: "wi-day-cloudy",
		partlysunny: "wi-day-cloudy",
		sleet: "wi-sleet",
		rain: "wi-rain",
		snow: "wi-snow",
		sunny: "wi-day-sunny",
		tstorms: "wi-day-thunderstorm"
	}; 
	WeatherGetter.getLoc().then(function(result){
		$scope.city = result.location.city;
		$scope.condition = result.current_observation.weather;
		$scope.temperature = result.current_observation.temp_f;
		//dynamically setting weather icon based on the icon name from the weather data
		$scope.icon = iconVals[result.current_observation.icon];
		//console.log("checking that i got the weather back "+JSON.stringify($scope.city));
	});
	
	

	
}]);