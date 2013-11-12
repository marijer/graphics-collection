var path = require ("path"),
	_ = require ("underscore"),
	express = require ("express");


var app = express()
			.use (express.static (__dirname,
									path.join (__dirname, "bower_components"),
									path.join (__dirname, "js")))
			.use(express.bodyParser());


var db = [
	{ id: 1, name: "john", lastname: "check" },
	{ id: 2, name: "clease", lastname: "check" },
	{ id: 3, name: "dasds", lastname: "check" },
	{ id: 4, name: "dsdsa", lastname: "check" },
	{ id: 5, name: "dsfs", lastname: "check" },
	{ id: 6, name: "sdcfs", lastname: "check" },
	{ id: 7, name: "fsdf", lastname: "check" },
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