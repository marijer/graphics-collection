APP.FacetsMasterView = Backbone.View.extend({

	initialize: function() {
		this.initSearch();
		this.initSort();
		this.initFacet();
      this.initSelectedFilters();
      this.initSliderView();

      Backbone.controller.on('removedSelectedFilter', this.removedSelectedFilter, this);
   },

   initSearch: function() {
     var self = this;
     var search = new APP.SearchView({ el: $(".search-wrapper") });

     search.on("search_Changed", function(el) {  
      _.debounce(self.filterResults(el.target), 800);	
      });
  },

  initSort: function () {
     var self = this;

     var sortData = self.collection.attributes.sort;
     var sort = new APP.SortView({collection: sortData});
     $('.sort-by').append(sort.$el);

     sort.on("sorted_Changed", function(el) {  
      self.filterResults(el.target);
   });
  },

  initFacet: function() {
   var self = this;

   APP.facetsView = new APP.FacetsView({
       collection: self.collection.attributes.facets
   });

   $('.filters-wrapper').append(APP.facetsView.$el);

   APP.facetsView.on("filter_Changed", function(el) {  
      self.filterResults(el.target);
    });
  },

   initSelectedFilters: function() {
      this.selectedFilters = new APP.SelectedFiltersView({ el: $(".selected-filters-wrapper") });
   },

   initSliderView: function(){
      var self = this;
      APP.sliderView = new APP.SliderView();

      APP.sliderView.on("slider_Changed", function(el) {  
         self.filterResults(el.target);
        // console.log("hi");
      });
   },

   removedSelectedFilter: function(el) {
      var $el = el.target;
      name = $el.attr("data-facet-name");
      facet = $el.attr("data-facet");

      var target = $('.facet[data-facet="'+facet+'"][data-facet-name="'+name+'"]')[0];
      this.filterResults(target);
   },

   filterResults: function( e ) {
      var self = this,
      $this = $(e),
      $parent = $this.parent(),
      search = false;

    
      // handle list items + input
      if( $this.is( "input[type=slider]" )){

      } else if( $this.is( "input" )) {   // handle list items + input
         search = true;
         var query = $this.val();

         if( query === "" && $this.hasClass("active") ) {
              $this.removeClass("active");
         } else {
              $this.addClass("active");
         }

       } else if($this.is("option")) {
          $this.addClass('active').siblings().removeClass('active');
      } else {
   		      // set class active or non-active
   		      if( $this.hasClass('active')){
                 $this.removeClass("active");
              }else {
                 $this.addClass('active').siblings().removeClass('active');
              }
           }

      if (e.preventDefault) e.preventDefault();
         // go through all selected facets and save them in array
      var _hash = [];

      $('body').find('.active').each(function(){

            var el = $(this),
            category = el.attr("data-facet"),
            name = el.attr("data-facet-name");
            _hash.push(category+"="+escape(name));
         });

         if(_hash.length){
          window.location.hash="!/search?"+_hash.join('&');
       }else{
         window.location.hash="!/";
      }

   }
});