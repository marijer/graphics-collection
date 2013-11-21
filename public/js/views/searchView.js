// not working properly at the moment
APP.SearchView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

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

		if( query === "" && $search.hasClass("active") ) {
			//$search.removeClass("active");
		} else {
			//$search.addClass("active");
			var data = $search.attr("data-facet-name");
		    data = query;
		    $search.attr('data-facet-name', data);			
		}
		
		this.trigger("search_Changed", {target: $search});
	}

})