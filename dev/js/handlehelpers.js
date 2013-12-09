
// converts date=20120802 to August, 2013
var m_names = new Array("January", "February", "March", "April", "May", 
	"June", "July", "August", "September", "October", "November", "December");

Handlebars.registerHelper("formatDate", function( date ) {
 	date = String( date );
 	var year = date.substring( 0, 4 );

 	var month = date.substring(4, 6);
 	month = month.replace(/^0+/, '');  // regex removes leading zero's
 	var f_month = m_names[month - 1];	// set month zero based

  	return f_month + ", " + year;
});


/* Image path options
	http://marijerooze.nl/thesis/graphics/images/guardian/guardian_australiaElections2013.jpg
	http://marijerooze.nl/thesis/graphics/images/nytimes/nytimes_economytwistandturns.jpg
*/

Handlebars.registerHelper("getImgPath", function( data ) {
	var img = data.thumbnail,
		newspaper = data.newspaper === "Guardian" ? "guardian" : "nytimes";

	var imgPath	= "http://marijerooze.nl/thesis/graphics/images/" + newspaper + "/"+ img;
  	return imgPath;
});

// sets correct class on title which has the favicon in css 
Handlebars.registerHelper("setFavicon", function( data ) {
	var faviconClass = data === "Guardian" ? 'gua' : 'nyt'
	faviconClass+= " favicon";
	return faviconClass;
})

Handlebars.registerHelper("setRightFacet", function(param1, param2) {
	var sel;

	if (param1.independent) { // if param1 is independent, every individual item contains a facet
		sel = param2.facet; 
	} else {
		sel = param1.facet;
	}

	return sel.toLowerCase();
})


Handlebars.registerHelper("setSelected", function(param1, param2) {
	sel = param1.selection === param2 ? "selected" : "";

	return sel;
})


// set filters by default collapsed or expanded
Handlebars.registerHelper("isExpanded", function(param) {
	var expanded = param ? "expanded" : "collapsed";

	return expanded;
})




