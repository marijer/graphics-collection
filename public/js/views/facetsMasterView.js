APP.FacetsMasterView = Backbone.View.extend({

	initialize: function() {
    	var self = this;

		self.initSearch();
		self.initSort();
	},

	initSearch: function() {
	    var search = new APP.SearchView();
	    $('.fixed-menu-wrapper').append(search.$el);
	},

	initSort: function () {
		var self = this;

		var sortData = self.collection.attributes.sort;
		var sort = new APP.SortView({collection: sortData});
		$('.sort-by').append(sort.$el);

		sort.on("sorted", function(el) {  
        	//self.filterResults(el.option, true);
        	console.log(el.option);
      	});
	},


    filterResults: function( e, select ) {
      var self = this,
         $this = $(e.target),
         $parent = $this.parent();

      if (select) $this = e;
        
        // set class active or non-active
      if($this.hasClass('active')){
         $this.removeClass("active");
      } else {
         $this.addClass('active').siblings().removeClass('active');
      }
        
      // go through all selected facets and save them in array
      var _hash = [];

      self.$el.find('.active').each(function(){
          
      var el = $(this),
         category = el.attr("data-facet"),
         name = el.attr("data-facet-name").toLowerCase();
         _hash.push(category+"="+escape(name));
      });

      if(_hash.length){
          window.location.hash="!/search?"+_hash.join('&');
      }else{
         window.location.hash="!/";
      }
      
      if (e.preventDefault) e.preventDefault();
  	},

});