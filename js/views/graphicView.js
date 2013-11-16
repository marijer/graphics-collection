APP.GraphicView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "article-wrapper",

	initialize: function() {
		this.collection.on('sort', this.render, this);
		this.on("change:filterType", this.filterByType, this);
	},

	render: function() {
		this.renderGraphics();
	},

	renderGraphics: function() {
		this.collection.each(this.addOne, this);
        	return this;
	},

	 addOne: function( model ) {
        var graphicItemView = new APP.GraphicItemView({
            model: model
        });
        this.$el.append(graphicItemView.render().el);
    }

})