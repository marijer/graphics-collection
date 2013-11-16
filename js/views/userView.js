APP.userView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "user",

	template: Handlebars.compile(
		'<div>' +
		'<h1>{{name}}</h1>' +
		'<span class="hi">{{id}}</span>' +
		'</div>'
	),

	render: function () {
		var attributes = this.model.toJSON();
		console.log (attributes);
		this.$el.html(this.template(attributes));
	}

})