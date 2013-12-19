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
       el: $(".graphics-wrapper")
    });
      this.currentCollection = APP.collectionData;
      APP.graphicCollectionView.render();
   },

   filterResults:function(params) {
      var self = this;
      var newCollection = this.search(params);

      // Get All the Facets from Param
      var _paramsArray = [],
      _paramsValueArray = [];
      $facets = $('.facet');

        //TODO this removing class could be done smarter;
        $facets.removeClass('active'); 

        _.each(params, function(value, key){
           _paramsArray.push(key);
           _paramsValueArray.push(value);
        });

      // Get All the Available Facets
            
            // var _facetArray = new Array();
            
            // $facets.filter(function(i, k){
            //    var key = $(this).data('facet');
            //    var value = $(this).data('facet-name');

            //    if (_.findWhere(_facetArray, key) == null) {
            //          _facetArray.push({key: key, value: value});
            //    }
            // });


            // var _excludedFacet = _.without(_facetArray, _paramsArray),
            //     _availableFacets = new Array();

            
            // _.each(_excludedFacet, function(value, key){        
            //   newCollection.filter(function(doc){  
            //   doc = doc.get(value.value);
            //    _availableFacets.push(doc);          
            //   });        
            // });

            // console.log(_availableFacets);


            // _availableFacets.push(_paramsValueArray);
            // _availableFacets = _.flatten(_availableFacets); 
            
            // var $f = $facets.removeClass("disabled").filter(function(i, k){
            //    var facet_name = $(i).data('facet-name');
            //   return _.indexOf(_availableFacets, facet_name) == -1? true: false;
              
            // }).addClass("disabled");
      

        // set active or inactive
        if (_paramsValueArray.length){

          var _facets = _.filter($facets, function(i, k){
             var facet_name = $(i).data('facet-name');

             //workaround for the independent variables such as 'opendata'
             if (facet_name === 1) { 
                facet_name = $(i).data('facet');
                return _.indexOf(_paramsArray, facet_name) != -1 ? true: false;
              } else {
                return _.indexOf(_paramsValueArray, facet_name) != -1 ? true: false;
              }
          });


          _.each(_facets, function(facet){
            Backbone.controller.trigger('selectedFilter', {el: facet, arr:_facets});
         })

          // Add Active Class to Selected Facet
          $(_facets).addClass("active");
       }

       this.renderGraphics( newCollection );
    },

   search: function(params){
      var newCollection = APP.collectionData;
      
      newCollection = newCollection.byFilters(params);

      return newCollection;
    },


   notFound: function() {
      console.log ("404 message here");
   },

   index: function (e) {
      var self = this;

      //removes all clases
      $('.facet').removeClass('active');     
      self.renderGraphics (APP.collectionData);

      // removes all selected filters in breadcrumb
      Backbone.controller.trigger('removeFilters');
   }
});

APP.router = new APP.Router();