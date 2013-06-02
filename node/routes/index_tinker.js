
/*
 * GET home page.
 */

var Helpers = require('../helpers')
   ,request = require('request')

exports.index = function(req1, res1){
//  res1.render('index', { title: "NodeJS" });

// Load the http module to create an http server.
// var http = require('http');
// var URL = "http://www.kayak.com/h/explore/api?airport=YYZ&v=1";

// var URL_OBJECT = require('url');

// var PARSED_URL = URL_OBJECT.parse(URL);

// 	var options = {
// 	  hostname: PARSED_URL.host,
// 	  port: 80,
// 	  path: PARSED_URL.path,
// 	  method: 'GET'
// 	};

// 	var req = http.request(options, function(res) {
// 	  console.log('STATUS: ' + res.statusCode);
// 	  console.log('HEADERS: ' + JSON.stringify(res.headers));
// 	  res.setEncoding('utf8');
// 	  res.on('data', function (chunk) {
// 	    console.log(chunk);
// 	  });
// 	  Helpers.sendResult(res, 'success');
// 	});

// 	req.on('error', function(e) {
// 	  console.log('problem with request: ' + e.message);
// 	  Helpers.sendError(res, 1001, e.message);
// 	});

// 	// write data to request body
// 	req.write('data');
// //	req.write('data\n');
// 	res1.render('index', { title: "OMG" });
// 	req.end();








// 	kayak_explore = function(sourceAirportCode, callback) {
// //	var	url = "http://www.kayak.com/h/explore/api?airport=" + sourceAirportCode + "&v=1"
// 	var	url = "http://www.kayak.com/h/explore/api?airport=YYZ&v=1"
// 	 ,	context = { args: arguments }; // callback context

// 	request(url, function(err, res, body) {
// 		if(err) callback.call(context, err);
// 		else {
// 			var body = JSON.parse(body);
// 			var status = checkStatus(body);

// 			if(!status.success) callback(status.error);
// 			else { 
// 				callback.call(context, null, body);
// 			}
// 		}
// 	});
// 	};

// 	exports.explore = function(req, res) {
// 	// respond immediately, this can be an async process
// 	Helpers.sendResult(res, 'success');

// 	kayak_explore(function(err, exporeData) {
// 		if(err) { 
// 			console.log('error running explore query');
// 			console.log(err);
// 		} else {
// 			console.log('success!');
// 			console.log(exporeData);
// 		}
// 	});
// 	};


var	url = "http://www.kayak.com/h/explore/api?airport=YYZ&v=1";

makeRequest(url, function(body){
// var results = [];
// var city = {};

for (i in body.destinations)
	{
		console.log(body.destinations[i]);
	}
res1.render('index', { body: JSON.stringify(body.destinations[0]) });
});



function makeRequest(url, callback) {
	// make network request
	request(url, function(err, res, body) {
		if(err) callback(err);
		else {
			var body = JSON.parse(body);
//			var status = checkStatus(body);

//			if(!status.success) callback(status.error);
//			else 
				callback(body);
		}
	});
}

// helper to check api call status
// function checkStatus(result) {
// 	if( result && 
// 		result.usage && 
// 		result.usage.status &&
// 		result.usage.status.toLowerCase().indexOf('fail') >= 0) 
// 	{
// 		return { success: false, error: result.usage.status };
// 	}
// 	return { success: true };
// }

};