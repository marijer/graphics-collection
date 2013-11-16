APP.Router = Backbone.Router.extend({
	
	routes: {
       "graphics(/*querystring)"    :   "renderGraphics", 
       "users(/:foo)"               :   "renderUser"
  	},

    events : {

    },

    initialize:function () {
      var search = new APP.SearchView();
      $('.filter-wrapper').append(search.$el);
    },

   renderGraphics : function (bar, params) {
      console.log ("route is triggered");

      APP.graphics = new APP.Graphics();

      APP.graphics.fetch({
         success: function (collection, response, options) {


            APP.graphicView3 = new APP.GraphicView ({
               collection:  collection
            });

            APP.graphicView3.render();
            $('.graphics-wrapper').append(APP.graphicView3.$el)
         }
      });

   },

   renderUser : function () {
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
Backbone.history.start ({ pushState: true });