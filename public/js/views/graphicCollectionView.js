APP.GraphicCollectionView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "article-wrapper",

	initialize: function() {
		this.on("change:filterType", this.filterByType, this);
    	this.on("reset", this.render, this);
	},

	render: function() {
		this.$el.html("");  // reset html element
		this.renderGraphics(); // render
	},

	renderGraphics: function() {
		this.updateTotalGraphics (this.collection.length);
		this.collection.each(this.addOne, this);
        	return this;
	},

	addOne: function( model ) {
        var graphicItemView = new APP.GraphicItemView({
            model: model
        });
        this.$el.append(graphicItemView.render().el);
    },

    updateTotalGraphics: function( num ) {
    	$('.total-graphics').html( num + " graphics");
    },

	sortCollection: function () {
		//this.collection.fetch({reset: true});
		this.$el.html("");
		console.log (this.collection.models);
		
		var filtered = _.filter(this.collection.models, function(graphic) {
    		console.log ( graphic.get("newscategory") === "Conflict" );
    		return graphic.get("newscategory") === "Conflict";
  		});
		this.collection.reset(filtered);
/*
		var filtered = _.filter(this.collection.models, function(item) {
    		return item.get("title") == "how";
  		});
  		console.log (filtered);
  		this.collection.reset(filtered);
  		*/
	}

})