var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname,'keyses.txt');
var qs = require('querystring');
var request = require('request');
//var mongoose = require('mongoose');
//connect to mongodb
//mongoose.connect('mongodb://localhost/btc')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/key', keyPost);
/*
 * keypost function called when the weather app page is loaded
 * it takes a location gotten from the front end and sends it to
 * weather underground to get the weather in their area.
 */
function keyPost (req, res, next){
	var options={};
	
	//callback from the weather request, dumps the entire message body into the response,
	//could probably filter just what I want to make the message smaller 
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
	//setting up the weather request with an environment variable api key.
	options = {
		host: 'http://api.wunderground.com',
		path:'/api/'+process.env.weatherKey+'/geolookup/conditions/q/'+req.body.latitude+','+req.body.longitude+'.json'
	};
	console.log(process.env.weatherKey);
	//sending weather request and calling response builder to send weather 
	//data to front end.
	request(options.host+options.path,responseBuilder);
};

module.exports = router;
