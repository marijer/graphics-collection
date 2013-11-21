APP.Router = Backbone.Router.extend({
	prev: false,

	routes: {
       "!/"                       : "index",
       "!/search"                 : "filterResults"
  	},

    initialize: function() {
      var self = this;
     
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

          var masterView = new APP.FacetsMasterView({
              collection: APP.facetsData
          });

          self.startRouter();
      })

      //get the collection data 
      APP.graphics = new APP.Graphics();
      APP.graphics.fetch({
         success: function (collection, response, options) {
            APP.collectionData = collection;   
            APP.graphics.trigger("dataLoaded");
         }
      });

      // trigger rendergraphics when data is loaded
      APP.graphics.on("dataLoaded", function() {
         self.renderGraphics(APP.collectionData);
         self.startRouter();
      })

      //initialze the scrollviews
      APP.scroll = new APP.ScrollView();
    },

    startRouter: function() {  //starts the router after both renders are done
      if (APP.router.prev){
         Backbone.history.start(); 

      } else {
         APP.router.prev = true;
      }
    },

   renderGraphics: function(collection) {
      APP.graphicCollectionView = new APP.GraphicCollectionView ({
          collection: collection,
      });

      APP.graphicCollectionView.render();
      $('.graphics-wrapper').html(APP.graphicCollectionView.$el)
   },

   filterResults:function(params) {
      var newCollection = this.search(params);

      // Get All the Facets from Param
      var _paramsArray = new Array(),
          _paramsValueArray = new Array()
          $facets = $('.facet');

//TODO this removing class could be done smarter;
          $facets.removeClass('active'); 
                        
         _.each(params, function(value, key){
           _paramsArray.push(key);
           _paramsValueArray.push(value);
         });
         
      if (_paramsValueArray.length){
          
          var _facets = _.filter($facets, function(i, k){
            var facet_name = $(i).data('facet-name').toLowerCase();
            return _.indexOf(_paramsValueArray, facet_name) != -1 ? true: false
          });
          
          // Add Active Class to Selected Facet
          $(_facets).addClass("active");
      }

      this.renderGraphics( newCollection );
   },

   search: function(params){
      var self = this,
          newCollection = APP.collectionData;

          // call sort function with right param + remove it from selection
         if (params.sort) {
            APP.graphics.sortByColumn(params.sort);
            delete params.sort;
         } 

         if(_.size(params)){ // checks if 1 or more parameters are used

            _.each(params, function (val, key){  // loop over all parameters
                  var val = self.escapeRegex(val); //clean up value

                  var pattern = new RegExp(val, "i");

                  newCollection = newCollection.filter(function(doc){        
                     pattern.lastIndex= 0; // Reset the last Index          
                     return pattern.test(doc.get(key));        
                  });
            }) //end each

         return new Backbone.Collection(newCollection);

        } else {
         return newCollection;  // if no parameters are set - return normal collection
        }   
   },

   escapeRegex: function(value){
      return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
   }, 

   notFound: function() {
      console.log ("404 message here");
   },

   index: function (e) {
      var self = this;

      //removes all clases
      $('.facet').removeClass('active');     
      self.renderGraphics (APP.collectionData);
   }
});

APP.router = new APP.Router();