var app = angular.module('Weather',[]);

app.factory('WeatherGetter', function($http){
	var obj = {};
	obj.getLoc = function(){
		return navigator.geolocation;
	};
	obj.getKey = function(){
		$http.get('/key').then(function successCallback(response){
			console.log(response);
			return response;
		}, function errCallback(response){
			console.log('my api call failed');
		});
	};
	return obj;
});

app.controller('WeatherCtrl',['$scope','$http','WeatherGetter', function($scope,$http, WeatherGetter){
	
	WeatherGetter.getLoc();
	WeatherGetter.getKey();
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	
	function success(pos){
		var crd=pos.coords;
		
		console.log(pos);
	};
	function error(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	};
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error, options);
	}
	else {
		console.log('Geolocation is not supported for this Browser/OS version yet.');
	}
	
}]);