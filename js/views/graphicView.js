APP.GraphicView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "article-wrapper",

	events: {
		"click .date": "onClickData"
	},

	render: function () {
		this.renderGraphics();
	},

	renderGraphics: function () {
		this.collection.each(this.addOne, this);
        	return this;
	},
	
	 addOne: function( model ) {
        var graphicItemView = new APP.GraphicItemView({
            model: model
        });
        this.$el.append(graphicItemView.render().el);
    },

	onClickData: function ( e ) {
		var element = $(e.currentTarget);
		element.addClass('clicked');
	},


})