APP.Router = Backbone.Router.extend({
	
	routes: {
       "graphics"                 :   "renderGraphics", 
       "graphics(/*querystring)"  :   "paramHit"
  	},

    events : {

    },

    paramHit: function () {
      console.log ('param entered');
      // something is parsed and you find out you want to sort by date
      //  APP.graphics.set('_order_by', 'date');
      //  APP.graphics.trigger('change');
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

            APP.graphicCollectionView = new APP.GraphicCollectionView ({
               collection:  collection
            });

            APP.graphicCollectionView.render();
            $('.graphics-wrapper').append(APP.graphicCollectionView.$el)
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