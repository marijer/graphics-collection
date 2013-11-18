APP.GraphicCollectionView = Backbone.View.extend ({
	tagName: "div",  // default setting
	className: "article-wrapper",
	comparator: "date",  //

	initialize: function() {
		this.collection.on('sort', this.render, this);
		this.on("change:filterType", this.filterByType, this);
    	this.collection.on("reset", this.render, this);
	},

	render: function() {
		// reset html element
		this.$el.html("");
		// render
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
    },

    sortTitle: function ( query ) {
    	this.$el.html("");

    	var filtered = _.filter(this.collection.models, function(graphic) {
			return (graphic.get("title").indexOf( query ) !== -1);
		});
		this.collection.reset (filtered);
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