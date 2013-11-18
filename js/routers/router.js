APP.Router = Backbone.Router.extend({
	
	routes: {
       "graphics"                 : "renderGraphics", 
       "graphics(/*querystring)"  : "paramHit",
       ""                         : "index",
       "*path"                    : "notFound", 
  	},

    events : {

    },

    index: function () {
       this.renderGraphics();
     },

    paramHit: function () {
      console.log ('param entered');
    },

    initialize:function () {
      var search = new APP.SearchView();
      $('.filter-wrapper').append(search.$el);
    },

   renderGraphics : function (bar, params) {
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

   notFound: function () {
      console.log ("404 message here");
   }

});

APP.router = new APP.Router();
Backbone.history.start ({ pushState: true });