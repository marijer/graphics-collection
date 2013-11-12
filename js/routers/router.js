APP.Router = Backbone.Router.extend({
	
	routes: {
	    "first" :   "firstRoute",   // #first route
	    "second": 	"secondRoute",
       "users" :   "renderUser", 
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
  	},

    renderUser: function () {
       console.log ("user router was hit");
       APP.users = new APP.users();
       APP.users.fetch({
        success: function () {
         console.log("hi success");
          APP.user3 = APP.users.get(3);
          APP.userView3 = new APP.userView({
            model: APP.user3
          })
          APP.userView3.render();
          $('body').append(APP.userView3.$el)
         }
      });


    }

});

APP.router = new APP.Router();
Backbone.history.start ({ root: "/"});