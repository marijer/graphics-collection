// not working properly at the moment

APP.SearchView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
		'<div class="search">' +
			'<input class="search-input" type="text" placeholder="search" >' +
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
		var key = $('.search-input').val();

		var temp = Backbone.history.getQueryParameters();
		temp.q = key;
		temp= APP.router.toFragment("graphics", temp);

		APP.router.navigate (temp, {trigger: true});
		 Backbone.history.checkUrl();
		/*
		APP.router.toFragment("graphics", {bar: "bye", new: "category"})
		APP.router._toQueryString({"bar":"bye", new: "category2"})

		debounce > sets a delay
		*/
	}

})