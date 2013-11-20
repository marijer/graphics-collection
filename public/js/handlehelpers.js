var m_names = new Array("January", "February", "March", "April", "May", 
	"June", "July", "August", "September", "October", "November", "December");

Handlebars.registerHelper("formatDate", function( date ) {
 	date = String( date );
 	var year = date.substring( 0, 4 );

 	var month = date.substring(4, 6);
 	month = month.replace(/^0+/, '');  // regex removes leading zero's
 	var f_month = m_names[month - 1];	// set month zero based

  	return f_month + " " + year;
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

