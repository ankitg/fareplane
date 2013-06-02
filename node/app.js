
//////////////
// Main App //
//////////////

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , path = require('path')
  ,	Helpers = require('./helpers');
var app = express();

///////////////////
// Configuration //
///////////////////

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
else
{
  app.use(express.errorHandler());
}

////////////
// Routes //
////////////

// Static Route(s)
app.get('/', routes.index);
//app.get('/users', user.list);

//////////////////
// Start server //
//////////////////

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port " + app.get('port'));
});

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });
