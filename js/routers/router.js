APP.Router = Backbone.Router.extend({
	
	routes: {
	    "first":   "firstRoute",   // #first route
	    "second": 	"secondRoute"
  	},

  	firstRoute: function () {
  		console.log ("first route was hit");
  		APP.usersCollection = new APP.users();
  		APP.usersCollection.create ({name: "Colin", phone: "555-222-21"});
  		APP.usersCollection.create ({ name:"Dan", address: "Seattle"});
  	},

  	secondRoute: function () {
      console.log ("second router was hit");
      
      APP.usersCollection = new APP.users();
      APP.usersCollection.fetch();
      console.dir(APP.usersCollection);
  	}

});

APP.router = new APP.Router();
Backbone.history.start ({ root: "/"});