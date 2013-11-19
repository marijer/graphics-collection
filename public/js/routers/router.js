APP.Router = Backbone.Router.extend({
	
	routes: {
       ""                         : "index",
       "graphics(/*querystring)"  : "paramHit",
       "*path"                    : "notFound", 
  	},

    events: {

    },

    initialize: function() {
      var self = this;
     
      var search = new APP.SearchView();
      $('.filters-wrapper').append(search.$el);

      //get the collection data 
      APP.graphics = new APP.Graphics();
      APP.graphics.fetch({
         success: function (collection, response, options) {
            APP.data = collection;   
            APP.graphics.trigger("dataLoaded");
         }
      });

      // trigger rendergraphics when data is loaded
      APP.graphics.on("dataLoaded", function() {
         self.renderGraphics(APP.data);
      })

      // get and display the facets
      APP.facets = new APP.Facets();
      APP.facets.fetch({
         success: function (facets, response, options) {
            APP.facetsData = facets;
            APP.facets.trigger("dataLoaded");
         }
      });

      // when the data is loaded, set view
      APP.facets.on("dataLoaded", function() {  
         APP.facetsView = new APP.FacetsView({
          collection:  APP.facetsData
         });

         $('.filters-wrapper').append(APP.facetsView.$el);

      })
    },

   renderGraphics: function(collection) {
      APP.graphicCollectionView = new APP.GraphicCollectionView ({
          collection:  collection
      });

      APP.graphicCollectionView.render();
      $('.graphics-wrapper').append(APP.graphicCollectionView.$el)
   },

   notFound: function () {
      console.log ("404 message here");
   },

  index: function () {
      //this.renderGraphics(APP.collection);
   },

    paramHit: function () {
      console.log ('param entered');
    }

});

APP.router = new APP.Router();
Backbone.history.start ({ pushState: true });