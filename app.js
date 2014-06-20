var path     = require ("path"),
	_        = require ("underscore"),
	express  = require ("express"),
	request  = require('request'),
	http     = require('http');

var fs = require('fs');

var app = express()
			.use (express.static (__dirname,
									path.join (__dirname, "bower_components"),
									path.join (__dirname, "js")))
			.use(express.bodyParser());

var object_json, facet_json;

//var dataPath = 'http://marijerooze.nl/thesis/graphics/API/';

request('http://marijerooze.nl/thesis/graphics/API/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    object_json = body;
  }
})

app.get("/graphics", function( req, res ) {
	res.send( object_json );
});

function getFacets( fn ) {
	var file = __dirname + '/dev/data/facets.json';

	fs.readFile(file, function (error, data) {
	  if (!error) {

	  	var d = createCreditFacet( object_json );
	  	data = JSON.parse(data);
	  	data.facets[data.facets.length] = d;
	   fn( data );
	  }
	})
}

app.get('/facets', function( req, res ) {
	var f = getFacets( function( f ) {
		res.send( f );
	});
});


function createCreditFacet( data ) {
  var index = {
  		facet: 'credits',
  		heading: 'Byline',
  		expanded: false,
  		options	: []
  };

  data = JSON.parse(data)

  var temp = {};

	for (var i = 0; i < data.length; i++ ){
		var arr = countWords(data[i].credits, temp);
	}

	Object.keys( temp ).forEach(function(key) {
	   	var obj = {
			value: key,
			title: key + ' - ' + temp[key],
			count: temp[key]
		}
		index.options[index.options.length] = obj;
	});

	index.options.sort(function(a, b) {return b.count - a.count})

	return index;
}
// 

function countWords(sentence, index) {
    var words = sentence
              .replace(/[?!()"*]/g, " ")
              .toLowerCase()
              .split(/([,;])/);
              
    words.forEach(function ( word ) {
    	word = word.trim();
    	if (word === ',' || word === '-') return false;
        if (!index.hasOwnProperty( word )) index[word] = 0;
        index[word]++;
    });

    return index;
}


var port = process.env.PORT || 2020;  // process.env.PORT is a Heroku setting
app.listen( port );
console.log ( "Started server on port: " + port );