// sends a json result to client
module.exports.sendResult = function(res, data) {
	var apiResponse = {};
	apiResponse.meta = { code: 200 };
	apiResponse.response = data;

	res.send(apiResponse);
};


// sends and error json to client
module.exports.sendError = function(res, code, message) {

	// log error message
	console.log('error code: ' + code + ' message: ' + message);

	// build and send api response
	var apiResponse = {};
	apiResponse.meta = { code: code };
	apiResponse.error = message;

	res.send(apiResponse);
};


// get the extension from a file path or url
module.exports.getExtension = function(path) {
	var start = path.lastIndexOf('.');
	if(start >= path.length - 5) {
		return path.substring(start + 1).toLowerCase();
	}
	return '';
};