var app = angular.module('Weather',['ui.router']);

app.factory('WeatherGetter', function($http){
	var obj = {};
	obj.getLoc = function(){
		return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
	}
	return obj;
});

app.controller('WeatherCtrl',['$scope','$http',function($scope,$http){
	
	$http.get("http://api.icndb.com/jokes/random").then(function(response){
		$scope.test=response;
	});
}]);