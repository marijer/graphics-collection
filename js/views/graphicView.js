APP.graphicView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "user",

	template: _.template('<h3><%= name %></h3>'),

	render: function () {
		var attributes = this.model.toJSON();
		this.$el.html (this.template(attributes));
	}
})