
/*
 * GET home page.
 */

var Helpers = require('../helpers')
   ,request = require('request')
   ,mongoose = require('mongoose');


exports.index = function(req1, res1){

var	url = "http://www.kayak.com/h/explore/api?airport=YYZ&v=1";

var explore = makeRequest(url, function(body){
	res1.render('index', { body: "Powered by NodeJS" });
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
  		// yay!
  		console.log(db);
	});

	return (body);
});

function makeRequest(url, callback) {
	// make network request
	request(url, function(err, res, body) {
		if(err) callback(err);
		else {
			var body = JSON.parse(body);

			if(!err && res.statusCode == 200) 
				callback(body);
			else 
				callback(err);
		}
	});
}

};