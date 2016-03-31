var express = require('express');
var router = express.Router();
var fs = require('fs');
var path=require('path');
var filePath = path.join(__dirname,'keyses.txt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('weather', { title: 'Express' });
});

router.get('/key', function(req, res, next){
	//var key=fs.readFileSync('./config', 'utf8');
	//res.send('poop');
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err){
    console.log('received data: ' + data);
    res.send(data);
    }else{
        console.log(err);
    }

	});
});

module.exports = router;
