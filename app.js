var path = require ("path"),
	_ = require ("underscore"),
	express = require ("express");


var app = express()
			.use (express.static (__dirname,
									path.join (__dirname, "bower_components"),
									path.join (__dirname, "js")))
			.use(express.bodyParser());


var db = [
	{ id: 1, name: "john" }
];

var id = _.max (db, function () { return db.id; }).id;


app.get ("/hello", function ( req, res ) {
//	res.json 
	res.send ("Hello World!");
});


app.get ("/users", function ( req, res ) {
	res.json( db );
});


app.post ("/users", function ( req, res ) {
	db.push (req.body);
	res.end();
	//console.log (req.body);
});


var port = process.env.PORT || 2020;  // process.env.PORT is a Heroku setting
app.listen( port );
console.log ( "Started server on port: " + port );