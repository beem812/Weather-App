var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('weather', { title: 'Express' });
});

router.get('/key', function(req, res, next){
	fs.readFile('config', (err, data)=>{
		if (err){
			console.log('shits broke yo');
		};
		res.send('poop');
	});
	
});

module.exports = router;
