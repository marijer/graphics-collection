// not working properly at the moment
APP.SearchView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
		'<div class="search">' +
			'<input class="search-input" data-facet="title" data-facet-name="" type="text" placeholder="search" >' +
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
		

		if( query === "" && $search.hasClass("active") ) {
			$search.removeClass("active");
			$search.data( "facet-name", "");
		} else {
			$('.search-input').data("facet-name", query);
			
			if ( !$search.hasClass("active") ){
				$search.addClass("active");
			}
		}
		
		this.trigger("search_Changed", {target: $search});
		/*
		need to check 
		debounce > sets a delay
		*/
	}

})