APP.SearchView = Backbone.View.extend ({
	template: Handlebars.compile(
		'<div class="search">' +
			'<input class="search-input" data-facet="title" data-facet-name="" type="search" placeholder="search title" >' +
		'</div>'
	),

	events: {
		"keyup .search": "onSearch"
	},

	initialize: function () {

		Backbone.controller.on('checkSearch', this.checkSearch, this);
		 // this.on("page_refresh", function(el) {  
   //      	console.log("helloaaaaa");
   //    	});

		this.render();
	},

	// set value of search correct if needed
	checkSearch: function( param ) {
		var $search = $('.search-input');
		var query = $search.val();

		if ( query != param.search ) {
			this.updateSearch( param.search );
		}
	},

	render: function() {
		this.$el.html(this.template);
		return this;
	},

	updateSearch: function( query ) {
		var $search = $('.search-input');
			
		if( query !== "" ) {
			var data = $search.attr("data-facet-name");
			data = query;
			$search.attr('data-facet-name', data);	
			$search.val(query);		
		}	
	},

	onSearch: function () {
		var $search = $('.search-input');
		var query = $search.val();		

		this.updateSearch( query );
		
		this.trigger("search_Changed", {target: $search});
	}

})