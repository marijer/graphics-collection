// not working properly at the moment

APP.GraphicView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "filter",

	template: Handlebars.compile(
		'<div class="search">' +
		'<input type="text" >' +
		'</div>'
	),

	events: {
		
	},

	render: function () {
		this.$el.html(this.template);
	}


})