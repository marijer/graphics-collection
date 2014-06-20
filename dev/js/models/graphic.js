APP.Graphic = Backbone.Model.extend ({
	defaults: {
		id: "",
		title: "undefined",
		date: "unknown",
		source: "unknown",
		creators: "unknown",
		favorite: false,
		thumbnail:"public/img/graphics/test.jpg",
		news_type: "unknown",
		annotation: "unknown",
		flash: "unknown"
	},

	// rewrite of database values
	parse: function( response ){
		paper = response.newspaper;
		newscategory = response.newscategory;
		
		if (paper == "guardian") response.newspaper = "gua";
		if (paper == "Ny Times") response.newspaper ="nyt"; 
		if (newscategory == "Economy") response.newscategory = "business"; 

		return response;
 	}
});


