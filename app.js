var path     = require ("path"),
	_        = require ("underscore"),
	express  = require ("express"),
	request  = require('request'),
	http     = require('http');

var app = express()
			.use (express.static (__dirname,
									path.join (__dirname, "bower_components"),
									path.join (__dirname, "js")))
			.use(express.bodyParser());

var object_json;

//var dataPath = 'http://marijerooze.nl/thesis/graphics/API/';

request('http://marijerooze.nl/thesis/graphics/API/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    object_json = body;
  }
})

app.get ("/graphics", function( req, res ) {
	res.send( object_json );
});


var port = process.env.PORT || 2020;  // process.env.PORT is a Heroku setting
app.listen( port );
console.log ( "Started server on port: " + port );