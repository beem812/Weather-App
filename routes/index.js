var express = require('express');
var router = express.Router();
var fs = require('fs');
var path=require('path');
var filePath = path.join(__dirname,'keyses.txt');
var qs = require('querystring');
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('weather', { title: 'Express' });
});

router.post('/key', keyPost);

function keyPost (req, res, next){
	var weatherKey="";
	var options={};
	function fileReadCallback(err,data){
		if (!err){
			console.log('received data: ' + data);
			weatherKey=data.toString();
			//within the file read callback defining the file path for the next http request
			options = {
				host: 'http://api.wunderground.com',
				path:'/api/'+weatherKey+'/geolookup/conditions/q/'+req.body.latitude+','+req.body.longitude+'.json'
			};
			console.log("here's the file path "+options.host+options.path)
			//making request to weather underground API which will use the coordinates from our 
			//front end request to get the closest city and return the weather information for it.
			request(options.host+options.path,responseBuilder);
		}else{
			console.log(err);	
		}
	}
	//
	//
	function responseBuilder (error, response, body){
		if(!error && response.statusCode == 200){
			var weatherJson = JSON.parse(body);
			console.log(weatherJson);
			req.mydata=weatherJson;
			res.send(req.mydata);
		}else{
			console.log("request error");
		}
	}
	//getting the api key from file and saving in to weatherKey
	//fileReadCallback uses the api key to make a request from Weather Underground API.
	fs.readFile(filePath, {encoding: 'utf-8'},fileReadCallback);
};

module.exports = router;
