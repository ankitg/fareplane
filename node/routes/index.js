
/*
 * GET home page.
 */

exports.index = function(req1, res1){
  res1.render('index', { title: "chunk" });


  // Load the http module to create an http server.
var http = require('http');
var URL = "http://www.kayak.com/h/explore/api?airport=YYZ&v=1";

var URL_OBJECT = require('url');



// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  // response.writeHead(200, {"Content-Type": "text/plain"});
  // response.end("Hello World\n");

var options = URL_OBJECT.parse(URL);

	var options = {
	  hostname: options.host,
	  port: 80,
	  path: options.path,
	  method: 'GET'
	};


	var req = http.request(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    console.log(chunk);
	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write('data\n');
	req.write('data\n');
	req.end();
});


// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");

};