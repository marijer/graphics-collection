APP.GraphicView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "article-wrapper",

	template: Handlebars.compile(
		'<article class="graphic">' +
		'<img class="graphics-image" src={{img.small}}>' +
		'<h2>{{title}}</h2>' +
		'<div class="date">{{date}}</div>' +		
		'</article>'
	),

	events: {
		"click .date": "onClickData"
	},

	renderGraphics: function () {
		this.collection.each (function ( model ) {
			//var itemView = new 

			var attributes = model.attributes;
			this.$el.append(this.template(attributes));
			
		}, this);
		return this;
	},

	render: function () {
		this.renderGraphics();
	},

	onClickData: function ( e ) {
		var element = $(e.currentTarget);
		element.addClass('clicked');
	},


})