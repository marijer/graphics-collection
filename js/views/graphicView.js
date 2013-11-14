APP.GraphicView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "graphic",

	template: Handlebars.compile(
		'<div>' +
		'<h1>{{title}}</h1>' +
		'<div class="date">{{date}}</div>' +
		'<div class="img">{{img.small}}</div>' +
		'</div>'
	),

	events: {
		"click .date": "onClickData"
	},

	onClickData: function ( e ) {
		var element = $(e.currentTarget);
		element.addClass('clicked');
	},

	render: function () {
		this.collection.each (function ( model ) {
			//var itemView = new 

			var attributes = model.attributes;
			this.$el.append(this.template(attributes));
			
		}, this);
		return this;
	}

})