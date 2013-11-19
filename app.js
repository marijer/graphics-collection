var path     = require ("path"),
	 _        = require ("underscore"),
	 express  = require ("express"),
	 mysql    = require('mysql'),
	 http     = require('http');

var app = express()
			.use (express.static (__dirname,
									path.join (__dirname, "bower_components"),
									path.join (__dirname, "js")))
			.use(express.bodyParser());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'node_test',
  password : 'node_test1',
  database : 'thesis'
});

var object_json;

	connection.connect();

	connection.query('SELECT * from graphics LIMIT 40', function(err, rows, fields) {
	  if (err) throw err;

	 // console.log('first data row: ', rows[0]);
	   object_json = rows;
	});

	connection.end();

app.get ("/graphics", function( req, res ) {
	res.json ( object_json );
});


var port = process.env.PORT || 2020;  // process.env.PORT is a Heroku setting
app.listen( port );
console.log ( "Started server on port: " + port );