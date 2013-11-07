var path = require ("path");
var express = require ("express");
var app = express()
			.use (express.static (__dirname,
									path.join (__dirname, "bower_components"),
									path.join (__dirname, "js")));




app.get ("/hello", function ( req, res ) {
	res.send ("Hello World!");
});

var port = process.env.PORT || 3000;  // process.env.PORT is a Heroku setting
app.listen( port );
console.log ( port );