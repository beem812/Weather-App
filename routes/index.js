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
			request(options.host+options.path,googleReqCallback);
		}else{
			console.log(err);	
		}
	}
	//once google has returned the request data (the city name corresponding to the coordinates)
	//send the city name out to the weather api.
	function googleReqCallback (error, response, body){
		if(!error && response.statusCode == 200){
			var city = JSON.parse(body);
			console.log(city);
			req.mydata=city;
			res.send(req.mydata);
		}else{
			console.log("request error");
		}
	}
	//getting the api key from file and saving in to googleKey
	fs.readFile(filePath, {encoding: 'utf-8'},fileReadCallback);
};

module.exports = router;
