APP.Router = Backbone.Router.extend({
	prev: false,
  first: true,

	routes: {
    ""                  : "index",
    "!/"                : "index",
    "!/search"          : "filterResults"
 },

 initialize: function() {
   var self = this;

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
       el: $(".graphics-wrapper")
    });
      this.currentCollection = APP.collectionData;
      APP.graphicCollectionView.render();
   },

   filterResults:function( params ) {
      var self = this,
          newCollection = this.search( params ),
          first = this.first;

      // Get All the Facets from Param
      var _paramsArray = [],
      _paramsValueArray = [];

      var ga = ga || undefined;

      if ( ga ){
        ga('send', 'pageview', {
         'page': location.pathname + location.search  + location.hash
        });
      }

      $facets = $('.facet');

        //TODO this removing class could be done smarter;
        $facets.removeClass('active'); 

        _.each(params, function(value, key){
           _paramsArray.push(key);
           _paramsValueArray.push(value);
        });

        // set active or inactive
        if (_paramsValueArray.length){

          var _facets = _.filter($facets, function(i, k){
             var facet_name = $(i).data('facet-name');
             var facet = $(i).data('facet');

             //workaround for the independent variables such as 'opendata'
             if (facet_name === 1 || facet === "years" ) { 
                return _.indexOf(_paramsArray, facet) != -1 ? true: false;
              } else {
                return _.indexOf(_paramsValueArray, facet_name) != -1 ? true: false;
              }
          });

          // trigger filter label
          _.each(_facets, function(facet){
            Backbone.controller.trigger('selectedFilter', {el: facet, arr:_facets});
            if ( first ){ 
              Backbone.controller.trigger('restart', {el: facet, arr:_facets});
            }            
          })

          // Add Active Class to Selected Facet
          $(_facets).addClass("active");
       }

       this.renderGraphics( newCollection );
       this.first = false;
    },

   search: function(params){
      var newCollection = APP.collectionData;
      
      newCollection = newCollection.byFilters(params);
      
      var names = _.uniq(newCollection.pluck('newscategory'));

      return newCollection;
    },


   notFound: function() {
      console.log ("404 message here");
   },

   index: function (e) {
      var self = this;
      this.first = false;

      //removes all clases
      $('.facet').removeClass('active');     
      self.renderGraphics (APP.collectionData);

      // removes all selected filters in breadcrumb
      Backbone.controller.trigger('removeFilters');
   }
});

APP.router = new APP.Router();