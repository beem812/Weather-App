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

router.post('/key', function(req, res, next){
	var googleKey="";
	var options={};
	function fileReadCallback(err,data){
		if (!err){
			console.log('received data: ' + data);
			googleKey=data.toString();
			//within the file read callback defining the file path for the next http request
			options = {
				host: 'https://maps.googleapis.com',
				path:'/maps/api/geocode/json?latlng='+req.body.latitude+','+req.body.longitude+'&key='+googleKey
			};
			
			request(options.host+options.path,function(error, response, body){
				if(!error && response.statusCode == 200){
					var city = JSON.parse(body);
					console.log(city.results[0].address_components[2].long_name);
					req.mydata=city.results[0].address_components[2].long_name;
					res.send(req.mydata);
				}
			});
		}else{
			console.log(err);	
		}
	}
	
	//getting the api key from file and saving in to googleKey
	fs.readFile(filePath, {encoding: 'utf-8'},fileReadCallback);
	console.log("logging some bullshit"+req.mydata);
	
});

module.exports = router;
