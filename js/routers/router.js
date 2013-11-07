APP.Router = Backbone.Router.extend({
	
	routes: {
	    "first":   "firstRoute",   // #first route
	    "second": 	"secondRoute"
  	},

  	firstRoute: function () {
  		console.log ("first route was hit");
  	},

  	secondRoute: function () {
  		console.log ("second router");
  	}

});

APP.router = new APP.Router();
Backbone.history.start ({ root: "/"});