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
		this.render();
	},

	render: function () {
		this.$el.html(this.template);
		return this;
	},

	onSearch: function () {
		var $search = $('.search-input');
		var query = $search.val();		

		if( query !== "" ) {
			var data = $search.attr("data-facet-name");
		    data = query;
		    $search.attr('data-facet-name', data);			
		}
		
		this.trigger("search_Changed", {target: $search});
	}

})